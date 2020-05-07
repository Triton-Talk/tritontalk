import React from 'react';
import { Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Image } from 'react-bootstrap'
import Auth from '../context/auth'

import SelectOneThing from '../components/SelectOneThing';

const Settings = ({ p }) => {

  const oldUser = React.useContext(Auth).user
  const { credential, URL } = React.useContext(Auth)

  const [user, setUser] = React.useState(oldUser)
  
  const handleSubmit = (event) => {
    event.preventDefault()

    const method = 'PUT'
    const body = JSON.stringify({credential, user})
    const headers = {'Content-Type': 'application/json'}

    fetch(URL+'/api/updateUser', {
      method,
      body,
      headers
    }).then(response => {
      if(response.status === 200)
        return response.json()
      else
        throw new Error()
    }).then(res => {
      setUser(res)
      alert('User was successfully updated')
    }).catch(error => {
      alert('There was an error! Please try again.')
    })
  }

  const handleReset = (event) => {
    event.preventDefault()

    setUser({...oldUser})
  }

  const colleges = ["Revelle", "Muir", "Warren", "Marshall", "ERC", "Sixth"]

  const majors = ["Computer Science", "Biology", "Electrical Engineering", "Other"]

  const years = ["First year", "Second year", "Third year", "Fourth year"]

  return (
    <div>
      <hr />
      <form style={{ maxWidth: "95%" }} onSubmit = {handleSubmit} 
            onReset={handleReset}>
        <div className='row'>
          <div className='col'>

            <center>
              <Image src={user.picture} />
            </center>

            <SelectOneThing controlId="settings.School" label="School" 
                options={colleges} value={user.college}
                onChange={(e) => setUser({...user, college: e.target.value})}/>
            <SelectOneThing controlId="settings.Major" label="Major" 
                options={majors} value={user.year}
                onChange={(e) => setUser({...user, major: e.target.value})}/>
            <SelectOneThing controlId="settings.Year" label="Year" 
                options={years} value={user.year}
                onChange={(e) => setUser({...user, year: e.target.value})}/>
          </div>

          <div className='col'>
            <div className='form-group'>
              <label>Email address <b>(Cannot be changed)</b></label>
              <input className='form-control' placeholder={user.email} disabled />
            </div>

            <div className='form-group'>
              <label>Name<b></b></label>
              <input className='form-control' value={user.name} 
                     onChange={(e) => setUser({...user, name: e.target.value})}/>
            </div>

            <div className='form-group'>
              <label>Hobbies<b></b></label>
              <textarea className='form-control' value={user.hobbies} 
                        onChange={(e) => setUser({...user, hobbies: e.target.value})}/>
            </div>

            <div className='form-group'>
              <label>Clubs<b></b></label>
              <textarea className='form-control' value={user.clubs} 
                        onChange={(e) => setUser({...user, clubs: e.target.value})}/>
            </div>

            <div className='form-group'>
              <label>Biography<b></b></label>
              <textarea className='form-control' value={user.bio} 
                        onChange={(e) => setUser({...user, bio: e.target.value})}/>
            </div>
          </div>

        </div>
        <hr />
        <center>
          <Button size="lg" variant="primary" type="submit">
            Update
          </Button>

          <Button size="lg" variant="primary" type="reset">
            Reset
          </Button>
        </center>
      </form>
    </div>
  )
}

export default Settings;
