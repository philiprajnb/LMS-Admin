import React,{useState} from "react";
import styles from "./InfoTab.module.css"
import { useHistory } from "react-router-dom";
import Card from '../Cards/Card';
import FileUpload from "../FileUpload/FileUpload"
import {uploadLeads, distributeLeads,} from "../../Services/serviceList";
import {workflowMaster} from "../../Services/workflowMaster"
import {toast } from 'react-toastify';

toast.configure()
const InfoTab = (props) => {
    const history = useHistory();
    const [xlsData, setXlsData] = useState({});
    /*eslint-disable*/
    const [workflow, setWorkflow] = useState(workflowMaster())
    /*eslint-disable*/
    const parsedData=(val)=>{
             setXlsData(val)
         }
    const amplifyData =(item)=>{
        var random = Math.floor(Math.random() * 89999) + 10000;
        var leadID = 'AL' + random;
        
        item['Lead ID'] = leadID;
        item['Lead Creation Date']= new Date();
        workflow.scoreMaster.forEach(e=>{
            if(e.ChannelName===item.Channel){
                item['Lead Score']=e.Score
            }
        });
        item['WF Description']= workflow.wfStatus.get(1);
        item['WF Status']= 1;
        item['Audit Log'] = [{
            AssignmentTeam: 'Data Entry Team',
            Event: 'Lead Imported',
            Step: 'Lead Imported to Sytem',
            Date: new Date(),
            AssignedToAgent: 'N/A',
            Score: item['Lead Score'],
            'WF Status': item['WF Status'],
        }]
        if (item['Lead Score'] < 24) {
            item['Potential'] = 'Cold';
        } else if (item['Lead Score'] > 24 && item['Lead Score'] < 49) {
            item['Potential'] = 'Warm';
        } else if (item['Lead Score'] >= 50 && item['Lead Score'] < 100) {
            item['Potential'] = 'Hot';
        }
        return {
            processID : item['Lead ID'],
            processData: item
        }
    }
    const handleSubmit= async function(){
    
        if(Object.keys(xlsData).length !==0){
            console.log(xlsData)
          const data = await xlsData.map(amplifyData)
          data.forEach(async (obj)=>{
            const stringifyMobile =  obj.processData['Mobile No'].toString();
            const stringifyZipCode =  obj.processData['Zip Code'].toString();
              obj.processData['Mobile No'] = stringifyMobile;
              obj.processData['Zip Code'] = stringifyZipCode;
              try{
                const result = await uploadLeads(obj);
                  toast.success(result.message,{
                      className:`${styles.toasted}`
                  })
                  
                  setXlsData({})
                  setTimeout(()=>{
                      history.go(0)
                  }, 2000);
              }catch(err){
                    toast.error(err.response.data.message,{className:`${styles.toasted}`});
                    console.log(err.response.data.message);
                    }
              
           
          })
         
        }else{
           toast.error('Please Upload a file',{className:`${styles.toasted}`}) 
        }
     
        
        
    }
  
    const handleDistribution = async ()=>{
        const distribute = await distributeLeads();
        console.log(distribute.data);
        toast.success(distribute.data,{
            className:`${styles.toasted}`
        })
        setTimeout(()=>{
            history.go(0)
        }, 5000)

    }
    const handleCancel = ()=>{
        history.go(0);
    }

    
   
    
  return (
    <div className={`container-fluid px-5 mt-5 `}>
        <div className="row">
            <div className={`${styles.infobg} ${styles.wrapper} col-lg-12 text-white shadow`}>
                <div className="row p-3 ">
                  <div className="col-md-4 border-right">
                      <h2>Import Leads</h2>
                      <p>Please upload a document to import leads</p>
                      
                      <div className="row px-0">
                          <div className="col-md-5">
                             <FileUpload  parsedData={parsedData}  />
                            
                          </div>
                          <div className="col-md-3">
                             <button className={'btn btn-outline-purple rounded'}  onClick={()=>{handleSubmit()}} >Submit</button> 
                          </div>
                          <div className="col-md-3">
                             <button className={'btn btn-outline-light rounded'}  onClick={()=>{handleCancel()}} >Cancel</button> 
                          </div>
                      </div>

                     <hr className="border"/>
                     <button className="btn btn-outline-purple btn-block rounded" onClick={()=>{handleDistribution()}} >
                        <i className="fa fa-project-diagram"></i> Distribute Leads
                      </button>
                  </div>
                  <div className="col-md-8">
                      <h3 className={'text-center'}>Lead Assignment Details</h3>
                      <div className="row mt-3 px-3">
                        <div className="col-md-2 px-1">
                            <Card name="New Leads" minHeight={'8.4rem'} number={props.newleads} title={props.newleads===0?'No Data to Display':''}  active={props.tableTitle === "New Leads"?true: null}  onCardClick={()=>{props.handleCard('New',props.newleads)}} />
                        </div>
                        <div className="col-md-2 px-1">
                            <Card name="Leads Distributed" number={props.distributedLeads} title={props.distributedLeads===0?'No Data to Display':''} active={props.tableTitle === "Leads Distributed"?true: null}  onCardClick={()=>{props.handleCard('Distributed',props.distributedLeads)}}  />
                        </div>
                        <div className="col-md-2 px-1">
                            <Card name="Leads in Progress" number={props.inProgress} title={props.inProgress===0?'No Data to Display':''} active={props.tableTitle === "Leads in Progress"?true: null} onCardClick={()=>{props.handleCard('inProgress',props.inProgress)}} />
                        </div>
                        <div className="col-md-2 px-1 ">
                            <Card name="Leads Re-assigned" number={props.reAssigned} title={props.reAssigned===0?'No Data to Display':''} active={props.tableTitle === "Leads Re-assigned"?true: null}  onCardClick={()=>{props.handleCard('reAssigned',props.reAssigned)}} />
                        </div>
                        <div className="col-md-2 px-1 pr-2 ">
                            <Card name="Leads Rejected" number={props.rejected} title={props.rejected===0?'No Data to Display':''} active={props.tableTitle === "Leads Rejected"?true: null}  onCardClick={()=>{props.handleCard('rejected',props.rejected)}} />
                        </div>
                        <div className="col-md-2 pl-2 border-left">
                            <Card name="Available Agents" number={props.agents.totalAgents?props.agents.totalAgents:0} active={true} onCardClick={()=>{props.handleCard('availableAgents',props.agents.totalAgent,props.agents.agents)}} />
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
       
        
    </div>
    
  );
};

export default InfoTab;