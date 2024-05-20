//modules

//library components
import { Button } from "rsuite";
import {toast} from "react-toastify";

//components

//services
import { deleteOrganization } from "../../services/systemUserServices/systemUserServices";

//styles
import styles from "./OrganizationCard.module.scss";

const OrgCard = ({ id, name, maxWfhDays, org_name, showPopup, toggleDelete}: OrgCardProps) => {

  const handleDelete = async(id: string)=> {
    const token = localStorage.getItem('token');
    if(!token){
      toast.error("Unauthorized Access!");
      return;
    }
    const response = await deleteOrganization(id, token);
    const result = await response.json();


    if(!response.ok){
      toast.error(result.data.error);
    }

    if(response.ok)
      {
        toast.success(result.data.response);
        toggleDelete();
      }
  }

  const handleShowUsers = (org_name: string) =>{
    showPopup(org_name);
  }

  return (
    <>
    <div key={id} className={styles.CardBody}>
      <div className={"card"}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            WFH Days: {maxWfhDays}
          </h6>
          <div className={styles.Buttons}>
            <Button appearance="primary" onClick={() => handleShowUsers(org_name)}>Show Users</Button>
            <Button appearance="primary" color="red" onClick={() => handleDelete(id)}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default OrgCard;
