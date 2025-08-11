import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  Form,
  Badge,
} from "react-bootstrap";
import {updateLead} from "../../Services/serviceList";
import moment from "moment";
import styles from '../ActivityBox/ActivityBox.module.css'
import {toast } from 'react-toastify';

toast.configure()
function ActivityBox(props) {
  
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

  const [comment,setComment]= useState('')
  const [toMail, setToMail ] = useState('');
  const [subject, setSubject]= useState('');
  const [body , setBody] = useState('');
  useEffect(() => {
    setLeadDetails(props.leadDetails);
    setToMail(props.leadDetails.processData["Email Address"])
  }, [props.leadDetails]);


 const handleAddComment =async ()=>{

if(comment!==''){
  const leadDetailsCopy = {...leadDetails};
leadDetailsCopy.processData['Audit Log'].push({
    AssignmentTeam: 'Telemarketing',
    Event: 'Contact Lead',
    Step: 'Update comment',
    Date: new Date(),
    AssignedToAgent: leadDetailsCopy.processData.AssignedAgentName?leadDetailsCopy.processData.AssignedAgentName:'NA',
    Score: leadDetailsCopy.processData['Lead Score'],
    'WF Status': leadDetailsCopy.processData['WF Status'],
    Comments: comment,
});
  const addComment = await updateLead(leadDetailsCopy);
  console.log(addComment);
  setComment('');
}
  }

  const handleEmail = ()=>{
    console.log(toMail, subject);
    console.log(body);
    window.Email.send({
      Host: "smtp.gmail.com",
      Username: "candelalabsmailer@gmail.com",
      Password: "wearecandela",
      To: toMail,
      From: "candelalabsmailer@gmail.com",
      Subject: subject,
      Body: body,
    })
      .then(function (message) {
        console.log("mail sent successfully");
        toast.success("Mail sent succefully",{
          className:'toasted'
        })
        setToMail('');
        setSubject('');
        setBody('');
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went Wrong",{
          className:'toasted'
        })
      });
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleActivityBoxClose} size="xl">
        <Modal.Header
         
        >
          <Modal.Title className={"text-primary"}>Lead Details</Modal.Title>
          <div className={'float-end cursor-pointer'} onClick={props.handleActivityBoxClose}>
            <i className={'fa fa-times'} ></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Card className={"shadow"} >
                <Card.Header className={"bg-primary text-white"}>
                  <Row>
                    <Col xs={6} md={4}>
                      Lead ID : {leadDetails.processID}
                    </Col>
                    <Col xs={6} md={4}>
                      Lead Score : {leadDetails.processData["Lead Score"]}
                    </Col>
                    <Col xs={6} md={4}>
                      Classification : {leadDetails.processData.Potential}
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={2}>
                        <i className={'fa fa-user-circle fa-4x text-secondary'} ></i>
                    </Col>
                    <Col md={10} className={"text-primary"}>
                      <Row>
                        <Col md={12}>
                          Name : {leadDetails.processData["Full Name"]}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          Email : {leadDetails.processData["Email Address"]}{" "}
                          <span>
                            {" "}
                            <i className={"fa fa-envelope"}></i>{" "}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          Phone : {leadDetails.processData["Mobile No"]}{" "}
                          <span>
                            {" "}
                            <i className={"fa fa-phone"}></i>{" "}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className={"mt-2"}>
                    <InputGroup>
                      <Form.Control as="select" custom>
                        <option></option>
                      </Form.Control>
                      <InputGroup.Prepend>
                        <InputGroup.Text
                          className={"bg-primary text-white cursor-pointer"}
                        >
                          Reassign to Agent
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </Row>

                  <Row className={"mt-2"}>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Write your comments here..."
                        onChange={(e)=>{setComment(e.target.value)}}
                      />
                      <InputGroup.Prepend onClick={()=>{handleAddComment()}} >
                        <InputGroup.Text
                          className={"bg-primary text-white cursor-pointer"}
                        >
                          Add
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </Row>
                  <Row className={"mt-2"}>
                    <h5 className={"text-primary"}>
                      Comments{" "}
                      <Badge pill variant="primary">
                        {leadDetails.processData['Audit Log'].length}
                      </Badge>
                    </h5>
                  </Row>
                  <Row className={"mt-2"}>
                    <Col md={12} className={`${styles.overflowy}`}>
                    {leadDetails && leadDetails.processData['Audit Log'].map(log=>{
                       
                        return (
                              log.Comments?<div key={new Date(log.Date).getTime()}>
                              <Row >
                            <Col md={8}>
                                {log.Comments}
                            </Col>
                            <Col md={4}>
                                <small>{moment(log.Date).format('LLL')}</small>
                            </Col>
                          </Row>
                          <hr className={'m-1'}></hr>
                            </div>:<p>Empty!</p>
                        )
                      }
                      )}
                    
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className={"border-left"} >
              <Card className={"shadow "}>
                <Card.Header className={"bg-primary text-white"}>
                  Send Email
                </Card.Header>
                <Card.Body style={{ minHeight: '21rem' }}>
                  <Row>
                    <Col md={2} className={'text-primary'}>
                      <strong>From</strong> :
                    </Col>
                    <Col md={10} className={'text-primary'}>
                    candelalabsmailer@gmail.com
                    </Col>
                  </Row>
                  <Row className={'mt-3'} >
                    <Col md={2} className={'text-primary'}>
                      <strong>To</strong> : 
                    </Col>
                    <Col md={10} className={'text-primary'}>
                    <Form.Control type="email" value={toMail} onChange={(e)=>{setToMail(e.target.value)}} /> 
                    </Col>
                  </Row>
                  <Row className={'mt-3'} >
                    <Col md={2} className={'text-primary'}>
                      <strong>Subject</strong> : 
                    </Col>
                    <Col md={10} className={'text-primary'}>
                    <Form.Control type="text" onChange={(e)=>{setSubject(e.target.value)}} /> 
                    </Col>
                  </Row>
                  <Row className={'mt-3'} >
                    <Col md={2} className={'text-primary'}>
                      <strong>Body</strong> : 
                    </Col>
                    <Col md={10} className={'text-primary'}>
                    <Form.Control as="textarea" rows={3} onChange={(e)=>{setBody(e.target.value)}}/>
                    </Col>
                  </Row>
                  <Row className={'mt-3 px-0 mx-0'} >
                    <Col md={7}> </Col>
                    <Col md={5} className={'px-0 mx-0'} >
                    <Button variant="primary" className={'ml-3'} onClick={handleEmail} > Send <i className="fa fa-paper-plane"></i> </Button>
                    <Button variant="secondary" className={'ml-5'}> Cancel </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleActivityBoxClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ActivityBox;
