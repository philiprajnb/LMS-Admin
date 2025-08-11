import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Table
} from "react-bootstrap";
import moment from "moment"
function CommentBox(props) {
  
  const [comments, setComments] = useState({
    processID :'',
    processData:{
        "Full Name": '',
        "Email Address": '',
        "Mobile No": '',
        "Lead Score": 0,
        "Potential": '',
        "Audit Log": []
    }
  });
  useEffect(() => {
    setComments(props.comments);
    console.log(props.comments);
  }, [props.comments]);
  return (
    <>
      
      <Modal show={props.show} onHide={props.handleCommentBoxClose} size="xl">
        <Modal.Header
         className={"text-white bg-primary"}
        >
          
          <Modal.Title ><i className={"fa fa-info-circle"}></i> Audit Log -{comments.processData['Full Name']} - {comments.processID}  </Modal.Title>
          <div className={'float-end cursor-pointer'} onClick={props.handleCommentBoxClose}>
            <i className={'fa fa-times'} ></i>
          </div>
        </Modal.Header>
        <Modal.Body>

            <Row>
              <Col md={12}>
                <Table responsive="md"  >
                <thead className={'table-primary'} >
                  <tr>
                    <th>Event</th>
                    <th>Step</th>
                    <th>Date</th>
                    <th>Assigned to Agent</th>
                    <th>Score</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {comments && comments.processData['Audit Log'].map(e=>{
                    return (
                      <tr key={e.Date}>
                        <td>{e.Event}</td>
                        <td>{e.Step}</td>
                        <td>{moment(e.Date).format('LLL')}</td>
                        <td>{e.AssignedToAgent}</td>
                        <td>{e.Score}</td>
                        <td>{e.Comments}</td>
                      </tr>
                    )
                  })}
                </tbody>
                </Table>
              </Col>
            </Row>
         </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleCommentBoxClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentBox;
