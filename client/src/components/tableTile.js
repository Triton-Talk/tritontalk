import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap'

const TableTile = ({ user }) => {

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={user.image} />
        <Card.Body>
          <Card.Title>{user.title}</Card.Title>
          <Card.Text>
            {user.content}
          </Card.Text>
          <Button style={{ marginRight: '5px' }} variant="danger">Remove Friend</Button>
          <Button variant="primary">Message</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default TableTile;
