import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap'

const SelectOneThing = (props) => {
  const friends = props.options;

  return (
    <Form.Group controlId={props.controlId}>
      <Form.Label>{props.Label}</Form.Label>
      <Form.Control size="lg" as="select">
        {friends.map((value, index) => {
          return <option key={index}>{value}</option>
        })}

      </Form.Control>
    </Form.Group>
  );
};

SelectOneThing.propTypes = {
  options: PropTypes.array,
};

export default SelectOneThing;









