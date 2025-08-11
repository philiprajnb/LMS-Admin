import React from 'react';
import Cards from '../Cards/Card';
import {
    Row,
    Col,
    Image
  } from "react-bootstrap";
import img from "../../../assets/images/auditImg.png"
export default function AuditSummary(props){
    return(<>
        
            <Col md={4} className={'border-right'} >
                <Image src={img} fluid />
            </Col>
           <Col md={8}>
               <h3 className={'text-center mt-2 text-white'} >Audit Summary</h3>
               <Row className={'mt-3'} >
                   <Col md={3}>
                        <Cards name="Total Leads" minHeight={'8.4rem'} number={props.totalLeads} title={props.totalLeads===0?'No Data to Display':''}  active={props.tableTitle === "Total Leads"?true: null}  onCardClick={()=>{props.handleCard('total',props.totalleads)}} />
                   </Col>
                   <Col md={3}>
                        <Cards name="Leads in Progress" minHeight={'8.4rem'} number={props.inProgress} title={props.inProgress===0?'No Data to Display':''}  active={props.tableTitle === "Leads in Progress"?true: null}  onCardClick={()=>{props.handleCard('inProgress',props.inProgress)}} />
                   </Col>
                   <Col md={3}>
                        <Cards name="Leads Converted" minHeight={'8.4rem'} number={props.converted} title={props.converted===0?'No Data to Display':''}  active={props.tableTitle === "Leads Converted"?true: null}  onCardClick={()=>{props.handleCard('converted',props.converted)}} />
                   </Col>
                   <Col md={3}>
                        <Cards name="Leads Rejected" minHeight={'8.4rem'} number={props.rejected} title={props.rejected===0?'No Data to Display':''}  active={props.tableTitle === "Leads Rejected"?true: null}  onCardClick={()=>{props.handleCard('rejected',props.rejected)}} />
                   </Col>
               </Row>
           </Col>
            
        
    </>)
}