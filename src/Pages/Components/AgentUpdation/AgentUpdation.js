import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Button,
  Row,
  Col,
  Form
} from "react-bootstrap";
import styles from "../AgentUpdation/AgentUpdation.module.css";
import { updateAgent } from "../../Services/serviceList";
import {toast } from 'react-toastify';

toast.configure()
export default function AgentUpdation(props) {
  console.log(props.agentDetails);
  /* eslint-disable */
  const [agentDetails, setAgentDetails] = useState(props.agentDetails);
   /* eslint-disable */
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      fullName: agentDetails.agentName,
      emailAddress: agentDetails.emailAdd,
      mobileNo: agentDetails.mobileNo,
      zipCode: agentDetails.zipcode,
      region: agentDetails.region,
      agentCode: agentDetails.agentCode,
      agencyCode: agentDetails.agencyCode,
      agencyName: agentDetails.agencyName,
      branch: agentDetails.branch,
      experience: agentDetails.experience,
      age: agentDetails.age,
      gender: agentDetails.gender,
      language: agentDetails.spokenLanguage,
      education: agentDetails.education,
      average: agentDetails.average,
      preferredProduct:agentDetails.productPreferred.join(","),
    },
  });


    const handleUpdateAgent = async (agent) => {
      const update = await updateAgent(agent);
     console.log(update);
      toast.success('Updated Agent Successfully',{className:"toasted"})
     props.handleAgentUpdationClose()
    };

  const onSubmit = (data, e) => {
    e.preventDefault();
    const copyAgent = { ...agentDetails };
    copyAgent.agentName = data.fullName;
    copyAgent.emailAdd = data.emailAddress;
    copyAgent.mobileNo = data.mobileNo;
    copyAgent.zipcode = data.zipCode;
    copyAgent.region = data.region;
    copyAgent.branch = data.branch;
    copyAgent.agentCode = data.agentCode;
    copyAgent.agencyCode = data.agentCode;
    copyAgent.agencyName = data.agencyName;
    copyAgent.branch = data.branch;
    copyAgent.experience = data.experience;
    copyAgent.age = data.age;
    copyAgent.gender = data.gender;
    copyAgent.spokenLanguage = data.language;
    copyAgent.education = data.education;
    copyAgent.average = data.average;
    copyAgent.productPreferred = data.preferredProduct.split(",");
      handleUpdateAgent(copyAgent)
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleAgentUpdationClose} size="xl">
        <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Modal.Header className={"text-white bg-primary"}>
            <Modal.Title>
              {" "}
              <i className={"fa fa-edit cursor-pointer"} /> Update Agent
            </Modal.Title>
            <div
              className={"float-end cursor-pointer"}
              onClick={props.handleAgentUpdationClose}
            >
              <i className={"fa fa-times"}></i>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} md="3" controlId="fullName">
                <Form.Label>Agent Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
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
              Update Agent
            </Button>
            <Button
              variant="secondary"
              onClick={props.handleAgentUpdationClose}
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
