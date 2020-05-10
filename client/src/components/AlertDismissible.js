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
          Visit UC San Diego’s Coronavirus portal for the latest information for the campus community. <a style={{ color: "black", textDecorationLine: 'underline' }} href="https://coronavirus.ucsd.edu/?_ga=2.263315855.2087258241.1588918279-399187423.1541192885">VIEW DETAILS</a>
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
