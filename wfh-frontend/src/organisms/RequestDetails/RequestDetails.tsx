import { useState } from "react";
import { RequestDetailsProps } from "./types"
import { Modal, Button } from "rsuite"

const RequestDetails = ({requestDetails, hideDetails, requestDate}: RequestDetailsProps) => {
const [popup, setPopup] = useState(true);

const togglePopup = () => {
    hideDetails();
    setPopup(!popup);
  }

  return (
    <Modal open={popup} onClose={togglePopup}  style={{ top: '15%'}}>
        <Modal.Header>
          <h4>Request details for <b>{requestDate}</b>:</h4>
        </Modal.Header>
        <Modal.Body>
            <b>Reason:</b> {requestDetails?.details}<br></br>
            <b>Status:</b> {requestDetails?.isApproved}
        </Modal.Body>
        <Modal.Footer>
        <Button appearance="primary" color='red' onClick={() => togglePopup()} >Close</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default RequestDetails