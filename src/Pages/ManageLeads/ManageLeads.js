import React,{useState} from "react";
import NavBar from "../Components/NavBar/NavBar";
import { useHistory } from "react-router";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Container
} from "react-bootstrap";
import {searchLeads} from "../Services/serviceList"
import moment from "moment";
import ActivityBox from "../Components/ActivityBox/ActivityBox";
import AdditionalInfo from "../Components/AdditionalInfo/AdditionalInfo";
import LeadUpdation from "../Components/LeadUpdation/LeadUpdation";
import LeadCreation from "../Components/LeadCreation/LeadCreation";
import Footer from "../Components/Footer/Footer";

const ManageLeads = (props) => {
  const history = useHistory();
  const [leads, setLeads] = useState([]);
    // Modal States
  const [showActivityBox, setShowActivityBox] = useState(false);
  const [leadData, setLeadData] = useState({});
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showLeadUpdation, setShowLeadUpdation] = useState(false);
  const [showLeadCreation, setShowLeadCreation] = useState(false);
  const logout = () => {
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout ?");
    /* eslint-enable */
    if (toLogout) {
      localStorage.removeItem("token");
      history.push("/login");
    }
  };

  const handleSearch = async(txt)=>{
    if(txt!==''){
        const leads = await searchLeads(txt);
    setLeads(leads);
    }
  }
  const openActivityBox = (lead) => {
    setShowActivityBox(true);
    setLeadData(lead);
  };
  const handleActivityBoxClose = () => {
    setShowActivityBox(false);
  };

  const openAdditionalInfo = (lead) => {
    setShowAdditionalInfo(true);
    setLeadData(lead);
  };
  const handleAdditionalInfoClose = () => {
    setShowAdditionalInfo(false);
  };

  const openLeadUpdation = (lead) => {
    setShowLeadUpdation(true);
    setLeadData(lead);
  };
  const handleLeadUpdationClose = () => {
    setShowLeadUpdation(false);
  };
  const openLeadCreation = () => {
    setShowLeadCreation(true);
  };
  const handleLeadCreationClose = () => {
    setShowLeadCreation(false);
  };
  return (
    <>
      <Container fluid>
        <Row className={"mt-5"}>
          <NavBar handleLogout={() => logout()} />
        </Row>
      </Container>
      <Container >
        <Row className="mt-5">
          <Form.Control
            type="text"
            placeholder="Search for Name, email, Mobile no., Location, Zip code, Channel, Language, Classification"
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
          />
        </Row>
        <Row className={'mt-3'}>
        <Button variant="primary"  size="lg" block type="button" onClick={openLeadCreation} >
         Create Lead
        </Button>
        </Row>
      </Container>
      <Container fluid >
        <Row className={'mt-5'}>
            {leads.length>0 && leads.map(lead=>{
                return (
                    <Col md={4} key={lead._id}>
                        <Card className={'mb-4'} >
                            <Card.Header className="bg-primary text-white">
                               <Row>
                                   <Col md={11}>
                                   Lead ID - {lead.processID} 
                                   </Col>
                                   <Col md={1} >
                                   <i className={"fa fa-edit cursor-pointer"} onClick={()=>{openLeadUpdation(lead)}} ></i>
                                   </Col>
                               </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6} >
                                        <strong>Name</strong> : {lead.processData['Full Name']}
                                    </Col>
                                    <Col md={6} >
                                       <strong>Created On</strong> : {moment(lead.createdAt).format('LL')}
                                    </Col>
                                </Row>
                                <Row className={'mt-2'}>
                                    <Col md={6} >
                                        <strong>Lead Score</strong> : {lead.processData['Lead Score']}
                                    </Col>
                                    <Col md={6} >
                                       <strong>Classification</strong> : {lead.processData.Potential}
                                    </Col>
                                </Row>
                                <Row className={'mt-2'}>
                                    <Col md={6} >
                                        <strong>Status</strong> : {lead.processData['WF Description']}
                                    </Col>
                                    <Col md={6} >
                                       <strong>Location</strong> : {lead.processData.Location}
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row className={'mt-2'}>
                                    <Col md={2} >
                                        <i className="fa fa-tasks icon text-primary cursor-pointer" title="Click to manage lead" onClick={()=>{openActivityBox(lead)}} ></i>
                                    </Col>
                                    <Col md={1} >
                                        <i className="fa fa-info-circle icon text-primary cursor-pointer" title="Click to View Additional Info" onClick={()=>{openAdditionalInfo(lead)}} ></i>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row>
        {showActivityBox && (
        <ActivityBox
          show={showActivityBox}
          leadDetails={leadData}
          handleActivityBoxClose={() => {
            handleActivityBoxClose();
          }}
        />
      )}
      {showAdditionalInfo && (
        <AdditionalInfo
          show={showAdditionalInfo}
          leadDetails={leadData}
          handleAdditionalInfoClose={() => {
            handleAdditionalInfoClose();
          }}
        />
      )}
      {showLeadUpdation &&(
          <LeadUpdation
          show={showLeadUpdation}
          leadDetails={leadData}
          handleLeadUpdationClose={() => {
            handleLeadUpdationClose();
          }}
          />
      )}
      {showLeadCreation &&(
          <LeadCreation
          show={showLeadCreation}
          leadDetails={leadData}
          handleLeadCreationClose={() => {
            handleLeadCreationClose();
          }}
          />
      )}
      </Container>
      <Footer/>
    </>
  );
};
export default ManageLeads;
