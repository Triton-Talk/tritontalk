import React from 'react';
import { Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Image } from 'react-bootstrap'
import Auth from '../context/auth'

import SelectOneThing from '../components/SelectOneThing';

const Settings = ({ p }) => {

  const oldUser = React.useContext(Auth).user
  const { credential, URL } = React.useContext(Auth)

  const [user, _setUser] = React.useState(oldUser)

  const setUser = u => {
    _setUser(u)
    console.log(u)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const method = 'PUT'
    const body = JSON.stringify({ credential, user })
    const headers = { 'Content-Type': 'application/json' }

    fetch(URL + '/api/updateUser', {
      method,
      body,
      headers
    }).then(response => {
      if (response.status === 200)
        return response.json()
      else
        throw new Error()
    }).then(res => {
      setUser(res)
      alert('User was successfully updated')
    }).catch(error => {
      alert('There was an error! Please try again.')
      console.log(error)
    })
  }

  const handleReset = (event) => {
    event.preventDefault()

    setUser({ ...oldUser })
  }

  const colleges = ["Select One...", "Revelle", "Muir", "Warren", "Marshall", "ERC", "Sixth"]

  const majors = ["Select One...", "Computer Science", "Biology", "Electrical Engineering", "Other"]

  const years = ["Select One...", "First year", "Second year", "Third year", "Fourth year"]

  return (
    <div>
      <hr />
      <Form style={{ maxWidth: "95%" }} onSubmit = {handleSubmit} onReset={handleReset}>
        <Form.Row>
          <Col xs={12} md={12} lg={12} xl={6}>

            <Form.Group controlId="settings.image">
              <center>
                <Image src={user.picture} rounded />
              </center>
            </Form.Group>
            <SelectOneThing controlId="settings.School" label="School" 
                options={colleges} value={user.college}
                onChange={(e) => setUser({...user, college: e.target.value})}/>
            <SelectOneThing controlId="settings.Major" label="Major" 
                options={majors} value={user.major}
                onChange={(e) => setUser({...user, major: e.target.value})}/>
            <SelectOneThing controlId="settings.Year" label="Year" 
                options={years} value={user.year}
                onChange={(e) => setUser({...user, year: e.target.value})}/>
          </Col>

          <Col xs={12} md={12} lg={12} xl={6}>
            <Form.Group controlId="settings.email">
              <Form.Label>Email address <b>(Cannot be changed)</b></Form.Label>
              <Form.Control size="sm" type="email" placeholder={user.email} disabled />
            </Form.Group>

            <Form.Group controlId="settings.Name">
              <Form.Label>Name<b></b></Form.Label>
              <Form.Control size="lg" value={user.name}
                 onChange={(e) => setUser({...user, name: e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="settings.Hobbies">
              <Form.Label>Hobbies</Form.Label>
              <Form.Control size="lg" as="textarea" rows="3" value={user.hobbies}
                  onChange={(e) => setUser({...user, hobbies: e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="settings.Clubs">
              <Form.Label>Clubs</Form.Label>
              <Form.Control size="lg" as="textarea" rows="3" value={user.clubs}
                  onChange={(e) => setUser({...user, clubs: e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="settings.Bio">
              <Form.Label>Mini Biography</Form.Label>
              <Form.Control size="lg" as="textarea" rows="3" value={user.bio}
                  onChange={(e) => setUser({...user, bio: e.target.value})}/>
            </Form.Group>
          </Col>
        </Form.Row>
        <hr />
        <center>
          <Button style={{ margin: "4px", backgroundColor: 'blue' }} size="lg" variant="dark" type="submit">
            Update
          </Button>

          <Button style={{ margin: "4px", backgroundColor: 'red' }} size="lg" variant="dark" type="reset">
            Reset
          </Button>

        </center>
      </Form>

    </div>
  )
}

export default Settings;
