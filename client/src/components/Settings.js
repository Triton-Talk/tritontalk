import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Image } from 'react-bootstrap'
import Auth from '../auth'
import SelectOneThing from '../components/SelectOneThing';
const Settings = ({ p }) => {
  const { user } = React.useContext(Auth)
  console.log({ user })
  p = {
    name: "Kimba  Stanzah",
    title: "Class President",
    email: "kstanzah@ucsd.esdu"
  }



  return (
    <div>
      <hr />
      <Form style={{ maxWidth: "95%" }}>
        <Form.Row>
          <Col xs={12} md={12} lg={12} xl={6}>

            <Form.Group controlId="settings.image">
              <center>
                <Image src={user.photoURL} rounded />
              </center>
            </Form.Group>
            <SelectOneThing controlId="settings.School" Label="School" options={[{ key: "Thursgood Marshall" }, { key: "2" }, { "key": 3 }, { "key": 4 }, { "key": 5 }]} />
            <SelectOneThing controlId="settings.Major" Label="Major" options={[{ key: "Computer Science" }, { key: "2" }, { "key": 3 }, { "key": 4 }, { "key": 5 }]} />
            <SelectOneThing controlId="settings.Year" Label="Year" options={[{ key: "2019" }, { key: "2" }, { "key": 3 }, { "key": 4 }, { "key": 5 }]} />
          </Col>

          <Col xs={12} md={12} lg={12} xl={6}>
            <Form.Group controlId="settings.email">
              <Form.Label>Email address <b>(Cannot be changed)</b></Form.Label>
              <Form.Control size="sm" type="email" placeholder={user.email} disabled />
            </Form.Group>

            <Form.Group controlId="settings.Name">
              <Form.Label>Title<b></b></Form.Label>
              <Form.Control size="lg" type="Title" placeholder={p.title} />
              <Form.Control size="lg" type="name" placeholder={user.displayName} disabled />

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

    </div>
  )
}

export default Settings;
