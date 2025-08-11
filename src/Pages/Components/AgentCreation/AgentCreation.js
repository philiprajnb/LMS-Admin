import React from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import styles from "../AgentCreation/AgentCreation.module.css";
import { uploadAgent } from "../../Services/serviceList";
import {toast } from 'react-toastify';

toast.configure()

export default function AgentCreation(props) {
  const { register, handleSubmit, errors } = useForm();

  const createData =async (item)=>{
    var random = Math.floor(Math.random() * 89999) + 10000;
    var agentID = 'BL' + random;
    const schema = {
      agentID: agentID,
      agentName: item.agentName,
      region: item.region,
      zipcode: item.zipCode,
      branch: item.branch,
      agentCode: item.agentCode,
      agencyName: item.agencyName,
      agencyCode: item.agencyCode,
      mobileNo: item.mobileNo,
      emailAdd: item.emailAddress,
      gender: item.gender,
      age: item.age,
      education: item.education,
      spokenLanguage: item.language,
      experience: item.experience,
      average: item.average,
      productPreferred: item.preferredProduct.split(','),
      agentBuckets:[]
    };
    return schema;
}
 const onSubmit =async (data,e)=>{
    e.preventDefault();
    
    const createdAgent = await createData(data);
    console.log(createdAgent);
    const create = await uploadAgent(createdAgent);
    console.log(create);
    toast.success('Created Agent Successfully',{className:"toasted"})
    props.handleAgentCreationClose()
  }
  return (
    <>
      <Modal show={props.show} onHide={props.handleAgentCreationClose} size="xl">
        <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Modal.Header className={"text-white bg-primary"}>
            <Modal.Title>
              {" "}
              <i className={"fa fa-plus-circle cursor-pointer"} /> Create Agent
            </Modal.Title>
            <div
              className={"float-end cursor-pointer"}
              onClick={props.handleAgentCreationClose}
            >
              <i className={"fa fa-times"}></i>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} md="3" controlId="agentName">
                <Form.Label>Agent Name</Form.Label>
                <Form.Control
                  type="text"
                  name="agentName"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter the Full Name",
                    },
                  })}
                />
                {errors.agentName && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.agentName.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="emailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="emailAddress"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter email address",
                    },
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter valid email address",
                    },
                  })}
                />
                {errors.emailAddress && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.emailAddress.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="mobileNo">
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
                      message: "Please enter 11 digit Mobile No.",
                    },
                    maxLength: {
                      value: 11,
                      message: "Please enter 11 digit Mobile No.",
                    },
                  })}
                />
                {errors.mobileNo && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.mobileNo.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="zipCode">
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
              <Form.Group as={Col} md="3" controlId="region">
                <Form.Label>Region</Form.Label>
                <Form.Control
                  type="text"
                  name="region"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter valid region",
                    },
                  })}
                />
                {errors.region && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.region.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="agentCode">
                <Form.Label>Agent Code</Form.Label>
                <Form.Control
                  type="text"
                  name="agentCode"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter Agent Code",
                    },
                  })}
                />
                {errors.agentCode && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.agentCode.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="agencyCode">
                <Form.Label>Agency Code</Form.Label>
                <Form.Control
                  type="text"
                  name="agencyCode"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter Agency Code",
                    },
                  })}
                />
                {errors.agencyCode && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.agencyCode.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="agencyName">
                <Form.Label>Agency Name</Form.Label>
                <Form.Control
                  type="text"
                  name="agencyName"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter Agency Name",
                    },
                  })}
                />
                {errors.agencyName && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.agencyName.message}
                  </span>
                )}
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <Form.Group as={Col} md="3" controlId="branch">
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  type="text"
                  name="branch"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter branch",
                    },
                  })}
                />
                {errors.branch && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.branch.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="experience">
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="text"
                  name="experience"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter Experience",
                    },
                  })}
                />
                {errors.experience && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.experience.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter age",
                    },
                  })}
                />
                {errors.age && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.age.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  name="gender"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter gender",
                    },
                  })}
                />
                {errors.gender && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.gender.message}
                  </span>
                )}
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <Form.Group as={Col} md="3" controlId="language">
                <Form.Label>Spoken Language</Form.Label>
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

              <Form.Group as={Col} md="3" controlId="education">
                <Form.Label>Education</Form.Label>
                <Form.Control
                  type="text"
                  name="education"
                  ref={register({
                    required: {
                      value: false,
                      message: "Please enter Education",
                    },
                  })}
                />
                {errors.education && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.education.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="average">
                <Form.Label>Average</Form.Label>
                <Form.Control
                  type="text"
                  name="average"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter average",
                    },
                  })}
                />
                {errors.average && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.average.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="preferredProduct">
                <Form.Label>Products Preferred</Form.Label>
                <Form.Control
                  type="text"
                  name="preferredProduct"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter Products with , separated",
                    },
                  })}
                />
                {errors.preferredProduct && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.preferredProduct.message}
                  </span>
                )}
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="mr-4"
              style={{ marginTop: "28px" }}
              type="submit"
            >
              Create Agent
            </Button>
            <Button
              variant="secondary"
              onClick={props.handleAgentCreationClose}
              style={{ marginTop: "28px" }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
