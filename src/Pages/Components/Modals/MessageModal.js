import React,{useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap'
function MessageModal(props) {
    
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
        <Modal show={props.show} onHide={props.handleClose} >
          {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
              <div className="text-center">
              <h4>{props.message}</h4>
              <h5 className={'text-danger'}>{props.error}</h5>
              </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={props.handleClose}>
              Ok
            </Button> */}
            <Button variant="primary" onClick={props.handleClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default MessageModal;