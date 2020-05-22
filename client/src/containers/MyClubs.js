import React from 'react'
import {Card,Button} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import  "../styles/MyClubs.css"

import request from '../utils/request'
import {storage} from '../utils/firebase'

const ClubOwnerCard = ({club}) =>{

  const history = useHistory()
  
  console.log(club)

  const [url, setUrl] = React.useState(null)

  storage.ref(club.booth).getDownloadURL().then(url =>{
    setUrl(url)
  })

  const createBooth  = (e) => {

    //allow for custom room names later
    const room = {name : club.name}

    const options = {
      body: {room, club},
      method: 'POST'
    }

    request('/api/room/createForClub', options).then(res => alert(res)).catch(err => console.log(err))

    history.push({pathname: "/lobby", state: {name: club.name}})  
  }


  return(
    <Card style={{ width: '300px', margin: '30px' }}>
      <Card.Body className="justify content-end">

        <div style={{position:"center",textAlign:"center"}}>
          <img src={url} alt='club-flyer' style={{margin: '10px', width:"160px",height:"160px"}}/>
        </div>


        <div className="text-center">
          <h5 className="card-title">{club.name}</h5>
        </div>

        <div className="d-flex justify-content-between">
          <Link to={{pathname: "/editclub", state: club}}>
            <Button variant="primary">Edit</Button>
          </Link>
          {
            club.inCall ? 
            <Button variant="warning">Join Call</Button> :
            <Button variant="warning" onClick={createBooth}>Create Booth</Button>
          }
            
        </div>
      </Card.Body>
    </Card>
  );
}

const MyClubs = (props) => {

  const [clubs, _setClubs] = React.useState(undefined)
     
  if(!clubs){
    request('/api/user/me', {method: 'GET'}).then(res => {
      _setClubs(res.clubs)
    })
    return <h1> Loading </h1>
  }

  return (
    <div>
      <h1 className="cardTitle" style={{marginTop: "40px"}}>My Clubs</h1>
      <div style={{marginLeft:"40px"}}>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {clubs.map((club, i) => <ClubOwnerCard key={i} club={club}/>)}
        </div>
        <Link to="/newclub">
          <button variant="primary">Register a New Club</button>
        </Link>
      </div>
    </div>
  )
}


export default MyClubs;