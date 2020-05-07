import React, { Component } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import Footer from '../components/footer.js';
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
class RegisterOrganization extends Component {


  render() {
    return (
      <div>
        <br></br>
        <Form style={{ maxWidth: "95%" }}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Organization Name" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.File id="formcheck-api-custom" custom>
                <Form.File.Input isValid />
                <Form.File.Label data-browse="Booth">
                  Booth Image
      </Form.File.Label>
                <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
              </Form.File>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.File id="formcheck-api-custom" custom>
                <Form.File.Input isValid />
                <Form.File.Label data-browse="Flyer">
                  Flyer Image
                </Form.File.Label>
                <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
              </Form.File>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>


          {/* Address */}
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" value="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>

          </Form.Row>



          <Form.Group controlId="settings.Hobbies">
            <Form.Label>Organization Biography</Form.Label>
            <Form.Control size="lg" as="textarea" rows="3" />
          </Form.Group>

          <Form.Label>Add Members</Form.Label>
          <Button style={{ marginLeft: "8px", marginBottom: "8px" }} variant="warning" type="submit">
            Add more Members
          </Button>
          <Form.Group><Autocomplete suggestions={states} /></Form.Group>
          <Form.Group id="formGridCheckbox">
            <Form.Check type="switch" id="custom-switch"
              label="Make my Organization Public to Library Walk" />

          </Form.Group>'
          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>

        <div style={{ bottom: 0, position: "absolute", width: "100%" }}>
        </div>
      </div >
    )
  }
}

export default RegisterOrganization;
