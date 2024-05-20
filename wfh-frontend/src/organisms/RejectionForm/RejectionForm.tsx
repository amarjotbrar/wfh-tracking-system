import  { useState } from 'react'
import {Modal, Input, Button} from 'rsuite';
import { rejectRequest } from "../../services/organizatoinAdminServices/organizationAdminServices";
import { RejectionFormProps } from './types';


const RejectionForm = ({id, getData, toastNotification, closePopup}: RejectionFormProps) => {

  const [popup, setPopup] = useState(true);

  const [reason, setReason] = useState({reason: ""});

  const handleRejectRequest = async (id: string) => {
    const token = localStorage.getItem("token");
    if(!token)
      {
        toastNotification("Unauthorized Access!");
      }
    else{
    const response = await rejectRequest(id, reason, token);

    const result = await response.json();

    if(!response.ok)
    {
      toastNotification(result.data.error);
    }
    else if(response.ok)
    {
      toastNotification("Request Rejected");
      getData();
    }
    togglePopup();
  }
}

  const handleReason = (e: string) => {
    setReason({reason: e});
  }

  const togglePopup = () => {
    closePopup();
    setPopup(!popup);
  }

  return (
    <Modal open={popup} onClose={togglePopup}  style={{ top: '15%'}}>
        <Modal.Header>
          <h4>Please enter a reason for rejection:</h4>
        </Modal.Header>
        <Modal.Body>
            <Input as='textarea' value={reason.reason} rows={5} onChange={(e) => handleReason(e)}></Input>
        </Modal.Body>
        <Modal.Footer>
        <Button
            style={{ margin: "0" }} appearance="primary" color='red' onClick={() => handleRejectRequest(id)}
                        >
                          Reject
                        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default RejectionForm;