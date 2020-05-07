import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const TableTile = ({ user }) => {

  return (
    <div>
      <Card style={{ margin: "8px" }}>
        <Card.Img variant="top" src={user.image} />
        <Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem><Card.Title>{user.title}</Card.Title></ListGroupItem>
            <ListGroupItem>{user.content}</ListGroupItem>
            <ListGroupItem>
              <Button style={{ marginRight: '5px' }} variant="warning">Message</Button>
              <Button variant="danger">Remove Friend</Button>
            </ListGroupItem>
          </ListGroup>
        </Card.Body>

      </Card>
    </div>
  )
}

export default TableTile;
