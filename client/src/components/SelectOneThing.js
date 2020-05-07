import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap'

const SelectOneThing = ({ label, options, value, onChange }) => {
  const hi = (label == 'Clubs') ? (<Form.Label>{label} <Button className="btn-warning">Add More Clubs</Button></Form.Label>) : (<Form.Label>{label} </Form.Label>)
  return (
    <Form.Group>

      {hi}
      <Form.Control size="lg" as="select" value={value} onChange={onChange}>
        {options.map((e, i) => <option key={i}>{e}</option>)}
      </Form.Control>
    </Form.Group>
  );
};

SelectOneThing.propTypes = {
  options: PropTypes.array,
};

export default SelectOneThing;









