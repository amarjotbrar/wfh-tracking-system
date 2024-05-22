import  { useState, useEffect } from 'react'
import {Modal, Input, Button} from 'rsuite';
import { rejectRequest } from "../../services/organizatoinAdminServices/organizationAdminServices";
import { RejectionFormProps } from './types';
import styles from './RejectionForm.module.scss'

const RejectionForm = ({id, getData, toastNotification, closePopup}: RejectionFormProps) => {

  const [popup, setPopup] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [reason, setReason] = useState("");

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
    setReason(e);
  }

  const togglePopup = () => {
    closePopup();
    setPopup(!popup);
  }

  useEffect(() => {
    if(reason.trim().length >= 30)
    {
      setButtonDisable(false);
    }
    else
    {
      setButtonDisable(true);
    }
  },[reason])

  return (
    <Modal open={popup} onClose={togglePopup}  style={{ top: '15%'}}>
        <Modal.Header>
          <h4>Please enter a reason for rejection:</h4>
        </Modal.Header>
        <Modal.Body>
            <Input as='textarea' value={reason} rows={5} onChange={(e) => handleReason(e)}></Input>
            <p>Minimum 30 characters</p>
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
        <Button disabled={buttonDisable}
            style={{ margin: "0" }} appearance="primary" color='red' onClick={() => handleRejectRequest(id)}
                        >
                          Reject
                        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default RejectionForm;