import React from "react";
import {
  Modal,
  Button,
} from "react-bootstrap";
import AvailableAgentsTable from "./AvailableAgentsTable";
function AvailableAgentsModal(props) {
  // console.log(props.agents);
  // const [agentsData, setagentsData] = useState({
  //  agents:{}
  // });
  // useEffect(() => {
  //   setagentsData(props.agentsData);
  // }, [props.agentsData]);
  return (
    <>
      
      <Modal show={props.show} onHide={props.handleAvailableAgentsClose} scrollable='true' size="xl">
        
        <Modal.Body className={'text-nowrap'}>
         
            
            <AvailableAgentsTable agents={props.agents.agents}></AvailableAgentsTable>
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleAvailableAgentsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AvailableAgentsModal;
