import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Form, Button, Col, Image } from 'react-bootstrap'

const Filter = ({ props }) => {
  return (
    <div className="btn-group" role="group" aria-label="Button group with nested dropdown" >

      <div className="btn-group" role="group" style={{ textAlign: 'right', marginBottom: '15px' }}>

        <button id="btnGroupDrop1" type="button" className=" btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Filter Criteria
          </button>

        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <button className="dropdown-item" href="#">Alphabetical</button>
          <button className="dropdown-item" href="#">Forms Incompleted</button>
          <button className="dropdown-item" href="#">Time of Creation</button>
        </div>
      </div>
      <p className="h6" style={{ margin: '10px' }}>
        <small><b> {props.length} </b>  Friends</small>
      </p>
    </div>
  )
}

export default Filter;
