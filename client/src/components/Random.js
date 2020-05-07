import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const Random = (props) => {
  return (
    <div>
      <br></br>
      <div style={{ textAlign: "center" }}>
        <h1>How would you like to meet today?</h1>
      </div>
      <Form style={{ maxWidth: "95%" }}>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Year 1" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Year 2" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Year 3" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Year 4" />
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


        </Form.Row>



        <Form.Group id="formGridCheckbox">
          <Form.Check type="switch" id="custom-switch"
            label="Make my Organization Public to Library Walk" />

        </Form.Group>
        <center>
          <hr></hr>
          <Button variant="dark" type="submit">
            Continue
          </Button>
        </center>

      </Form>
    </div>
  )
}
export default Random;
