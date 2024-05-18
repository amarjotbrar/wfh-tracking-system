//modules
import { useEffect } from "react";

//library components
import { Button } from "rsuite";

//components

//services
import { deleteOrganization } from "../../services/systemUserServices/systemUserServices";

//styles
import styles from "./OrganizationCard.module.scss";

const OrgCard = ({ id, name, maxWfhDays, org_name, changeShowUsers, toastnotification}: OrgCardProps) => {

  const handleDelete = async(id: string)=> {
    const response = await deleteOrganization(id);
    const result = await response.json();


    if(!response.ok){
      toastnotification(result.data.error, false);
    }

    if(response.ok)
      {
        toastnotification(result.data.response, true);
      }
  }

  const handleShowUsers = (org_name: string) =>{
    changeShowUsers(org_name);
  }

  useEffect(()=>{
    
  });

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
