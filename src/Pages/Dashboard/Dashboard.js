import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import InfoTab from "../Components/InfoTab/InfoTab";
import Card from "../Components/Cards/Card";
import Table from "../Components/Table/Table";
import {
  getNewLeads,
  getDistributedLeads,
  getInProgressLeads,
  getReAssignedLeads,
  getRejectedLeads,
  getAgentData
} from "../Services/serviceList";
import ActivityBox from "../Components/ActivityBox/ActivityBox";
import AdditionalInfo from "../Components/AdditionalInfo/AdditionalInfo";
import AvailableAgentsModal from "../Components/AvailableAgents/AvailableAgentsModal";
import Footer from "../Components/Footer/Footer"
import {Form, Container, Row, Col} from "react-bootstrap";
import {toast } from 'react-toastify';

toast.configure()

const Dashboard = () => {
  const [tableData, setTableData] = useState(null);
  const [totalLeads, setTotalLeads] = useState(0);
  const [hotLeads, setHotLeads] = useState(0);
  const [warmLeads, setWarmLeads] = useState(0);
  const [coldLeads, setColdLeads] = useState(0);
  const [newleads, setNewLeads] = useState(0);
  const [distributedLeads, setDistributedLeads] = useState(0);
  const [inProgress, setInprogress] = useState(0);
  const [reAssigned, setReassigned] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [agentsData, setAgentsData] = useState({});
  const [tableTitle, setTableTitle] = useState("");
  const [potential, setPotential] = useState('Total')
  // Navigation
  const history = useHistory();
  // Modals
  const [showActivityBox, setShowActivityBox] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showAvailableAgents, setShowAvailableAgents] = useState(false);
  const [leadDetails, setLeadDetails] = useState({});
  

  const logout = () => {
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout ?");
    /* eslint-enable */
    if (toLogout) {
      localStorage.removeItem("token");
      history.push("/login");
    }
  };

  const isUploaded = (val) => {
    // after leads uploaded call new leads
  };
  const fetchData = async () => {
    const newLeads = await getNewLeads();
    setNewLeads(newLeads.totalLeads);

    const distributedLeads = await getDistributedLeads();
    setDistributedLeads(distributedLeads.totalLeads);

    const inProgressLeads = await getInProgressLeads();
    setInprogress(inProgressLeads.totalLeads);

    const reAssignedLeads = await getReAssignedLeads();
    setReassigned(reAssignedLeads.totalLeads);

    const rejectedLeads = await getRejectedLeads();
    setRejected(rejectedLeads.totalLeads);

    const agents = await getAgentData();
    setAgentsData(agents);
    // On Init
    setTotalLeads(newLeads.totalLeads |0);
    setColdLeads(newLeads.coldLeads | 0);
    setWarmLeads(newleads.warmLeads | 0);
    setHotLeads(newleads.hotLeads | 0);
    setTableData(newLeads.leads);
    setTableTitle("New Leads");
  };
  /* eslint-disable */
  useEffect(() => {
    fetchData();
  },[]);
   /* eslint-disable */
  const handleCard = async (val,num) => {
    if (val === "New" && num!==0) {
      const newLeads = await getNewLeads();
      setNewLeads(newLeads.totalLeads | 0);
      setTotalLeads(newLeads.totalLeads | 0);
      setColdLeads(newLeads.coldLeads | 0);
      setWarmLeads(newleads.warmLeads | 0);
      setHotLeads(newleads.hotLeads | 0);
      setTableData(newLeads.leads);
      setTableTitle("New Leads");
    } else if (val === "Distributed" && num!==0) {
      setTableTitle("Leads Distributed");
      const distributedLeads = await getDistributedLeads();
      setDistributedLeads(distributedLeads.totalLeads | 0);
      setTotalLeads(distributedLeads.totalLeads | 0);
      setColdLeads(distributedLeads.coldLeads | 0);
      setWarmLeads(distributedLeads.warmLeads | 0);
      setHotLeads(distributedLeads.hotLeads | 0);
      setTableData(distributedLeads.leads);
    } else if (val === "inProgress" && num!==0) {
      setTableTitle("Leads in Progress");
      const inProgress = await getInProgressLeads();
      console.log(inProgress);
      setInprogress(inProgress.totalLeads | 0);
      setTotalLeads(inProgress.totalLeads | 0);
      setColdLeads(inProgress.coldLeads | 0);
      setWarmLeads(inProgress.warmLeads | 0);
      setHotLeads(inProgress.hotLeads | 0);
      setTableData(inProgress.leads);
    } else if (val === "reAssigned" && num!==0) {
      setTableTitle("Leads Re-assigned");
      const reAssigned = await getReAssignedLeads();
      setReassigned(reAssigned.totalLeads | 0);
      setTotalLeads(reAssigned.totalLeads | 0);
      setColdLeads(reAssigned.coldLeads | 0);
      setWarmLeads(reAssigned.warmLeads | 0);
      setHotLeads(reAssigned.hotLeads | 0);
      setTableData(reAssigned.leads);
    } else if (val === "rejected" && num!==0) {
      setTableTitle("Leads Rejected");
      const rejected = await getRejectedLeads();
      setRejected(rejected.totalLeads | 0);
      setTotalLeads(rejected.totalLeads | 0);
      setColdLeads(rejected.coldLeads | 0);
      setWarmLeads(rejected.warmLeads | 0);
      setHotLeads(rejected.hotLeads | 0);
      setTableData(rejected.leads);
    }else if (val === "availableAgents" && num!==0) {
      console.log('available agents clicked');
      const agents = await getAgentData();
      setAgentsData(agents);
      openAvailableAgents()
    }

    // handle classification
    if (val === "Total" && num!==0) {
      setPotential('Total');
      if (tableTitle === "New Leads") {
        const newLeads = await getNewLeads();
        setTableData(newLeads.leads);
      }else if(tableTitle === "Leads Distributed"){
        const distributedLeads = await getDistributedLeads();
        setTableData(distributedLeads.leads);
      }else if(tableTitle === "Leads in Progress"){
        const inProgress = await getInProgressLeads();
        setTableData(inProgress.leads);
      }else if (val === "Leads Re-assigned") {
        const reAssigned = await getReAssignedLeads();
        setTableData(reAssigned.leads);
      } else if (val === "Leads Rejected") {
        const rejected = await getRejectedLeads();
        setTableData(rejected.leads);
      }
    }else if(val === "Hot" && num!==0){
      setPotential('Hot')
      if (tableTitle === "New Leads") {
        const newLeads = await getNewLeads();
        const hotLeads =  newLeads.leads.filter(e=>{
          return e.processData.Potential === 'Hot'
        })
        setTableData(hotLeads);
      }else if(tableTitle === "Leads Distributed"){
        const distributedLeads = await getDistributedLeads();
        const hotLeads =  distributedLeads.leads.filter(e=>{
          return e.processData.Potential === 'Hot'
        })
        setTableData(hotLeads);
      }else if(tableTitle === "Leads in Progress"){
        const inProgress = await getInProgressLeads();
        const hotLeads =  inProgress.leads.filter(e=>{
          return e.processData.Potential === 'Hot'
        })
        setTableData(hotLeads);
      }else if (tableTitle === "Leads Re-assigned") {
        const reAssigned = await getReAssignedLeads();
        const hotLeads =  reAssigned.leads.filter(e=>{
          return e.processData.Potential === 'Hot'
        })
        setTableData(hotLeads);
      } else if (tableTitle === "Leads Rejected") {
        const rejected = await getRejectedLeads();
        const hotLeads =  rejected.leads.filter(e=>{
          return e.processData.Potential === 'Hot'
        });
        setTableData(hotLeads);
      }
    }else if(val === "Warm" && num!==0){
      setPotential('Warm')
      if (tableTitle === "New Leads") {
        const newLeads = await getNewLeads();
        const warmLeads =  newLeads.leads.filter(e=>{
          return e.processData.Potential === 'Warm'
        })
        setTableData(warmLeads);
      }else if(tableTitle === "Leads Distributed"){
        const distributedLeads = await getDistributedLeads();
        const warmLeads =  distributedLeads.leads.filter(e=>{
          return e.processData.Potential === 'Warm'
        })
        setTableData(warmLeads);
      }else if(tableTitle === "Leads in Progress"){
        const inProgress = await getInProgressLeads();
        const warmLeads =  inProgress.leads.filter(e=>{
          return e.processData.Potential === 'Warm'
        })
        setTableData(warmLeads);
      }else if (tableTitle === "Leads Re-assigned") {
        const reAssigned = await getReAssignedLeads();
        const warmLeads =  reAssigned.leads.filter(e=>{
          return e.processData.Potential === 'Warm'
        })
        setTableData(warmLeads);
      } else if (tableTitle === "Leads Rejected") {
        const rejected = await getRejectedLeads();
        const warmLeads =  rejected.leads.filter(e=>{
          return e.processData.Potential === 'Warm'
        });
        setTableData(warmLeads);
      }
    }else if(val === "Cold" && num!==0){
      setPotential('Cold')
      if (tableTitle === "New Leads") {
        const newLeads = await getNewLeads();
        const coldLeads =  newLeads.leads.filter(e=>{
          return e.processData.Potential === 'Cold'
        })
        setTableData(coldLeads);
      }else if(tableTitle === "Leads Distributed"){
        const distributedLeads = await getDistributedLeads();
        const coldLeads =  distributedLeads.leads.filter(e=>{
          return e.processData.Potential === 'Cold'
        })
        setTableData(coldLeads);
      }else if(tableTitle === "Leads in Progress"){
        const inProgress = await getInProgressLeads();
        const coldLeads =  inProgress.leads.filter(e=>{
          return e.processData.Potential === 'Cold'
        })
        setTableData(coldLeads);
      }else if (tableTitle === "Leads Re-assigned") {
        const reAssigned = await getReAssignedLeads();
        const coldLeads =  reAssigned.leads.filter(e=>{
          return e.processData.Potential === 'Cold'
        })
        setTableData(coldLeads);
      } else if (tableTitle === "Leads Rejected") {
        const rejected = await getRejectedLeads();
        const coldLeads =  rejected.leads.filter(e=>{
          return e.processData.Potential === 'Cold'
        });
        setTableData(coldLeads);
      }
    }

   
  };
  const handleChannelFilter = async (val)=>{
    console.log(val, tableTitle);
 // handle Channel Filters
 
  if (tableTitle === "New Leads" ) {
    const newLeads = await getNewLeads();
    const filteredLeads = newLeads.leads.filter(e=>{
      return e.processData.Channel === val
    })
    setTableData(val!=='All'?filteredLeads:newLeads.leads);
  } else if (tableTitle === "Leads Distributed" ) {
    const distributedLeads = await getDistributedLeads();
    const filteredLeads = distributedLeads.leads.filter(e=>{
      return e.processData.Channel === val
    })
    setTableData(val!=='All'?filteredLeads:distributedLeads.leads);
  } else if (tableTitle === "Leads in Progress" ) {
    const inProgress = await getInProgressLeads();
    const filteredLeads = inProgress.leads.filter(e=>{
      return e.processData.Channel === val
    })
    setTableData(val!=='All'?filteredLeads:inProgress.leads);
  } else if (tableTitle === "Leads Re-assigned" ) {
    const reAssigned = await getReAssignedLeads();
    const filteredLeads = reAssigned.leads.filter(e=>{
      return e.processData.Channel === val
    })
    setTableData(val!=='All'?filteredLeads:reAssigned.leads);
  } else if (tableTitle === "Leads Rejected" ) {
    const rejected = await getRejectedLeads();
    const filteredLeads = rejected.leads.filter(e=>{
      return e.processData.Channel === val
    })
    setTableData(val!=='All'?filteredLeads:rejected.leads);
  }
  }
  useEffect(() => {
    //  console.log(tableData)
  }, [tableData]);

  const openActivityBox = (lead) => {
    setShowActivityBox(true);
    setLeadDetails(lead);
  };
  const openAdditionalInfo = (lead) => {
    setShowAdditionalInfo(true);
    setLeadDetails(lead);
  };
  const openAvailableAgents = (agents) => {
    setShowAvailableAgents(true);
  };
  const handleActivityBoxClose = () => {
    setShowActivityBox(false);
  };
  const handleAdditionalInfoClose = () => {
    setShowAdditionalInfo(false);
  };
  const handleAvailableAgentsClose = () => {
    setShowAvailableAgents(false);
  };

  return (
    <>
      <Container fluid className="position-relative" >
        <Row>
          <NavBar
            handleLogout={() => logout()}
          />
        </Row>
        <Row className="mt-5" >
          <InfoTab
            newleads={newleads ? newleads : 0}
            distributedLeads={distributedLeads ? distributedLeads : 0}
            inProgress={inProgress ? inProgress : 0}
            reAssigned={reAssigned ? reAssigned : 0}
            rejected={rejected ? rejected : 0}
            isUploaded={isUploaded}
            handleCard={handleCard}
            tableTitle={tableTitle}
            agents={agentsData}
          />
        </Row>
        <Row  className="px-4 mt-3">
          <Col md={2}>
            <Card
              name="Total Leads"
              number={totalLeads}
              addBG="bg-primary"
              addTextColor="text-white"
              onCardClick={() => {
                handleCard("Total",totalLeads);
              }}
              active={potential === "Total"?true: null}
              title={totalLeads===0?'No Data to Display':''}
            />
          </Col>
          <Col md={2}>
            <Card
              name="Hot Leads"
              number={hotLeads}
              onCardClick={() => {
                handleCard("Hot",hotLeads);
              }}
              active={potential === "Hot"?true: null}
              title={hotLeads===0?'No Data to Display':''}
            />
          </Col>
          <Col md={2}>
            <Card
              name="Warm Leads"
              number={warmLeads}
              onCardClick={() => {
                handleCard("Warm",warmLeads);
              }}
              active={potential === "Warm"?true: null}
              title={warmLeads===0?'No Data to Display':''}
            />
          </Col>
          <Col md={2}>
            <Card
              name="Cold Leads"
              number={coldLeads}
              onCardClick={() => {
                handleCard("Cold",coldLeads);
              }}
              active={potential === "Cold"?true: null}
              title={coldLeads===0?'No Data to Display':''}
            />
          </Col>
          <Col md={4}>  
            <Form.Group  controlId="channel" className="mt-5" >
                <Form.Label><i className={'fa fa-filter'}></i> Sort by Channel</Form.Label>
                <Form.Control
                  as="select"
                  name="channel"
                  onChange={(e)=>{handleChannelFilter(e.target.value)}}
                >
                  <option value=""> </option>
                  <option value="All">All</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Website">Website</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Campaign">Campaign</option>
                  <option value="Customer Referral">Customer Referral</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="px-4 mt-3 mb-5">
          <Col md={12}>
            <div className="card rounded border-primary shadow">
              {/* <div className="card-header text-center bg-primary pb-1 pt-2"><h3 className={'text-white'}>{tableTitle}</h3></div> */}
              <div className="card-body p-0">
                {tableData && (
                  // <DashboardTable tableData={tableData} />
                  <Table
                    tableData={tableData}
                    openActivityBox={openActivityBox}
                    openAdditionalInfo={openAdditionalInfo}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
        
      </Container>
      <Footer/>
      {showActivityBox && (
        <ActivityBox
          show={showActivityBox}
          leadDetails={leadDetails}
          handleActivityBoxClose={() => {
            handleActivityBoxClose();
          }}
        />
      )}

      {showAdditionalInfo && (
        <AdditionalInfo
          show={showAdditionalInfo}
          leadDetails={leadDetails}
          handleAdditionalInfoClose={() => {
            handleAdditionalInfoClose();
          }}
        />
      )}

      {showAvailableAgents &&(
        <AvailableAgentsModal show={showAvailableAgents} agents={agentsData} handleAvailableAgentsClose={()=>{
          handleAvailableAgentsClose();
        }}></AvailableAgentsModal>
      )}

    </>
  );
};

export default withRouter(Dashboard);
