import React from 'react'
import {Card,Button,CardColumns} from 'react-bootstrap'
import  "../styles/MyClubs.css"


const ClubOwnerCard = ({club}) =>{
  return(
    <Card style={{ width: '3rv'}}>
      <img alt='club-flyer' style={{width:"100%",height:"160px"}} src={club.image}/>

      <Card.Body className="justify content-end">

        <div className="text-center">
          <h5 className="card-title">{club.title}</h5>
        </div>

        <div className="d-flex justify-content-between">

          <Button variant="primary">Edit</Button>
          {club.inCall ? <Button variant="warning">Start Call</Button> :
          <Button variant="warning">Join Call</Button>}
            
        </div>
      </Card.Body>
    </Card>
  );
}

const ClubMemberCard = ({club}) =>{
  return(
    <Card style={{ width: '3rv' }}>
      <img alt='club-flyer' style={{width:"100%",height:"160px"}} src={club.image}/>
      <Card.Body>
        <div className="text-center">
          <h5 className="card-title">{club.title}</h5>
        </div>
        <div className="d-flex justify-content-end">
          <Button variant="warning" disabled={!club.inCall}>Go Call</Button>
        </div>
      </Card.Body>
    </Card>
  );
}


const MyClubs = (props) => {

  /*Dummy Data*/
  const club = {
    image : 'https://i.pinimg.com/originals/30/ef/3d/30ef3dada38214dc9cc458b59b7efa2f.jpg',
    title : 'Club Title',
    inCall : false,
  }

  const clubs = [club]  

  return (
    <div>
      <h1 className="cardTitle" style={{marginTop: "40px"}}> Owned Clubs</h1>
      <div style={{marginLeft:"40px"}}>
        <CardColumns>
            {clubs.map((club, i) => <ClubOwnerCard key={i} club={club}/>)}
        </CardColumns>
      </div>
      <hr/>
      <h1 className="cardTitle"> Member Clubs</h1>
      <div style={{marginLeft:"40px"}}>
        <CardColumns>
            {clubs.map((club, i) => <ClubMemberCard key={i} club={club}/>)}
        </CardColumns>
      </div>
    </div>
  )
}


export default MyClubs;
