import React from 'react'
import {Card, Button, Dropdown, SplitButton, Modal, Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import  "../styles/MyClubs.css"

import request from '../utils/request'
import {storage} from '../utils/firebase'

const ClubOwnerCard = ({club}) =>{

  const image = React.createRef()

  const [url, setUrl] = React.useState(null)
  const [modal, setModal] = React.useState(false)
  const [load, setLoad] = React.useState(false)

  const [name, setName] = React.useState(club.name)
  
  const createBooth  = (e) => {
    //allow for custom room names later
    const room = {name} 

    const options = {
      body: {room, club},
      method: 'POST'
    }

    request('/api/room/createForClub', options).then(res => {
      setModal('success')
      console.log(res)
      club.room = res
    }).catch(err => {
      setModal('failure')
    })
  }

  const deleteBooth = (e) => {
    //allow for custom room names later
    const options = {
      body: {name},
      method: 'DELETE'
    }

    request('/api/room/delete', options).then(res => {
      setModal('delete')
      club.room = null
    }).catch(err => {
      setModal('failure')
    })
  }

  React.useEffect(() => {
    storage.ref(club.booth).getDownloadURL().then(url => setUrl(url)); 
    return
  }, [club.booth,url])

  React.useEffect(() => {
    if(image && image.complete)
      setLoad(true)
  }, [image])

  return(
    <>
      <Card style={{ width: '300px', margin: '30px' }}>
        <Card.Body className="justify content-end">

          <div style={{position:"center",textAlign:"center"}}>
            <img src={url} ref={image} onLoad={() => setLoad(true)} alt='Flyer' 
                 style={{margin: '10px', width:"160px",height:"160px", display: load ? 'inline' : 'none'}}/>
            {
              load ? 
              null : 
              <Spinner animation='border' style={{margin: '10px', width: '160px', height:'160px'}}/>
            }
          </div>

          <div className="text-center">
            <h5 className="card-title">{club.name}</h5>
          </div>

          <div className="d-flex justify-content-between">
            <Link to={{pathname: "/editclub", state: club}}>
              <Button variant="primary">Edit</Button>
            </Link>
            {
              club.room ? 
              <Button variant="danger" onClick={deleteBooth}>Delete Booth</Button> :
 //             <Button variant="warning" onClick={createBooth}>Create Booth</Button>
	      <div style={{display: 'flex'}}>
		<SplitButton variant='warning' title='Create Booth' alignRight drop='down' onClick={createBooth}>
		  <Dropdown.Item onClick={() => { setModal('named') }} eventKey="1">Create Named Booth</Dropdown.Item>
		</SplitButton>
	      </div>
            }
          </div>

        </Card.Body>
      </Card>

      <Modal size="lg" show={modal === 'named'} onHide={() => setModal(false) || setName(club.name)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Creating Named Booth 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>What would you like to name your new Booth?</h3>
          <input value={name} onChange={e => setName(e.target.value)} type='text'/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModal(false) || setName(club.name)}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={modal === 'success'} onHide={() => setModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Booth created!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Your new Booth is on Library Walk! Do you want to visit it right now?</h3>
        </Modal.Body>
        <Modal.Footer>
          <Link to={{ pathname: "/lobby", state: {name: club.name} }}>
            <Button>Yes</Button>
          </Link>
          <Button onClick={() => setModal(false)}>No</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modal === 'failure'} onHide={() => setModal(false)} centered> 
        <Modal.Header closeButton>
          <Modal.Title>There was an error! Let's try that again.</Modal.Title>
        </Modal.Header>
      </Modal>

      <Modal show={modal === 'delete'} onHide={() => setModal(false)} centered> 
        <Modal.Header closeButton>
          <Modal.Title>Your Booth was deleted.</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
}

const MyClubs = (props) => {

  const [clubs, _setClubs] = React.useState(undefined)

  React.useEffect( () => {
    request('/api/user/me', {method: 'GET'}).then(res => {
      _setClubs(res.clubs)
    })
  }, [])
     
  if(!clubs){
    return <h1> Loading </h1>
  }

  return (
    <div>
      <h1 className="cardTitle" style={{marginTop: "40px"}}>My Clubs</h1>
      <div style={{marginLeft:"40px"}}>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {clubs.map((club, i) => <ClubOwnerCard key={i} club={club} />)}
        </div>
        <Link to="/newclub">
          <button variant="primary">Register a New Club</button>
        </Link>
      </div>
    </div>
  )
}


export default MyClubs;
