import React from 'react'
import { Form, Button, Col } from 'react-bootstrap';

import request from '../utils/request'
import {storage} from '../utils/firebase'

const RegisterOrganization  = () =>  {
  
  const [club, _setClub] = React.useState({name: '', description: '', booth: null, flyer: null, meeting_times: null})

  const setClub = (c) => {
    _setClub(c)
  }

  const handleSubmit = async event => {
    
    event.preventDefault()

    request('/api/club/get', { body: {name: club.name}, method: 'GET'}).catch(error => {
      
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

      request('/api/club/create', { body, method: 'POST'}).then(response => setClub(response))
    })
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
          <Button style={{ backgroundColor: 'blue'}} size="lg" variant="dark" type="submit">
            Submit
          </Button>
        </div>

      </Form>

    </div >
  )
}

export default RegisterOrganization;
