import React from "react";
import { Card,Col, Row, Container } from "react-bootstrap";

export default function Footer(){
    return(
        <>
            <Container fluid >
                <Row>
                    <Col className={'px-0'}>
                        <Card className={'text-center'}>
                            <Card.Footer className="text-muted">&copy; Copyright 2025, Visitly</Card.Footer>
                        </Card> 
                    </Col>
                </Row>
            </Container>
        </>
    )
}