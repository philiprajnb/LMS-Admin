import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import styles from "../LeadCreation/LeadCreation.module.css"
import { createLeads } from "../../Services/serviceList";
import { workflowMaster } from "../../Services/workflowMaster";
import {toast } from 'react-toastify';

toast.configure()
export default function LeadCreation(props) {
  const { register, handleSubmit, errors } = useForm();
  /*eslint-disable*/
  const [workflow, setWorkflow] = useState(workflowMaster());
  /*eslint-disable*/
  
  const createData = async (item) => {
    // Generate UUID-like ID (in production, use proper UUID library)
    const leadId = 'LEAD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Parse company size to get numeric value for scoring
    const companySizeValue = item.companySize ? 
      (item.companySize.includes('+') ? 
        parseInt(item.companySize.replace('+', '')) : 
        parseInt(item.companySize.split('-')[1] || item.companySize.split('-')[0])
      ) : null;
    
    // Store the original company size string for display purposes
    const companySizeDisplay = item.companySize || '';
    
    // Parse annual revenue to get numeric value
    const annualRevenueValue = item.annualRevenue ? 
      (item.annualRevenue.includes('+') ? 
        parseFloat(item.annualRevenue.replace('+', '').replace(/[^0-9.]/g, '')) : 
        parseFloat(item.annualRevenue.split('-')[1]?.replace(/[^0-9.]/g, '') || item.annualRevenue.split('-')[0]?.replace(/[^0-9.]/g, ''))
      ) : null;
    
    const data = {
      id: leadId,
      first_name: item.firstName || '',
      last_name: item.lastName || '',
      email: item.email || '',
      phone: item.phone || '',
      job_title: item.jobTitle || '',
      
      company_id: item.companyId || null,
      company_name: item.companyName || '',
      company_website: item.companyWebsite || '',
      
      role_in_decision: item.roleInDecision || '',
      industry: item.industry || '',
      company_size: companySizeValue,
      company_size_display: companySizeDisplay, // Store original string value
      annual_revenue: annualRevenueValue,
      
      lead_source: item.leadSource || '',
      status: item.status || '',
      lead_score: 0, // Will be calculated below
      priority: item.priority || '',
      location: {
        city: item.city || '',
        state: item.state || '',
        country: item.country || ''
      },
      
      tags: item.tags ? item.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [],
      notes: item.notes || '',
      
      assigned_to: item.assignedTo || null,
      next_follow_up: item.nextFollowUp ? new Date(item.nextFollowUp).toISOString() : null,
      deal_stage: item.dealStage || '',
      account_id: item.accountId || null,
      
      custom_fields: {},
      source_campaign: item.sourceCampaign || '',
      communication_channel: item.communicationChannel || '',
      
      is_converted: false,
      converted_at: null,
      
      created_by: 'current_user_id', // This should come from auth context
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null
    };

    // Calculate lead score based on various factors
    let score = 0;
    
    // Company size scoring
    if (companySizeValue) {
      if (companySizeValue >= 1000) score += 20;
      else if (companySizeValue >= 200) score += 15;
      else if (companySizeValue >= 50) score += 10;
      else if (companySizeValue >= 10) score += 5;
    }
    
    // Role in decision scoring
    if (item.roleInDecision === 'Decision Maker') score += 25;
    else if (item.roleInDecision === 'Influencer') score += 15;
    else if (item.roleInDecision === 'Technical Evaluator') score += 10;
    
    // Priority scoring
    if (item.priority === 'High') score += 20;
    else if (item.priority === 'Urgent') score += 25;
    else if (item.priority === 'Medium') score += 10;
    
    // Lead source scoring
    if (item.leadSource === 'Customer Referral') score += 15;
    else if (item.leadSource === 'Website') score += 10;
    else if (item.leadSource === 'Email Marketing') score += 8;
    
    // Industry scoring (high-value industries)
    if (item.industry === 'Technology') score += 10;
    else if (item.industry === 'Finance') score += 12;
    else if (item.industry === 'Healthcare') score += 10;
    
    // Annual revenue scoring
    if (annualRevenueValue) {
      if (annualRevenueValue >= 1000000000) score += 15; // $1B+
      else if (annualRevenueValue >= 100000000) score += 12; // $100M+
      else if (annualRevenueValue >= 10000000) score += 8; // $10M+
    }
    
    data.lead_score = Math.min(score, 100);
    
        return data;
  }
   const onSubmit = async (data, e) => {
    e.preventDefault();
    
    console.log('Form data received:', data);
    
    const createdLead = await createData(data);
    console.log('Processed lead data:', createdLead);
    
    try {
      const uploaded = await createLeads(createdLead);
      console.log('API response:', uploaded);
      toast.success('Created Lead Successfully', {className: "toasted"});
      props.handleLeadCreationClose();
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error('Failed to create lead. Please try again.', {className: "toasted"});
    }
  }
  return (
    <>
      <Modal show={props.show} onHide={props.handleLeadCreationClose} size="lg">
        <Modal.Header className={"text-white bg-primary"}>
          <Modal.Title>
            {" "}
            <i className={"fa fa-plus-circle cursor-pointer"} /> Create Lead
          </Modal.Title>
          <div
            className={"float-end cursor-pointer"}
            onClick={props.handleLeadCreationClose}
          >
            <i className={"fa fa-times"}></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off' >
            {/* Personal Information */}
            <Row>
              <Form.Group as={Col} md="3" controlId="firstName">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  type="text"
                  name='firstName'
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter the First Name",
                    },
                  })}
                />
                {errors.firstName && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.firstName.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="lastName">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  type="text"
                  name='lastName'
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter the Last Name",
                    },
                  })}
                />
                {errors.lastName && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.lastName.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="email">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  name='email'
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
                {errors.email && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.email.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="phone">
                <Form.Label>Phone Number *</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.phone.message}
                  </span>
                )}
              </Form.Group>
            </Row>

            <Row className="mt-2">
              <Form.Group as={Col} md="3" controlId="jobTitle">
                <Form.Label>Job Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="jobTitle"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter job title",
                    },
                  })}
                />
                {errors.jobTitle && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.jobTitle.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="roleInDecision">
                <Form.Label>Role in Decision *</Form.Label>
                <Form.Control
                  as="select"
                  name="roleInDecision"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please select role in decision",
                    },
                  })}
                >
                  <option value="">Select Role</option>
                  <option value="Decision Maker">Decision Maker</option>
                  <option value="Influencer">Influencer</option>
                  <option value="End User">End User</option>
                  <option value="Technical Evaluator">Technical Evaluator</option>
                </Form.Control>
                {errors.roleInDecision && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.roleInDecision.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="companyName">
                <Form.Label>Company Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter company name",
                    },
                  })}
                />
                {errors.companyName && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.companyName.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="companyWebsite">
                <Form.Label>Company Website</Form.Label>
                <Form.Control
                  type="url"
                  name="companyWebsite"
                  placeholder="https://example.com"
                  ref={register({
                    required: false,
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Please enter valid URL starting with http:// or https://'
                    }
                  })}
                />
                {errors.companyWebsite && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.companyWebsite.message}
                  </span>
                )}
              </Form.Group>
            </Row>

            <Row className="mt-2">
              <Form.Group as={Col} md="3" controlId="industry">
                <Form.Label>Industry *</Form.Label>
                <Form.Control
                  as="select"
                  name="industry"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please select industry",
                    },
                  })}
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Education">Education</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Other">Other</option>
                </Form.Control>
                {errors.industry && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.industry.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="companySize">
                <Form.Label>Company Size *</Form.Label>
                <Form.Control
                  as="select"
                  name="companySize"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please select company size",
                    },
                  })}
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-1000">201-1000</option>
                  <option value="1001-5000">1001-5000</option>
                  <option value="5000+">5000+</option>
                </Form.Control>
                {errors.companySize && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.companySize.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="leadSource">
                <Form.Label>Lead Source *</Form.Label>
                <Form.Control
                  as="select"
                  name="leadSource"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please select lead source",
                    },
                  })}
                >
                  <option value="">Select Source</option>
                  <option value="Website">Website</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Email Marketing">Email Marketing</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Trade Show">Trade Show</option>
                  <option value="Customer Referral">Customer Referral</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Other">Other</option>
                </Form.Control>
                {errors.leadSource && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.leadSource.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="status">
                <Form.Label>Status *</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please select status",
                    },
                  })}
                >
                  <option value="">Select Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </Form.Control>
                {errors.status && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.status.message}
                  </span>
                )}
              </Form.Group>
            </Row>



            <Row className="mt-2">
              <Form.Group as={Col} md="3" controlId="priority">
                <Form.Label>Priority *</Form.Label>
                <Form.Control
                  as="select"
                  name="priority"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please select priority",
                    },
                  })}
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </Form.Control>
                {errors.priority && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.priority.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="dealStage">
                <Form.Label>Deal Stage *</Form.Label>
                <Form.Control
                  as="select"
                  name="dealStage"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please select deal stage",
                    },
                  })}
                >
                  <option value="">Select Stage</option>
                  <option value="Prospecting">Prospecting</option>
                  <option value="Qualification">Qualification</option>
                  <option value="Needs Analysis">Needs Analysis</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed">Closed</option>
                </Form.Control>
                {errors.dealStage && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.dealStage.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="city">
                <Form.Label>City *</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter city",
                    },
                  })}
                />
                {errors.city && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.city.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="state">
                <Form.Label>State/Province *</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter state/province",
                    },
                  })}
                />
                {errors.state && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.state.message}
                  </span>
                )}
              </Form.Group>
            </Row>



            <Row className="mt-2">
              <Form.Group as={Col} md="3" controlId="country">
                <Form.Label>Country *</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter country",
                    },
                  })}
                />
                {errors.country && (
                  <span className={`${styles.errorMessage} mandatory`}>
                    {errors.country.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="nextFollowUp">
                <Form.Label>Next Follow-up</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="nextFollowUp"
                  ref={register({
                    required: false,
                  })}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  placeholder="Enter tags separated by commas"
                  ref={register({
                    required: false,
                  })}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="communicationChannel">
                <Form.Label>Communication Channel</Form.Label>
                <Form.Control
                  as="select"
                  name="communicationChannel"
                  ref={register({
                    required: false,
                  })}
                >
                  <option value="">Select Channel</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Video Call">Video Call</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </Row>



            <Row className="mt-2">
              <Form.Group as={Col} md="3" controlId="sourceCampaign">
                <Form.Label>Source Campaign</Form.Label>
                <Form.Control
                  type="text"
                  name="sourceCampaign"
                  placeholder="Campaign name or ID"
                  ref={register({
                    required: false,
                  })}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="annualRevenue">
                <Form.Label>Annual Revenue</Form.Label>
                <Form.Control
                  as="select"
                  name="annualRevenue"
                  ref={register({
                    required: false,
                  })}
                >
                  <option value="">Select Revenue</option>
                  <option value="0-1000000">$0 - $1M</option>
                  <option value="1000001-10000000">$1M - $10M</option>
                  <option value="10000001-100000000">$10M - $100M</option>
                  <option value="100000001-1000000000">$100M - $1B</option>
                  <option value="1000000000+">$1B+</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="notes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notes"
                  placeholder="Additional notes about the lead..."
                  ref={register({
                    required: false,
                  })}
                />
              </Form.Group>
            </Row>



            <Row className="mt-3">
              <Col md={12} className="text-center">
                <Button
                  variant="primary"
                  className="me-3"
                  type="submit"
                >
                  Create Lead
                </Button>
                <Button
                  variant="secondary"
                  onClick={props.handleLeadCreationClose}
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
