//modules
import { useEffect, useState } from "react";

//library components
import { Button, Modal, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import { ToastContainer, toast } from "react-toastify";

//services
import { makeAdmin, showOrganizationUsers } from "../../services/systemUserServices/systemUserServices";

//types
import { OrganizationUserData, showUserProps } from "./types";

//styles
import 'react-toastify/dist/ReactToastify.css';
import styles from "./ShowOrganizationUsers.module.scss";

const ShowOrganizationUsers = ({org_name, close} : showUserProps) => {
  const [popup, setPopup] = useState(true);
  const [data , setData]= useState<OrganizationUserData[]>([]);

    async function getData() {
        try {
          console.log(org_name);
          const response = await showOrganizationUsers(org_name);
          const result = await response.json();
          
          if (!response.ok) {
            toast.error("Unable to Show Organization Users!");
          } else {
            setData(result.data.response);
          }
        } catch (error) {
          toast.error("Error fetching data!")
          console.error("Error fetching data:", error);
        }
      }

      useEffect(()=>{
        getData();
      },[])

    const handleAdminClick = async (id: string) => {
      console.log(id);
      const response = await makeAdmin(id);
      const result = await response.json();

      if(response.ok)
        {
          toast.success("Created Admin");
        }
      else 
      {
        toast.error(result.data.error);
      }
      
      console.log(result.data);
    }

  const togglePopup = () => {
    setPopup(!popup);
    close;
  };

  return (
    <>
    <Modal open={popup} onClose={togglePopup}  className={styles.modal}>
      <Modal.Header>
        <Modal.Title>Users of this Organization: </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Table className={styles.userTable} data={data}>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Email ID</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>First Name</HeaderCell>
                    <Cell dataKey="firstName" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Last Name</HeaderCell>
                    <Cell dataKey="lastName" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Last Name</HeaderCell>
                    <Cell>
                      {(rowData) => (
                        <Button
                          style={{ margin: "0" }}
                          onClick={() => handleAdminClick(rowData._id)} // Pass _id to handleAdminClick
                        >
                          Make Admin
                        </Button>
                      )}
                    </Cell>
                </Column>
            </Table>
      </Modal.Body>
    </Modal>
    <ToastContainer/>
    </>
  );
};

export default ShowOrganizationUsers;
