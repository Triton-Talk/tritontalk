import React from 'react'

import { useLocation, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, Col, Image, Modal,Card} from 'react-bootstrap'

import Auth from '../utils/auth'
import request from '../utils/request'

import majorDepartments from '../data/majorDepartments'

import {SelectOneThing} from '../components/SelectOneThing'

const Settings = () => {

  const { user, setUser, handleSignOut } = React.useContext(Auth)

  const [localUser, _updateLocalUser] = React.useState(user)
  const [modal, setModal] = React.useState(false)

  const [disabled, _setDisabled] = React.useState(false)

  const setDisabled = d => console.log('SETTING DISABLED TO', d, _setDisabled(d))

  const location = useLocation()
  const newUser = location.state ? location.state.newUser : false

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
    setDisabled(true)

    event.preventDefault()
    
    const options = {body: {user: localUser}, method: 'PUT'}
    
    request('/api/user/update', options).then(res => {
      setUser(res)
      setModal(newUser ? 'set' : 'updated')
    }).catch(error => {
      console.log(error)
      setModal('failure')
    }).finally(() => setDisabled(false))
  }

  const handleReset = event => {
    event.preventDefault()

    updateLocalUser({ ...user })
  }


  const handleDelete = event => {
    setDisabled(true)

    const options = {body: {user: localUser}, method: 'DELETE'}
    
    request('/api/user/delete', options).then(res => {
      console.log(res)
      handleSignOut()
    }).catch(error => {
      console.log(error)
      setModal('failure')
    })
  }


  const spriteCard = (sprite) =>{
    return (
      <Card style={{width:150,height:150}}>
        <Card.Body style={{justifyContent:"center",alignItems:"center",flex:1,flexDirection:"column"}}>
          <Image src={sprite.image} style={{width:"80%",height:"80%"}}/>
          <h4 style={{fontSize:15, color:"black", marginTop:"5px"}}>{sprite.displayName}</h4>
        </Card.Body>
      </Card>
    )
  }

  const handleClose = () => setModal(false)

  const colleges = ["Select One...", "Revelle", "Muir", "Warren", "Marshall", "ERC", "Sixth"]

  const years = ["Select One...", "First year", "Second year", "Third year", "Fourth year"]

  const sprites = [
    {
      displayName:"Triton",
      name:"tritondude",
      image: "./assets/standing/tritondude.png",
    },
    {
      displayName: "Amphitrite",
      name:"queen",
      image: "./assets/standing/queen.png",
    },
    {
      displayName:"Sun God",
      name:"sungod",
      image: "./assets/standing/sungod.png",
    },
    {
      displayName:"Neptune",
      name:"neptune",
      image: "./assets/standing/neptune.png",
    },
    {
      displayName:"Anuket",
      name:"anuket",
      image: "./assets/standing/anuket.png",
    },
    {
      displayName:"Chalchiuhtlicue",
      name:"chalchiuhtlicue",
      image: "./assets/standing/chalchiuhtlicue.png",
    },
    {
      displayName:"Dakuwaqa",
      name:"dakuwaqa",
      image: "./assets/standing/dakuwaqa.png",
    },
    {
      displayName:"Olokun",
      name:"olokun",
      image: "./assets/standing/olokun.png",
    }
  ]
    //"tritondude", "sungod", "queen", "neptune", "anuket", "chalchiuhtlicue", "dakuwaqa", "olokun"];
  return (
    <div>
      <br />
      <Form style={{ maxWidth: "95%" }} onSubmit={handleSubmit} onReset={handleReset}>
        <Form.Row>
          <Col xs={12} md={12} lg={12} xl={6}>

          <Form.Group controlId="settings.Sprite" label="Sprite">
            <Form.Label>Player Sprite</Form.Label>
              <div className="flex-wrap" style={{display:"flex",flexDirection:"row"}}>
                {sprites.map((sprite,i) => 
                    <Button variant={localUser.sprite === sprite.name ? "primary" : "light"}
                            key={i}
                            checked={true}
                            onClick={(e) => {
                              sprite.clicked = true
                              updateLocalUser({ ...localUser, sprite: sprite.name})}}>
                        {spriteCard(sprite)}
                    </Button>)}
              </div>
            </Form.Group>

            <Form.Group controlId="settings.email">
              <Form.Label>Email address <b>(Cannot be changed)</b></Form.Label>
              <Form.Control size="lg" type="email" placeholder={localUser.email} disabled />
            </Form.Group>

            <Form.Group controlId="settings.Name">
              <Form.Label>Name<b> (Cannot be changed)</b></Form.Label>
              <Form.Control size="lg" placeholder={localUser.name} disabled />              
            </Form.Group>

            
          </Col>

          <Col xs={12} md={12} lg={12} xl={6}>
          <SelectOneThing controlId="settings.School" label="School"
              options={colleges} value={localUser.college}
              onChange={(e) => updateLocalUser({ ...localUser, college: e.target.value })} />

            <SelectOneThing controlId="settings.Major" label="Major"
              options={majorDepartments} value={localUser.major}
              onChange={(e) => updateLocalUser({ ...localUser, major: e.target.value })} />

            <SelectOneThing controlId="settings.Year" label="Year"
              options={years} value={localUser.year}
              onChange={(e) => updateLocalUser({ ...localUser, year: e.target.value })} />

            <Form.Group controlId="settings.Bio">
              <Form.Label>Mini Biography</Form.Label>
              <Form.Control size="lg" as="textarea" rows="3" value={localUser.bio}
                onChange={(e) => updateLocalUser({ ...localUser, bio: e.target.value })} />
            </Form.Group>
            
            {/* <SelectOneThing controlId="settings.Sprite" label="Sprite"
              options={sprites} value={localUser.sprite}
              onChange={(e) => updateLocalUser({ ...localUser, sprite: e.target.value})} /> */}
            
          </Col>
        </Form.Row>
        <hr />
        <div style={{display:'flex', justifyContent: 'space-evenly'}}>
          {newUser ? 
          null :
          <Button style={{ backgroundColor: 'gray' }} size="lg" variant="dark" type="reset">
            Reset
          </Button>
          }

          <Button style={{ backgroundColor: 'blue'}} size="lg" variant="dark" type="submit" disabled={disabled}>
            {newUser ? 'Save' : 'Update'}
          </Button>


          {newUser ? 
          null : 
          <Button style={{ backgroundColor: 'red' }} size="lg" variant="dark"  disabled={disabled}
                  onClick = {e => setModal('delete')}>
            Delete 
          </Button>
          }
        </div>
      </Form>

      <Modal show={modal === 'set' || modal === 'updated' || modal === 'deleted'} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>User successfully {modal}</Modal.Title>
	      </Modal.Header>
        <Modal.Footer>
        <Link to="/">
          <Button>Go to Library Walk</Button>
        </Link>
      </Modal.Footer>
      </Modal>

      <Modal show={modal === 'failure'} onHide={handleClose} centered> 
	<Modal.Header closeButton>
            <Modal.Title>There was an error! Let's try that again.</Modal.Title>
	</Modal.Header>
      </Modal>


    <Modal size="lg" show={modal === 'delete'} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{color: 'red'}}>
          Are you sure you wish to proceed?	
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>This will delete all of your user data permanently! It cannot be undone.</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ backgroundColor: 'red' }} disabled={disabled} onClick={handleDelete}>Delete</Button>
        <Button onClick={handleClose} disabled={disabled}>Cancel</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default Settings;
