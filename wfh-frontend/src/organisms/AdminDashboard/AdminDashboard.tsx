//modules
import { useEffect, useState} from "react";
import{ jwtDecode } from "jwt-decode";

//library components
import { toast} from "react-toastify";
import {Table, Button, Pagination} from "rsuite"
const { Column, HeaderCell, Cell } = Table;

//components
import RejectionForm from "../RejectionForm/RejectionForm";

//services
import { approveRequest, showRequests } from "../../services/organizatoinAdminServices/organizationAdminServices";

//types
import { tokenData, RequestData, AdminDashboardProps } from "./types";

//styles
import styles from "./AdminDashboard.module.scss"

const AdminDashboard = ({ handleOrgName }: AdminDashboardProps) => {

    const [data , setData]= useState<RequestData[]>([]);
    const [requestType, setRequestType] = useState("Pending");
    const [id, setRequestId] = useState("");
    const [popup, setPopup] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalRequests, setTotalRequests] = useState(0)

    const getData = async () => {
      const token = localStorage.getItem('token');
      if(!token) {
        toast.error("Unauthorized Access!, not and Admin.")
      }
      else{
        const decoded : tokenData  = jwtDecode(token);
        const org_name = decoded.org_name;
        handleOrgName(org_name);
        try {
            const response = await showRequests(org_name, token, page, limit, requestType);
            const result = await response.json();
            
            if (!response.ok) {
              toast.error("Unable to Show Requests!");
            } else {
              setTotalRequests(result.data.totalRequests);
              setData(result.data.response);
            }
          } catch (error) {
            toast.error("Error fetching data!")
            console.error("Error fetching data:", error);
          }
        }
      }

      const handlePendingClick = () => {
        setRequestType("Pending");
      }

      const handleApprovedClick = () => {
        setRequestType("Approved");
      }

      const handleRejectedClick = () => {
        setRequestType("Rejected");
      }

      const handleApproveRequest = async (id: string) => {
        const token = localStorage.getItem('token');
        if(!token)
          {
            toast.error("Unauthorized Access!");
          }
          else{
        const response = await approveRequest(id, token);

        const result = await response.json();

        if(!response.ok)
        {
          toast.error(result.data.error);
        }
        else if(response.ok)
        {
          toast.success("Request Approved!", {toastId: id, autoClose:2000});
          getData();
        }
      }
    }

      const handleRejectClick = (id: string) => {
          setRequestId(id);
          makePopup();
      }

      const toastNotification = (message: string) => {
        toast.error(message, {autoClose:2000});
      }

      const makePopup = () => {
        setPopup(true);
      }

      const closePopup = () => {
        setPopup(false);
      }

      const handleChangeLimit = (limit:number) => {
        setLimit(limit);
      };

      const handleChangePage = (page: number) => {
        setPage(page);
      }
      

      //useEffect hooks

      useEffect(() => {
        getData();
      }, [page, limit, requestType])

  return (
    <>
        <div className={styles.DashboardBody}>
            <h2>WFH Requests</h2>
            <div className={styles.ButtonsContainer}>
              <Button className={requestType === "Pending" ? styles.ButtonActive : styles.ButtonInactive} size="lg" appearance="primary" color='orange' onClick={handlePendingClick}>Pending</Button>
              <Button className={requestType === "Approved" ? styles.ButtonActive : styles.ButtonInactive} size="lg" appearance="primary" color='green' onClick={handleApprovedClick}>Approved</Button>
              <Button className={requestType === "Rejected" ? styles.ButtonActive : styles.ButtonInactive} size="lg" appearance="primary" color='red' onClick={handleRejectedClick}>Rejected</Button>
            </div>
          <div className={styles.RequestsTable}>
            <Table className={styles.userTable} data={data} fillHeight>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Name</HeaderCell>
                    <Cell dataKey="firstName" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>E-mail</HeaderCell>
                    <Cell dataKey="email"/>
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Date</HeaderCell>
                    <Cell dataKey="requestDate" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>{requestType === "Rejected" ? "Reject Reason" : "Reason"}</HeaderCell>
                    <Cell dataKey="details" />
                </Column>
                <Column flexGrow={1} align="center">
                    <HeaderCell className='tablehead'>Approve/Reject</HeaderCell>
                    {requestType === "Pending" ?<Cell>
                      {(rowData) => (
                        <div className={styles.ResponseButtons}>
                        <Button
                          style={{ margin: "0" }} appearance='primary' color='green' onClick={() => handleApproveRequest(rowData._id)}
                        >
                          Approve
                        </Button>
                        <Button
                          style={{ margin: "0" }} appearance="primary" color='red' onClick={() => handleRejectClick(rowData._id)}
                        >
                          Reject
                        </Button>
                        </div> 
                      )}
                    </Cell> : 
                     <Cell>{requestType === "Approved" ? "Approved" : "Rejected"}</Cell>
                    }
                </Column>
                
            </Table>                  
              <Pagination
                className={styles.pagination}
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="sm"
                layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                total={totalRequests}
                limitOptions={[5, 10, 30, 50]}
                limit={limit}
                activePage={page}
                onChangePage={handleChangePage}
                onChangeLimit={handleChangeLimit}
              />
          </div>
        </div>
        {popup ? <RejectionForm id={id} toastNotification={toastNotification} getData={getData} closePopup={closePopup}/> : <></>}
    </>
  )
}

export default AdminDashboard;