import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form} from "react-bootstrap";
import { useHistory } from "react-router";
import NavBar from "../Components/NavBar/NavBar";
import AuditSummary from "../Components/AuditSummary/AuditSummary";
import AuditTable from "../Components/Table/AuditTable";
import CommentBox from "../Components/CommentBox/CommentBox";
import {searchLeads,getTotalAuditLeads, getInProgressAuditLeads, getConvertedAuditLeads, getRejectedAuditLeads} from "../Services/serviceList";
import Footer from "../Components/Footer/Footer";


export default function AuditLog(){
    const [totalLeads, setTotalLeads] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [converted,setConverted] = useState(0);
    const [rejected,setRejected] = useState(0);
    const [tableTitle, setTableTitle] = useState('');
    const [tableData, setTableData]  = useState([]);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comments, setComments] = useState({})
    const history = useHistory();
    const logout = () => {
        /* eslint-disable */
        const toLogout = confirm("Are you sure to logout ?");
        /* eslint-enable */
        if (toLogout) {
          localStorage.removeItem("token");
          history.push("/login");
        }
      };
   async function fetchData(){
    const totalLeads = await getTotalAuditLeads();
    setTotalLeads(totalLeads.totalLeads?totalLeads.totalLeads:0);

    const inProgress = await getInProgressAuditLeads();
    setInProgress(inProgress.totalLeads?inProgress.totalLeads:0);

    const converted = await getConvertedAuditLeads();
    setConverted(converted.totalLeads?converted.totalLeads:0);

    const rejected = await getRejectedAuditLeads();
    setRejected(rejected.totalLeads?rejected.totalLeads:0);

    
    setTableTitle("Total Leads");
    setTableData(totalLeads.leads)
   }
    useEffect(()=>{
        fetchData()
    },[]);

    const openCommentBox = (log)=>{
        setShowCommentBox(true);
        setComments(log)
    }
    const handleCommentBoxClose=()=>{
        setShowCommentBox(false)
    }
    const handleCard = async(val,num)=>{
        if (val === "total" && num!==0) {
            const totalLeads = await getTotalAuditLeads();
            setTableTitle("Total Leads");
            setTableData(totalLeads.leads)
          } else if (val === "inProgress" && num!==0) {
            const inProgress = await getInProgressAuditLeads();
            setTableTitle("Leads in Progress");
            setTableData(inProgress.leads)
          } else if (val === "converted" && num!==0) {
            const converted = await getConvertedAuditLeads();
            setTableTitle("Leads Converted");
            setTableData(converted.leads)
          } else if (val === "rejected" && num!==0) {
            const rejected = await getRejectedAuditLeads();
            setTableTitle("Leads Rejected");
            setTableData(rejected.leads)
          } 
    }

    const handleSearch = async(txt)=>{
      if(txt!==''){
          const leads = await searchLeads(txt);
          setTableData(leads);
      }
    }
   
    return (
        <>
        <Container fluid>
            <Row className={"mt-5"}>
          <NavBar handleLogout={() => logout()} />
        </Row>
        </Container>
        <Container fluid className={'px-5 mt-5'}>
          <Row className={"mt-4 bg-primary border shadow"}>
          <AuditSummary  
          totalLeads={totalLeads}
          tableTitle={tableTitle}
          inProgress={inProgress}
          rejected={rejected}
          converted={converted}
          handleCard={handleCard}
           />
        </Row>
          <Row className="mt-5">
          <Col md={6} className={'px-0'} >
          <Form.Control
            type="text"
            placeholder="Search for Name, email, Mobile no., Location, Zip code, Channel, Language, Classification"
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
          />
          </Col>
        </Row>
          <Row className={'mt-5 mb-5'}>
            <Col md={12} className={"px-0"} >
                <AuditTable tableData={tableData} openCommentBox={(log)=>{openCommentBox(log)}}/>
            </Col>
        </Row>
        
        </Container>
        <Footer/>
        {showCommentBox &&(
          <CommentBox
          show={showCommentBox}
          comments={comments}
          handleCommentBoxClose={() => {
            handleCommentBoxClose();
          }}
          />
      )}
        </>
    )
    
}