import React from 'react'
import { Form, Button, Col, Modal} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

import request from '../utils/request'
import {storage} from '../utils/firebase'

const RegisterOrganization  = () =>  {
  
  const [club, _setClub] = React.useState({name: '', description: '', booth: null, flyer: null, meeting_times: null})
  const [modal, setModal] = React.useState(false)

  const [disabled, setDisabled] = React.useState(false)

  const history = useHistory()

  const setClub = (c) => {
    _setClub(c)
  }

  const handleClose = () => {
    setModal(false)
    history.push('/myclubs')
  }

  const handleFailClose = () => {
    setModal(false)
    setDisabled(false)
  }  
  
  const handleSubmit = async event => {

    event.preventDefault()

    setDisabled(true)

    request('/api/club/get', { body: {name: club.name}, method: 'GET'}).catch(error => {
      
      let img = undefined
      if(club.booth){
        window.onbeforeunload = function(e) {
          var dialogText = 'Dialog text here';
          e.returnValue = dialogText;
          return dialogText;
        }
        img = club.booth[0]
        club.booth = `/booth_${club.name}.jpg`
      }
      else
        club.booth = '/default.jpg'

      const body = {club}
      console.log(body)

      request('/api/club/create', { body, method: 'POST'}).then(async response => {
        setModal('created')
        setClub(response)

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
      }).catch(e => {
        console.log(e)
        if (e === 11000) {
          setModal('failureDuplicate')
        } else {
          setModal('failure')
        }
        window.onbeforeunload = null
      })
    })
  }

  

  var [clubImage, setClubImage] = React.useState(null)

  const setImage = (array) => {
    if(!array || !array[0]) {
      return null
    }

    setClub({...club, booth: array})
    var selectedFile = array[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
      setClubImage(<img style={{width: 200, height: 200}} alt={array[0].name} src={event.target.result}></img>)
    };
  
    reader.readAsDataURL(selectedFile);
  }

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
          <Button style={{ backgroundColor: 'gray', height:38}} size="xs" variant="dark"
                    onClick={()=>{setClubImage(null); setClub({...club, booth: null})}}>
            Reset Image
          </Button>
        </Form.Row>
        
        <Form.Group controlId="description">
          <Form.Label>Organization Description</Form.Label>
          <Form.Control size="lg" as="textarea" rows="3" placeholder="What does your organization do" 
          value={club.description} onChange={(e) => setClub({ ...club, description: e.target.value })} 
          maxlength="250"/>
        </Form.Group>

        <div style={{display:'flex', justifyContent: 'space-evenly'}}>
          <Button style={{ backgroundColor: 'blue'}} size="lg" variant="dark" type="submit" disabled={disabled}>
            Submit
          </Button>
        </div>
      </Form>

      <Modal show={modal === 'created'} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Club successfully created</Modal.Title>
        </Modal.Header>
      </Modal>

      <Modal show={modal === 'failure'} onHide={handleFailClose} centered> 
        <Modal.Header closeButton>
          <Modal.Title>There was an error! Let's try that again.</Modal.Title>
        </Modal.Header>
      </Modal>

      <Modal show={modal === 'failureDuplicate'} onHide={handleFailClose} centered> 
        <Modal.Header closeButton>
          <Modal.Title>This club name is already in use! Let's try that again.</Modal.Title>
        </Modal.Header>
      </Modal>

    </div >
  )
}

export default RegisterOrganization;
