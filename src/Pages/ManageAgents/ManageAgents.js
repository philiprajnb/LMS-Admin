import React,{useState} from "react";
import NavBar from "../Components/NavBar/NavBar";
import { useHistory } from "react-router";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import {searchAgents} from "../Services/serviceList";
import AgentTable from "../Components/Table/AgentTable";
import AgentUpdation from "../Components/AgentUpdation/AgentUpdation";
import AgentCreation from "../Components/AgentCreation/AgentCreation";
import Footer from "../Components/Footer/Footer";

const ManageAgents = (props) => {
  const history = useHistory();
  const [agents, setAgents] = useState([]);
  
  // Modal States
  const [showAgentUpdation, setShowAgentUpdation] = useState(false);
  const [showAgentCreation, setShowAgentCreation] = useState(false);
  const [agentData, setAgentData] = useState({});
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
    const data =  {searchFltrText: txt}
    if(txt!==''){
        const agents = await searchAgents(data);
        console.log(agents);
    setAgents(agents);
    }
  }
  const openAgentUpdation = (agent) => {
    setShowAgentUpdation(true);
    setAgentData(agent);
  };
  const handleAgentUpdationClose = () => {
    setShowAgentUpdation(false);
  };
  const openAgentCreation = () => {
    setShowAgentCreation(true);
  };
  const handleAgentCreationClose = () => {
    setShowAgentCreation(false);
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
            placeholder="Search On Agent Name, Agent Code, Branch, Zip Code, Mobile No, Email Address"
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
          />
        </Row>
        <Row className={'mt-3'}>
        <Button variant="primary"  size="lg" block type="button" onClick={()=>{openAgentCreation()}} >
         Create Agent
        </Button>
        </Row>
      </Container>
      <Container fluid >
        <Row className={'mt-5 mb-5'}>
           <Col md={12}>
            <AgentTable tableData={agents} handleIDClick={(agent)=>{openAgentUpdation(agent)}} />
           </Col>
        </Row> 
      </Container>
      <Footer/>
      {showAgentUpdation &&(
          <AgentUpdation
          show={showAgentUpdation}
          agentDetails={agentData}
          handleAgentUpdationClose={() => {
            handleAgentUpdationClose();
          }}
          />
      )}
      {showAgentCreation &&(
          <AgentCreation
          show={showAgentCreation}
          agentDetails={agentData}
          handleAgentCreationClose={() => {
            handleAgentCreationClose();
          }}
          />
      )}
    </>
  );
};
export default ManageAgents;
