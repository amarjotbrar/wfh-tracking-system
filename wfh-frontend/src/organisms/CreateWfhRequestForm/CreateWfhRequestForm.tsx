import  { useState } from 'react'
import {Modal, Input, Button} from 'rsuite';
import { CreateWfhRequestFormFormProps } from './types';
import { createWfhRequest } from '../../services/organizationUserServices/organizationUserServices';
import { toast } from 'react-toastify';


const CreateWfhRequestForm = ({requestDate, closePopup}: CreateWfhRequestFormFormProps) => {

  const [popup, setPopup] = useState(true);

  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if(!token)
    {
        toast.error("Unauthorized Access!");
    }
    else{
      const requestData = {
        requestDate: requestDate,
        details: reason
      }
    const response = await createWfhRequest(requestData, token)

    const result = await response.json();

    if(!response.ok)
    {
      toast.error(result.data.error);
    }
    else if(response.ok)
    {
      toast.success("Request Submitted!");
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

  return (
    <Modal open={popup} onClose={togglePopup}  style={{ top: '15%'}}>
        <Modal.Header>
          <h4>Enter a reason for WFH request on <b>{requestDate}</b>:</h4>
        </Modal.Header>
        <Modal.Body>
            <Input as='textarea' value={reason} rows={5} onChange={(e) => handleReason(e)}></Input>
        </Modal.Body>
        <Modal.Footer>
        <Button
            style={{ margin: "0" }} appearance="primary" color='green' onClick={() => handleSubmit()}
                        >
                          Submit
                        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CreateWfhRequestForm;