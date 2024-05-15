//modules
import { useEffect, useState } from "react";

//library components
import { Modal } from "rsuite";
import { ToastContainer, toast } from "react-toastify";

//services

//types
import { showUserProps, User } from "./types";
import { showOrganizationUsers } from "../../services/systemUserServices/systemUserServices";

//styles
import 'react-toastify/dist/ReactToastify.css';
// import styles from "./ShowOrganizationUsers.module.scsss";

const ShowOrganizationUsers = ({org_name, close} : showUserProps) => {
  const [popup, setPopup] = useState(true);
  const [data , setData]= useState();


  useEffect(()=>{
    async function getData() {
        try {
          const response = await showOrganizationUsers({org_name});
    
          if (!response.ok) {
            toast.error("Unable to Show Organization Users!");
          } else {
            const result = await response.json();
            setData(result);
          }
        } catch (error) {
          toast.error("Error fetching data!")
          console.error("Error fetching data:", error);
        }
      }
      getData();
  }, [popup, org_name]);

  const togglePopup = () => {
    () => {close};
    setPopup(!popup);
  };

  return (
    <>
    <Modal open={popup} onClose={togglePopup}  style={{ top: '10%'}}>
      <Modal.Header>
        <Modal.Title>Create Organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {data.map((user, index) => (
            <li key={index}>{user.firstname}</li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
    <ToastContainer/>
    </>
  );
};

export default ShowOrganizationUsers;
