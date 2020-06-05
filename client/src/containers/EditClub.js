import React from 'react'
import { Form, Button, Col, Modal } from 'react-bootstrap';
import request from '../utils/request'
import {storage} from '../utils/firebase'

import {useHistory} from 'react-router-dom'

const EditClub = (props) =>  {

  const [club, _setClub] = React.useState(props.location.state)
  const [modal, setModal] = React.useState(false)

  const [disabled, setDisabled] = React.useState(false)

  const history = useHistory()

  const setClub = (c) => {
    _setClub(c)
  }

  React.useEffect(() => {
    storage.ref(club.booth).getDownloadURL().then(url => {
      setClubImage(<img style={{width: 200, height: 200}} alt={"Booth"}  src={url}></img>)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async event => {
    setDisabled(true)

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
        try{
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
    setDisabled(true)

    event.preventDefault()
    setClub({...(props.location.state), imageChanged: false})
    storage.ref(props.location.state.booth).getDownloadURL().then(url => {
      setClubImage(<img style={{width: 200, height: 200}} alt={"Booth"}  src={url}></img>)
    })
  }

  const handleDelete = event => {
    setDisabled(true)

    window.onbeforeunload = function(e) {
      var dialogText = "Don't close the tab yet!";
      e.returnValue = dialogText;
      return dialogText;
    }
    
    const options = {body: {name: club.name}, method: 'DELETE'}
    
    request('/api/club/delete', options).then(res => {
      if(club.booth !== '/default.jpg'){
        const ref = storage.ref().child(club.booth)
        ref.delete().then(snapshot => {
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

  const handleClose = () => {
    setDisabled(false)
    setModal(false)
  }

  var [clubImage, setClubImage] = React.useState(null)

  const setImage = (array) => {
    if(!array || !array[0]) {
      return null
    }

    setClub({...club, booth: array, imageChanged: true})
    var selectedFile = array[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
      setClubImage(<img style={{width: 200, height: 200}} alt={array[0].name}  src={event.target.result}></img>)
    };
  
    reader.readAsDataURL(selectedFile);
  }

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
            {clubImage}
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="booth_file">
            <Form.File id="formcheck-api-custom" custom>
              <Form.File.Input isValid onChange={e => setImage(e.target.files)}/>
              <Form.File.Label> 
                Booth Image (150px x 150px recommended)
              </Form.File.Label>
            </Form.File>
          </Form.Group>

        </Form.Row>
        <Form.Group controlId="description">
          <Form.Label>Organization Description</Form.Label>
          <Form.Control size="lg" as="textarea" rows="3" placeholder="What does your organization do" 
          value={club.description} onChange={(e) => setClub({ ...club, description: e.target.value })} 
          maxlength="250"/>
        </Form.Group>

        <div style={{display:'flex', justifyContent: 'space-evenly'}}>
          <Button style={{ backgroundColor: 'gray'}} size="lg" variant="dark" type="reset" disabled={disabled}>
            Reset
          </Button>
          <Button style={{ backgroundColor: 'blue'}} size="lg" variant="dark" type="submit" disabled={disabled}>
            Update
          </Button>
          <Button style={{ backgroundColor: 'red'}} size="lg" variant="dark" disabled={disabled} onClick={e => setModal('delete')}>
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
        <Button style={{cbackgroundColor: 'red'}} disabled={disabled} onClick={handleDelete}>Delete</Button>
        <Button disabled={disabled} onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
    </div >
  )
}

export default EditClub;
