import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

import {SelectOneThing} from '../components/SelectOneThing'

import request from '../utils/request'

const CreateRoom = () => {
  const [clubName, _setClubName] = useState('')
 
  //let clubs = []
  const [clubs, _setClubs] = useState([])

  if(clubs.length === 0){
    request('/api/user/me', {method: 'GET'}).then(res => {
      console.log(res)
      _setClubs(res.clubs.map(e => e.name))
      _setClubName(res.clubs[0].name)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const room = {name : clubName}
    console.log('requesting', room)
    request('/api/room/createForClub', {body: {room}, method: 'POST'})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <SelectOneThing label='Club' options={clubs} value={clubName} onChange={e => _setClubName(e)} />
      <Button type='submit'>Make a Booth</Button>
    </Form>
  )
}

export default CreateRoom