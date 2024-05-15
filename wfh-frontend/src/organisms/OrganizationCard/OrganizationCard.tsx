//modules
import { useEffect, useState } from "react";

//library components
import { Button } from "rsuite";

//components
import ShowOrganizationUsers from "../ShowOrganizationUsers/ShowOrganizationUsers";

//services
import { deleteOrganization } from "../../services/systemUserServices/systemUserServices";

//styles
import styles from "./OrganizationCard.module.scss";

const OrgCard = ({ id, name, maxWfhDays, org_name}: OrgCardProps) => {

  const [showUsers, setShowUsers] = useState(false);

  const handleDelete = async(id: string)=> {
    const response = await deleteOrganization(id);
    const result = await response.json();

    if(!response.ok){
      console.log(result.error);
      return result.error;
    }

    if(response.ok)
      {
        console.log(response);
        return result;
      }
  }

  const handleShowUsers = () =>{
    setShowUsers(!showUsers);
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
            <Button appearance="primary" onClick={() => handleShowUsers()}>Show Users</Button>
            <Button appearance="primary" color="red" onClick={() => handleDelete(id)}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
    {showUsers ? <ShowOrganizationUsers org_name= {org_name} close = {handleShowUsers}/>: <></>}
    </>
  );
};

export default OrgCard;
