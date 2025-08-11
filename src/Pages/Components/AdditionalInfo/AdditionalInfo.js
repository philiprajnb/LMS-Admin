import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
function AdditionalInfo(props) {
  const [leadDetails, setLeadDetails] = useState({
    processID :'',
    processData:{
        "Full Name": '',
        "Email Address": '',
        "Mobile No": '',
        "Lead Score": 0,
        "Potential": '',
        "Audit Log": []
    }
  });
  useEffect(() => {
    setLeadDetails(props.leadDetails);
  }, [props.leadDetails]);
  return (
    <>
      
      <Modal show={props.show} onHide={props.handleAdditionalInfoClose} size="md">
        <Modal.Header
         className={"text-white bg-primary"}
        >
          <Modal.Title ><i className={"fa fa-info-circle"}></i> Additional Info for Lead : {leadDetails.processID}</Modal.Title>
          <div className={'float-end cursor-pointer'} onClick={props.handleAdditionalInfoClose}>
            <i className={'fa fa-times'} ></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Card >
                <Card.Body>
                  <Row>
                    <Col md={10} >
                      <Row>
                        <Col md={5} className={"font-weight-bold"}>
                          Email Address :
                        </Col>
                        <Col md={7}>
                            {leadDetails.processData["Email Address"]}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={5} className={"font-weight-bold"}>
                          Mobile No :
                        </Col>
                        <Col md={7}>
                            {leadDetails.processData["Mobile No"]}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={5} className={"font-weight-bold"}>
                         Channel :
                        </Col>
                        <Col md={7}>
                            {leadDetails.processData["Channel"]}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={5} className={"font-weight-bold"}>
                         Location :
                        </Col>
                        <Col md={7}>
                            {leadDetails.processData["Location"]}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={5} className={"font-weight-bold"}>
                         Zip Code :
                        </Col>
                        <Col md={7}>
                            {leadDetails.processData["Zip Code"]}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={5} className={"font-weight-bold text-nowrap"}>
                         Preferred Language:
                        </Col>
                        <Col md={7}>
                            {leadDetails.processData["Primary Language"]}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={5} className={"font-weight-bold text-nowrap"}>
                         Notes :
                        </Col>
                        <Col md={7}>
                            {leadDetails.processData["Notes"]}
                        </Col>
                      </Row>
                     </Col>
                  </Row>
                   </Card.Body>
              </Card>
            </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleAdditionalInfoClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdditionalInfo;
