import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Button,
  Row,
  Col,
  Form
} from "react-bootstrap";
import styles from "../LeadUpdation/LeadUpdation.module.css"
import { updateLead } from "../../Services/serviceList";
import { workflowMaster } from "../../Services/workflowMaster";
import {toast } from 'react-toastify';

toast.configure()
export default function LeadUpdation(props) {
  /*eslint-disable*/
  const [leadDetails, setLeadDetails] = useState(props.leadDetails);
  const [workflow, setWorkflow] = useState(workflowMaster());
  /*eslint-disable*/
  
  const { register, handleSubmit, errors } = useForm({defaultValues:{fullName : leadDetails.processData["Full Name"],
  emailAddress : leadDetails.processData["Email Address"],
  mobileNo : leadDetails.processData["Mobile No"],
  channel:leadDetails.processData.Channel,
  location: leadDetails.processData.Location,
  zipCode: leadDetails.processData["Zip Code"],
  language:leadDetails.processData["Primary Language"],
  notes:leadDetails.processData.Notes ? leadDetails.processData.Notes : "",
  status:leadDetails.processData["WF Status"]
}});

  

  const handleUpdateLead = async (lead) => {
    const update = await updateLead(lead);
   console.log(update);
   toast.success('Updated Lead Sucessfully',{className:"toasted"})
   props.handleLeadUpdationClose()
  };

 const onSubmit = (data,e)=>{
      e.preventDefault();
      const copyLead = { ...leadDetails };
            copyLead.processData["Full Name"] = data.fullName;
            copyLead.processData["Email Address"] = data.emailAddress;
            copyLead.processData["Mobile No"] = data.mobileNo;
            copyLead.processData.Channel = data.channel;
            copyLead.processData.Location = data.location;
            copyLead.processData["Zip Code"] = data.zipCode;
            copyLead.processData["Primary Language"] = data.language;
            copyLead.processData.Notes = data.notes;
            copyLead.processData["WF Status"] = parseInt(data.status);
            copyLead.processData["WF Description"] = workflow.wfStatus.get(
            parseInt(data.status, 10)
          );
          copyLead.processData["Audit Log"].push({
            AssignmentTeam: "Telemarketing",
            Event: "Contact Lead",
            Step: "Update lead info",
            Date: new Date(),
            AssignedToAgent: copyLead.processData.AssignedAgentName?copyLead.processData.AssignedAgentName:'NA',
            Score: copyLead.processData["Lead Score"],
            "WF Status": parseInt(copyLead.processData["WF Status"]),
            Comments: "",
          });
          handleUpdateLead(copyLead)
          
  }
  return (
    <>
      <Modal show={props.show} onHide={props.handleLeadUpdationClose} size="md">
        <Modal.Header className={"text-white bg-primary"}>
          <Modal.Title>
            {" "}
            <i className={"fa fa-edit cursor-pointer"} /> Update Lead
          </Modal.Title>
          <div
            className={"float-end cursor-pointer"}
            onClick={props.handleLeadUpdationClose}
          >
            <i className={"fa fa-times"}></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off' >
            <Row>
              <Form.Group as={Col} md="6" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name='fullName'
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter the Full Name",
                    },
                  })}
                />
                {errors.fullName && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.fullName.message}
                </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="emailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name='emailAddress'
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter email address",
                    },
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Please enter valid email address' 
                      }
                  })}
                />
                {errors.emailAddress && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.emailAddress.message}
                </span>
                )}
              </Form.Group>
            </Row>
            <Row className={"mt-2"}>
              <Form.Group as={Col} md="6" controlId="mobileNo">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNo"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter mobile number",
                    },
                    minLength: {
                        value: 11,
                        message: 'Please enter 11 digit Mobile No.' 
                    },
                    maxLength: {
                        value: 11,
                        message: 'Please enter 11 digit Mobile No.' 
                    }
                  })}
                />
                {errors.mobileNo && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.mobileNo.message}
                </span>
                )}
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="channel">
                <Form.Label>Channel</Form.Label>
                <Form.Control
                  as="select"
                  name="channel"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please select valid channel",
                    },
                  })}
                >
                  <option value=""> </option>
                  <option value="Marketing">Marketing</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Website">Website</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Campaign">Campaign</option>
                  <option value="Customer Referral">Customer Referral</option>
                </Form.Control>
                {errors.channel && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.channel.message}
                </span>
                )}
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <Form.Group as={Col} md="6" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter valid location",
                    },
                  })}
                />
                {errors.location && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.location.message}
                </span>
                )}
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zipCode"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter Zip Code",
                    },
                  })}
                />
                {errors.zipCode && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.zipCode.message}
                </span>
                )}
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <Form.Group as={Col} md="6" controlId="language">
                <Form.Label>Preferred Language</Form.Label>
                <Form.Control
                  type="text"
                  name="language"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter Language",
                    },
                  })}
                />
                {errors.language && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.language.message}
                </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please select the status",
                    },
                  })}
                >
                  <option value=""> </option>
                  <option value="1">Leads Imported</option>
                  <option value="2">Distributed to Agents</option>
                  <option value="3">Appointment Fixed</option>
                  <option value="4">Met the customer</option>
                  <option value="5">FNA initiated</option>
                  <option value="6">Quote generated</option>
                  <option value="7">Application submitted</option>
                  <option value="8">Sales closed</option>
                  <option value="9">Lead Rejected</option>
                  <option value="10">Lead Reassigned to Admin/Agent</option>
                  <option value="11">Lead Created</option>
                </Form.Control>
                {errors.status && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.status.message}
                </span>
                )}
              </Form.Group>
              
              
            </Row>
            <Row className="mt-2">
              <Form.Group as={Col} md="6" controlId="notes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  type="text"
                  name="notes"
                  ref={register({
                    required: {
                      value: false,
                    },
                  })}
                />
                
              </Form.Group>
            
              <Col md={6}>
                <Button
                  variant="primary"
                  className="mr-4"
                  style={{ marginTop: "28px" }}
                  type="submit"
                >
                  Update Lead
                </Button>
                <Button
                  variant="secondary"
                  onClick={props.handleLeadUpdationClose}
                  style={{ marginTop: "28px" }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
