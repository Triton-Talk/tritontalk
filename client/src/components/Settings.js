import React from 'react';
import { Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Image } from 'react-bootstrap'
import Auth from '../context/auth'

import SelectOneThing from '../components/SelectOneThing';

const Settings = ({ p }) => {
  const { user } = React.useContext(Auth)
  p = {
    name: "Kimba  Stanzah",
    title: "Class President",
    email: "kstanzah@ucsd.esdu"
  }

  const colleges = ["Revelle", "Muir", "Warren", "Marshall", "ERC", "Sixth"]

  const majors = ["Computer Science", "Biology", "Electrical Engineering", "Other"]

  const year = ["First year", "Second year", "Third year", "Fourth year"]

  return (user ?
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
            <SelectOneThing controlId="settings.School" Label="School" options={colleges}/>
            <SelectOneThing controlId="settings.Major" Label="Major" options={majors} />
            <SelectOneThing controlId="settings.Year" Label="Year" options={year} />
          </Col>

          <Col xs={12} md={12} lg={12} xl={6}>
            <Form.Group controlId="settings.email">
              <Form.Label>Email address <b>(Cannot be changed)</b></Form.Label>
              <Form.Control size="sm" type="email" placeholder={user.email} disabled />
            </Form.Group>

            <Form.Group controlId="settings.Name">
              <Form.Label>Title<b></b></Form.Label>
              <Form.Control size="lg" type="Title" placeholder={p.title} />
              <Form.Control size="lg" type="email" placeholder={user.name} />

            </Form.Group>
            <Form.Group controlId="settings.Hobbies">
              <Form.Label>Hobbies</Form.Label>
              <Form.Control size="lg" as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="settings.Clubs">
              <Form.Label>Clubs</Form.Label>
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
