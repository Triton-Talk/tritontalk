import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Image, Modal} from 'react-bootstrap'

import Auth from '../utils/auth'
import request from '../utils/request'

import {SelectOneThing, SelectManyThings} from '../components/SelectOneThing';

const Settings = () => {

  const { user, setUser, handleSignOut } = React.useContext(Auth)

  const [localUser, _updateLocalUser] = React.useState(user)
  const [modal, setModal] = React.useState(false)

  const updateLocalUser = u => {
    console.log(u.clubs)
    _updateLocalUser(u)
  }

  if(localUser === null){
     if(user !== null) 
       updateLocalUser(user)
    return (
      <h1 align="center" className="loadertext"> Loading... </h1>
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    const options = {body: {user: localUser}, method: 'PUT'}
    
    request('/api/user/update', options).then(res => {
      setUser(res)
      setModal('updated')
    }).catch(error => {
      console.log(error)
      setModal('failure')
    })
  }

  const handleReset = event => {
    event.preventDefault()

    updateLocalUser({ ...user })
  }

  const handleDelete = event => {
    
    const options = {body: {user: localUser}, method: 'DELETE'}
    
    request('/api/user/delete', options).then(res => {
      console.log(res)
      handleSignOut()
    }).catch(error => {
      console.log(error)
      setModal('failure')
    })
  }

  const handleClose = () => setModal(false)

  const colleges = ["Select One...", "Revelle", "Muir", "Warren", "Marshall", "ERC", "Sixth"]

  const majors = ["Select One...", "Computer Science", "Biology", "Electrical Engineering", "Other"]

  const years = ["Select One...", "First year", "Second year", "Third year", "Fourth year"]

  const clubs = ["Select One...", "IEEE", "..."]

  return (
    <div>
      <hr />
      <Form style={{ maxWidth: "95%" }} onSubmit={handleSubmit} onReset={handleReset}>
        <Form.Row>
          <Col xs={12} md={12} lg={12} xl={6}>

            <Form.Group controlId="settings.image">
              <center>
                <Image src={localUser.picture} rounded />
              </center>
            </Form.Group>

            <SelectOneThing controlId="settings.School" label="School"
              options={colleges} value={localUser.college}
              onChange={(e) => updateLocalUser({ ...localUser, college: e.target.value })} />

            <SelectOneThing controlId="settings.Major" label="Major"
              options={majors} value={localUser.major}
              onChange={(e) => updateLocalUser({ ...localUser, major: e.target.value })} />

            <SelectOneThing controlId="settings.Year" label="Year"
              options={years} value={localUser.year}
              onChange={(e) => updateLocalUser({ ...localUser, year: e.target.value })} />
          </Col>

          <Col xs={12} md={12} lg={12} xl={6}>
            <Form.Group controlId="settings.email">
              <Form.Label>Email address <b>(Cannot be changed)</b></Form.Label>
              <Form.Control size="sm" type="email" placeholder={localUser.email} disabled />
            </Form.Group>

            <Form.Group controlId="settings.Name">
              <Form.Label>Name<b></b></Form.Label>
              <Form.Control size="lg" value={localUser.name}
                onChange={(e) => updateLocalUser({ ...localUser, name: e.target.value })} />
            </Form.Group>

            <Form.Group controlId="settings.Hobbies">
              <Form.Label>Hobbies</Form.Label>
              <Form.Control size="lg" as="textarea" rows="3" value={localUser.hobbies}
                onChange={(e) => updateLocalUser({ ...localUser, hobbies: e.target.value })} />
            </Form.Group>

            <Form.Group controlId="settings.Clubs">
              <SelectManyThings controlId="settings.Clubs"
                label={
                  <>
                    <span>Clubs</span>
                    <Button style={{ margin: "10px" }} className="btn-warning">Add More Clubs</Button>
                  </>
                }
                options={clubs} value={localUser.clubs}
                onChange={(e) => updateLocalUser({ ...localUser, clubs: [...localUser.clubs, e.target.value] })}/>
            </Form.Group>

            <Form.Group controlId="settings.Bio">
              <Form.Label>Mini Biography</Form.Label>
              <Form.Control size="lg" as="textarea" rows="3" value={localUser.bio}
                onChange={(e) => updateLocalUser({ ...localUser, bio: e.target.value })} />
            </Form.Group>
          </Col>
        </Form.Row>
        <hr />
        <div style={{display:'flex', justifyContent: 'space-evenly'}}>
          <Button style={{ backgroundColor: 'gray' }} size="lg" variant="dark" type="reset">
            Reset
          </Button>

          <Button style={{ backgroundColor: 'blue'}} size="lg" variant="dark" type="submit">
            Update
          </Button>

          <Button style={{ backgroundColor: 'red' }} size="lg" variant="dark" onClick = {e => setModal('delete')}>
            Delete 
          </Button>
        </div>
      </Form>

      <Modal show={modal === 'updated' || modal === 'deleted'} onHide={handleClose} centered>
	<Modal.Header closeButton>
            <Modal.Title>User successfully {modal}</Modal.Title> :
	</Modal.Header>
      </Modal>

      <Modal show={modal === 'failure'} onHide={handleClose} centered> 
	<Modal.Header closeButton>
            <Modal.Title>There was an error! Please try again.</Modal.Title>
	</Modal.Header>
      </Modal>


    <Modal size="lg" show={modal === 'delete'} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{color: 'red'}}>
          Are you sure you wish to proceed?	
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>This will delete all of your user data permanently! It cannot be undone.</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default Settings;
