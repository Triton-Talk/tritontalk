import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap'

const SelectOneThing = ({label, options, value, onChange}) => {

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control size="lg" as="select" value={value} onChange={onChange}>
        { options.map((e, i) => <option key={i}>{e}</option>) }
      </Form.Control>
    </Form.Group>
  );
};

SelectOneThing.propTypes = {
  options: PropTypes.array,
};

export default SelectOneThing;









