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
      _setClubs(res.clubs)
      if (res.clubs[0]) {
        _setClubName(res.clubs[0].name)
      } else {
        _setClubName("Create a Club First!")
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const room = {name : clubName}
    const club = clubs[clubs.findIndex(e => e.name === clubName)]

    const options = {
      body: {room, club},
      method: 'POST'
    }

    request('/api/room/createForClub', options).then(res => console.log(res)).catch(err => console.log(err))
  }

  const handleReset = (e) => {
    e.preventDefault()

    const options = {
      body: {name: clubName},
      method: 'DELETE'
    }

    request('/api/room/delete', options).then(res => console.log(res)).catch(err => console.log(err))
  }

  return (
    <Form onSubmit={handleSubmit} onReset={handleReset}>
      <SelectOneThing label='Club' options={clubs.map(e => e.name)} value={clubName} 
                      onChange={e => _setClubName(e.target.value)} />
      <Button type='submit'>Make a Booth</Button>
      <Button type='reset'>Delete Booth</Button>
    </Form>
  )
}

export default CreateRoom
