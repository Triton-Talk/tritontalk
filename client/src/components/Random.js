import React from 'react';
import { Form, Button, Col, Jumbotron } from 'react-bootstrap';

const Random = (props) => {
  return (
    <div>
      <br></br>
      <div style={{ textAlign: "center" }}>
        <h1>Who would you like to meet today?</h1>
        <Jumbotron fluid style={{ marginRight: "5%", marginLeft: "5%", backgroundImage: 'url(https://cdn5.vectorstock.com/i/1000x1000/89/79/kids-drawing-funny-seamless-pattern-cute-vector-9228979.jpg', backgroundPosition: "0px 0px", height: "200px", backgroundRepeat: 'repeat' }}></Jumbotron>
      </div>
      <Form style={{ maxWidth: "95%" }}>

        <Form.Row>
          <Form.Group as={Col} controlId="year1">
            <Form.Check
              type="switch"
              id="custom-switch-year1"
              label="Year 1" />
          </Form.Group>
          <Form.Group as={Col} controlId="year2">
            <Form.Check
              type="switch"
              id="custom-switch-year2"
              label="Year 2" />
          </Form.Group>
          <Form.Group as={Col} controlId="year3">
            <Form.Check
              type="switch"
              id="custom-switch-year3"
              label="Year 3" />
          </Form.Group>
          <Form.Group as={Col} controlId="year4">
            <Form.Check
              type="switch"
              id="custom-switch-year4"
              label="Year 4" />
          </Form.Group>
          <Form.Group as={Col} controlId="year4plus">
            <Form.Check
              type="switch"
              id="custom-switch-year4plus"
              label="Year 4+" />
          </Form.Group>

        </Form.Row>



        {/* Address */}
        <Form.Row>
          <Form.Group as={Col} controlId="formCollege">
            <Form.Label>College</Form.Label>
            <Form.Control as="select" value="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formMajor">
            <Form.Label>Major</Form.Label>
            <Form.Control as="select" value="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <center>
          <hr></hr>
          <Button variant="dark" type="submit">
            Continue
          </Button>
        </center>

      </Form>
    </div >
  )
}
export default Random;
