import React from 'react'
import { Form, Button, Col, Modal } from 'react-bootstrap';
import request from '../utils/request'
import {storage} from '../utils/firebase'

const EditClub = (props) =>  {

  console.log(props.location)
  
  const [club, _setClub] = React.useState({name: '', description: '', booth: null, flyer: null, meeting_times: null})
  const [modal, setModal] = React.useState(false)

  const setClub = (c) => {
    _setClub(c)
  }

  const handleSubmit = async event => {
    
    event.preventDefault()
      
    if(club.booth){
      const ref = storage.ref().child('/booth_' + club.name +'.jpg')
      ref.put(club.booth[0]).then(snapshot => console.log(snapshot))
      club.booth = `/booth_${club.name}.jpg`
    }

    if(club.flyer){
      const ref = storage.ref().child('/flyer_' + club.name +'.jpg')
      ref.put(club.booth[0]).then(snapshot => console.log(snapshot))
      club.flyer = `/flyer_${club.name}.jpg`
    }

    const body = {club}
    console.log(body)

    request('/api/club/update', { body, method: 'PUT'}).then(response => {
      setClub(response)
      setModal('updated')
    }).catch(error => {
      console.log(error)
      setModal('failure')
    })
  }

  const handleReset = event => {
    event.preventDefault()

  }

  const handleDelete = event => {
    
    const options = {body: {club}, method: 'DELETE'}
    
    request('/api/club/delete', options).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
      setModal('failure')
    })
  }

  const handleClose = () => setModal(false)

  return (
    
    <div>
      <br></br>
      <Form onSubmit={handleSubmit} style={{ maxWidth: "95%" }}>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control size="lg" type="name" placeholder="Organization Name" 
                          value={club.name} onChange={e => setClub({...club, name:e.target.value})}/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="booth_file">
            <Form.File id="formcheck-api-custom" custom>
              <Form.File.Input isValid onChange={e => setClub({...club, booth: e.target.files})}/>
              <Form.File.Label> 
                Booth Image (150px x 150px recommended)
              </Form.File.Label>
            </Form.File>
          </Form.Group>

          <Form.Group as={Col} controlId="flyer_file">
            <Form.File id="formcheck-api-custom" custom>
              <Form.File.Input isValid onChange={e => setClub({...club, flyer: e.target.files})}/>
              <Form.File.Label>
                Flyer Image
              </Form.File.Label>
              <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
            </Form.File>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="description">
          <Form.Label>Organization Description</Form.Label>
          <Form.Control size="lg" as="textarea" rows="3" placeholder="What does your organization do" 
          value={club.description} onChange={(e) => setClub({ ...club, description: e.target.value })} />
        </Form.Group>

        <div style={{display:'flex', justifyContent: 'space-evenly'}}>
          <Button style={{ backgroundColor: 'gray'}} size="lg" variant="dark" type="reset">
            Reset
          </Button>
          <Button style={{ backgroundColor: 'blue'}} size="lg" variant="dark" type="submit">
            Update
          </Button>
          <Button style={{ backgroundColor: 'red'}} size="lg" variant="dark" onClick={e => setModal('delete')}>
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
          <Modal.Title>There was an error! Let's try that again.</Modal.Title>
        </Modal.Header>
      </Modal>


      <Modal size="lg" show={modal === 'delete'} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{color: 'red'}}>
          Are you sure you wish to proceed?	
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>This will delete all of your club data permanently! It cannot be undone.</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
    </div >
  )
}

export default EditClub;
