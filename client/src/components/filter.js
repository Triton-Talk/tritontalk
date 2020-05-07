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
          <a className="dropdown-item" href="#">Alphabetical</a>
          <a className="dropdown-item" href="#">Forms Incompleted</a>
          <a className="dropdown-item" href="#">Time of Creation</a>
        </div>
      </div>
      <p className="h6" style={{ margin: '10px' }}>
        <small><b> {props.length} </b>  Friends</small>
      </p>
    </div>
  )
}

export default Filter;
