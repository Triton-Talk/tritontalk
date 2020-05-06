import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap'

const SelectOneThing = (props) => {
  const friends = props.options;
  const items = []
  for (const [index, value] of friends.entries()) {
    items.push()
  }

  return (
    <Form.Group controlId={props.controlId}>
      <Form.Label>{props.Label}</Form.Label>
      <Form.Control size="lg" as="select">
        {friends.map((value, index) => {
          return <option> {value.key}</option>
        })}

      </Form.Control>
    </Form.Group>
  );
};

SelectOneThing.propTypes = {
  options: PropTypes.array,
};

export default SelectOneThing;









