import React from 'react'
import { Form, Button, Col, Modal } from 'react-bootstrap';
import request from '../utils/request'
import {storage} from '../utils/firebase'

import {useHistory} from 'react-router-dom'

const EditClub = (props) =>  {

  const [club, _setClub] = React.useState(props.location.state)
  const [modal, setModal] = React.useState(false)

  const history = useHistory()

  const setClub = (c) => {
    _setClub(c)
  }

  React.useEffect(() => {
    
  }, [])

  const handleSubmit = async event => {
    
    event.preventDefault()
      
    let img = undefined
    if(club.imageChanged){
      window.onbeforeunload = function(e) {
        var dialogText = 'Dialog text here';
        e.returnValue = dialogText;
        return dialogText;
      }
      img = club.booth[0]
      club.booth = `/booth_${club.name}.jpg`
    }

    const body = {name: club.name, club}
    console.log(body)

    request('/api/club/update', { body, method: 'PUT'}).then(async response => {
      setClub(response)
      setModal('updated')
      
      if(img){
        const ref = storage.ref().child('/booth_' + club.name +'.jpg')
        try{
          const snapshot = await ref.put(img)
          console.log(snapshot)
          window.onbeforeunload = null
        }
        catch(err){
          console.log(err)
          window.onbeforeunload = null
        }
      }
    }).catch(error => {
      console.log(error)
      setModal('failure')
      window.onbeforeunload = null
    })
  }

  const handleReset = event => {
    event.preventDefault()
    setClub(props.location.state)
  }

  const handleDelete = event => {

    window.onbeforeunload = function(e) {
      var dialogText = "Don't close the tab yet!";
      e.returnValue = dialogText;
      return dialogText;
    }
    
    const options = {body: {name: club.name}, method: 'DELETE'}
    console.log(club)
    
    request('/api/club/delete', options).then(res => {
      if(club.booth !== '/default.jpg'){
        const ref = storage.ref().child(club.booth)
        ref.delete().then(snapshot => {
          console.log(snapshot)
          window.onbeforeunload = null
        })
        history.push('/myclubs')      
      }
      window.onbeforeunload = null
      history.push('/myclubs')      
    }).catch(error => {
      console.log(error)
      setModal('failure')
    })
  }

  const handleClose = () => setModal(false)

  return (
    
    <div>
      <br></br>
      <Form onSubmit={handleSubmit} onReset={handleReset} style={{ maxWidth: "95%" }}>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name <b>(Cannot be changed)</b></Form.Label>
            <Form.Control size="lg" type="name" placeholder={club.name} 
                          onChange={e => setClub({...club, name:e.target.value})} disabled/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="booth_file">
            <Form.File id="formcheck-api-custom" custom>
              <Form.File.Input isValid onChange={e => setClub({...club, booth: e.target.files, imageChanged: true})}/>
              <Form.File.Label> 
                Booth Image (150px x 150px recommended)
              </Form.File.Label>
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
          <Modal.Title>Club successfully {modal}</Modal.Title> :
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
