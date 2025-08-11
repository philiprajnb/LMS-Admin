import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card
} from "react-bootstrap";
import { useHistory } from "react-router";
import NavBar from "../Components/NavBar/NavBar";
import BarChart from "../Components/Charts/BarChart";
import Footer from "../Components/Footer/Footer";
import {getClassifiedLeads, getByRegionLeads, getKeyConversionMetrics} from "../Services/serviceList";

export default function Reports(){
    const [classifiedReport, setClassifiedReport] = useState({})
    /*eslint-disable*/
    const [byRegionReport,setByRegionReport] = useState({});
    /*eslint-disable*/
    const [keyConversions, setKeyConversions] = useState({});
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
    
    useEffect(()=>{
        async function fetchData(){
            const classified = await getClassifiedLeads();
        setClassifiedReport(classified);
        const byRegion = await getByRegionLeads();
        setByRegionReport(byRegion)
        const keyConverts = await getKeyConversionMetrics();
        setKeyConversions(keyConverts)
        console.log(keyConverts);
        }
        fetchData()
    },[])
    return (
        <>
        <Container fluid>
        <Row className={"mt-5"}>
          <NavBar handleLogout={() => logout()} />
        </Row>
        <Row className="mt-5">
            <Col md={12}>
                <Card className={'border-primary'} >
                    <Card.Header className={"bg-primary text-white"}>
                        <Card.Title className={"mb-0"} >Lead Classification Report</Card.Title>
                    </Card.Header>
                    <Card.Body>
                         <BarChart data={classifiedReport}></BarChart>
                    </Card.Body>
                </Card>
            </Col>
            {/* <Col md={6}>
                <Card className={'border-primary'}>
                    <Card.Header className={"bg-primary text-white"}>
                        <Card.Title className={"mb-0"} >Lead By Region Report</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <BarChart data={byRegionReport}></BarChart>
                    </Card.Body>
                </Card>
            </Col> */}
        </Row>
        <Row className="mt-4 mb-5" >
            <Col md={12}  >
            <Card className={'border-primary'}>
                    <Card.Header className={"bg-primary text-white"}>
                        <Card.Title className={"mb-0"} >Key Conversion Matrics</Card.Title>
                    </Card.Header>
                    <Card.Body  >
                        <Row>
                            <Col md={3} className={'text-center'}  >
                                <h3 className={'text-primary'}>{keyConversions.leadAdded}</h3>
                                <p>New Leads Added</p>
                            </Col>
                            <Col md={3} className={'text-center'}  >
                                <h3 className={'text-primary'}>{keyConversions.leadAssigned}</h3>
                                <p>New Leads Assigned</p>
                            </Col>
                            <Col md={3} className={'text-center'}  >
                                <h3 className={'text-primary'}>{keyConversions.leadInProgress}</h3>
                                <p>Total Leads in Progress</p>
                            </Col>
                            <Col md={3} className={'text-center'}  >
                                <h3 className={'text-primary'}>{keyConversions.leadConverted}</h3>
                                <p>Leads Converted</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </Container>
        <Footer/>
        </>
    )
    
}