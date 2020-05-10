import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Info } from '@material-ui/icons';
export default function AlertDismissible() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ height: "200px", textAlign: "center" }}>
      <Alert show={show} style={{ backgroundColor: "rgb(190,147,54)" }}>
        <Alert.Heading><Info style={{ marginRight: "7px", marginBottom: "4px" }}></Info>COVID-19 Updates</Alert.Heading>
        <p>
          Visit UC San Diego’s Coronavirus portal for the latest information for the campus community.
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button onClick={() => setShow(false)} variant="outline-dark">
            Close
          </Button>
        </div>
      </Alert>

      {/* {Do this when closed} */}
    </div>
  );
}
