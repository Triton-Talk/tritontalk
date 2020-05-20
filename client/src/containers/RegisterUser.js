import React from 'react';
import { Form, Button, Col, Modal } from 'react-bootstrap'
import { Link} from 'react-router-dom';
import majorDepartments from "../data/majorDepartments"
import "../styles/RegisterUser.css"

import Auth from '../utils/auth'
import request from '../utils/request'

const RegisterUser = () => {

  const { user, setUser } = React.useContext(Auth)
  
  const [localUser, _updateLocalUser] = React.useState(user)

  const [modal, setModal] = React.useState(0)

  const updateLocalUser = u => {
    _updateLocalUser(u)
  }

  if(localUser === null){
     if(user !== null) 
       updateLocalUser(user)
    return (
      <h1 align="center" className="loadertext"> Loading... </h1>
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    const options = {body: {user: localUser}, method: 'PUT'}
    
    request('/api/user/update', options, true).then(res => {
      for(let [key, value] of res.headers)
        console.log(key, value)
      res.body.then(a => setUser(a))
      setModal(1)
    }).catch(error => {
      console.log(error)
      setModal(-1)
    })
  }

  const colleges = ["Select One...", "Revelle", "Muir", "Warren", "Marshall", "ERC", "Sixth"]

  const years = ["Select One...", "First year", "Second year", "Third year", "Fourth year"]

  const clubs = ["Select One...", "IEEE", "..."]

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      updateLocalUser({...localUser,image:reader.result})

    }
    reader.readAsDataURL(file);
  }


  const ImgUpload =({
    onChange,
    src,
    })=>{
    return(
      <div >
      <h1>Profile Image</h1>
      <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
          <img alt="profile picture" htmlFor="photo-upload" src={src}/>
        </div>
        <input id="photo-upload" type="file" onChange={onChange}/> 
      </label>
      </div>
    );
}
    return (
      <>
        <Form style={{ minWidth: '600px' }} onSubmit={handleSubmit}>
         <Form.Row  >
            <Col>
              <ImgUpload onChange={(e)=> photoUpload(e)} src={localUser.picture}/>
            </Col>
            <Col>         
              <Form.Label >Name</Form.Label>
              <Form.Control size="sm" type="name" placeholder="Name" value={localUser.name}
                          onChange={e => updateLocalUser({...localUser, name:e.target.value})}/>

              <Form.Label>College</Form.Label>
              <Form.Control size="sm" as="select" value={localUser.college}
                            onChange={e => updateLocalUser({...localUser, college:e.target.value})}>
                {colleges.map((college, i) => <option key={i}>{college}</option>)}
              </Form.Control>

              <Form.Label>Major</Form.Label>
              <Form.Control size="sm" type="name" placeholder="Major" value={localUser.major}
                            onChange={e => updateLocalUser({...localUser, major:e.target.value})}>
                {majorDepartments.map((dept, i) => <option key={i}>{dept}</option>)}
              </Form.Control>

              <Form.Label>Year</Form.Label>
              <Form.Control size="sm" as="select" value={localUser.year}
                            onChange={e => updateLocalUser({...localUser, year:e.target.value})}>
                {years.map((year, i) => <option key={i}>{year}</option>)}
              </Form.Control>

              <Form.Label>Clubs</Form.Label>
              <Form.Control size="sm" as="select" value={localUser.club}
                            onChange={e => updateLocalUser({...localUser, club:e.target.value})}>
                {clubs.map((club, i) => <option key={i}>{club}</option>)}
              </Form.Control>

              <Form.Label>Major Department</Form.Label>
              <Form.Control size="sm" as="select" value={localUser.club}
                            onChange={e => updateLocalUser({...localUser, majorDepartment :e.target.value})}>
                {majorDepartments.map((majorD, i) => <option key={i}>{majorD}</option>)}
              </Form.Control>

              <Form.Label>Mini Bio</Form.Label>
              <Form.Control size="sm" as="textarea" rows="3" placeholder="Say something about yourself!" 
                value={localUser.bio} onChange={(e) => updateLocalUser({...localUser, bio:e.target.value})} />
            </Col>

          </Form.Row>
          <Button type="submit" className="save">Submit</Button>
        </Form>

        <Modal size="sm" show={modal === -1} onHide={() => setModal(0)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              There was an error! Let's try that again.
            </Modal.Title>
          </Modal.Header>
        </Modal>

        <Modal size="sm" show={modal === 1} onHide={() => setModal(0)} centered>
          <Modal.Header> 
            <Modal.Title>
              Nicely done! Time to visit Library Walk.
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{justifyContent: 'center'}}> 
            <Link to="/home">
              <Button>Let's Go!</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </>
    )

}

export default RegisterUser;
