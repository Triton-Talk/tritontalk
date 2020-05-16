import React from 'react';

import { Form, Button, Col, Image, Modal} from 'react-bootstrap'
import styles from "./RegisterUser.css"
import Auth from '../utils/auth'
import request from '../utils/request'
import { Link} from 'react-router-dom';
const RegisterUser = () => {

  const { user, setUser } = React.useContext(Auth)

  const [localUser, _updateLocalUser] = React.useState({...user, name: '', image: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true', college: null, year: null, major: null,clubs:null,bio:null})

  const updateLocalUser = u => {
    _updateLocalUser(u)
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    const options = {body: {user: localUser}, method: 'PUT'}
    
    request('/api/user', options).then(res => {
      setUser(res)
    }).catch(error => {
      console.log(error)
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
      <label for="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
          <img for="photo-upload" src={src}/>
        </div>
        <input id="photo-upload" type="file" onChange={onChange}/> 
      </label>
      </div>
    );
}
    return (
      <Form onSubmit={handleSubmit}>
       <Form.Row  >
          <Col>
            <ImgUpload onChange={(e)=> photoUpload(e)} src={localUser.image}/>
          </Col>
          <Col>         
            <Form.Label >Name</Form.Label>
            <Form.Control size="sm" type="name" placeholder="Name" 
                        onChange={e => updateLocalUser({...localUser, name:e.target.value})}/>

            <Form.Label>College</Form.Label>
            <Form.Control size="sm" as="select" value="Choose..."  onChange={e => updateLocalUser({...localUser, college:e.target.value})}>
              {colleges.map((college, i) => <option key={i}>{college}</option>)}
            </Form.Control>

            <Form.Label>Major</Form.Label>
            <Form.Control size="sm" type="name" placeholder="Major" onChange={e => updateLocalUser({...localUser, major:e.target.value})}/>

            <Form.Label>Year</Form.Label>
            <Form.Control size="sm" as="select" value="Choose..."  onChange={e => updateLocalUser({...localUser, year:e.target.value})}>
              {years.map((year, i) => <option key={i}>{year}</option>)}
            </Form.Control>

            <Form.Label>Clubs</Form.Label>
            <Form.Control size="sm" as="select" value="Choose..."  onChange={e => updateLocalUser({...localUser, club:e.target.value})}>
              {clubs.map((club, i) => <option key={i}>{club}</option>)}
            </Form.Control>

            <Form.Label>Mini Bio</Form.Label>
            <Form.Control size="sm" as="textarea" rows="3" placeholder="Say something about yourself!" 
              value={localUser.bio} onChange={(e) => updateLocalUser({...localUser, bio:e.target.value})} />
          </Col>

        </Form.Row>
        <Link to='/home'>
          <Button type="submit" className="save">Submit</Button>
        </Link>
      </Form>
    )



}

export default RegisterUser;
