import React from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import Autocomplete from '../components/Autocomplete'

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illnois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];
const RegisterOrganization  = () =>  {
  
  const [club, setClub] = React.useState({name: '', description: '', booth: null, flyer: null, meeting_times: null})

  return (
    <div>
      <br></br>
      <Form style={{ maxWidth: "95%" }}>
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
              <Form.File.Input onChange={e => console.log(e.target.files)}/>
              <Form.File.Label> 
                Booth Image
              </Form.File.Label>
            </Form.File>
          </Form.Group>

          <Form.Group as={Col} controlId="flyer_file">
            <Form.File id="formcheck-api-custom" custom>
              <Form.File.Input isValid />
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

        <Form.Label>Add Members</Form.Label>
        <Button style={{ marginLeft: "8px", marginBottom: "8px" }} variant="warning">
          Add more Members
        </Button>
        <Form.Group><Autocomplete suggestions={states} /></Form.Group>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="switch" id="custom-switch"
            label="Make my Organization Public to Library Walk" />
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
