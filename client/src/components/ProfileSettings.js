import React from 'react';
import { Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Image } from 'react-bootstrap'
import Auth from '../auth'
import DummyImage from "./dummy_profile_photo.png";

const Settings = ({ p }) => {
  const { user } = React.useContext(Auth)
  console.log({ user })
  p = {
    name: "Kimba  Stanzah",
    title: "Class President",
    email: "kstanzah@ucsd.esdu"
  }


  return ( user ? 
    <div>
      <hr />
      <Form style={{ maxWidth: "95%" }}>
        <Form.Row>
          <Col xs={12} md={12} lg={12} xl={6}>

            <Form.Group controlId="settings.image">
              <center>
                <Image src={user.picture} rounded />
              </center>
            </Form.Group>
            <Form.Group controlId="settings.College">
              <Form.Label>College</Form.Label>
              <Form.Control size="lg" as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="settings.Major">
              <Form.Label>Major</Form.Label>
              <Form.Control size="lg" as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="settings.Year">
              <Form.Label>Year</Form.Label>
              <Form.Control size="lg" as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={12} lg={12} xl={6}>
            <Form.Group controlId="settings.email">
              <Form.Label>Email address <b>(Cannot be changed)</b></Form.Label>
              <Form.Control size="sm" type="email" placeholder={user.email} disabled />
            </Form.Group>

            <Form.Group controlId="settings.Name">
              <Form.Label>Title<b></b></Form.Label>
              <Form.Control size="lg" type="Title" placeholder={p.title} />
              <Form.Control size="lg" type="email" placeholder={user.name}  />

            </Form.Group>
            <Form.Group controlId="settings.Hobbies">
              <Form.Label>Hobbies</Form.Label>
              <Form.Control size="lg" as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="settings.Bio">
              <Form.Label>Mini Biography</Form.Label>
              <Form.Control size="lg" as="textarea" rows="3" />
            </Form.Group>
          </Col>
        </Form.Row>
        <hr />
        <center>
          <Button size="lg" variant="primary" type="submit">
            Update
  </Button>
        </center>
      </Form>

    </div> : 
    <Redirect to="/SplashPage" />
  )
}

export default Settings;
