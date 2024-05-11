//library components
import { Button } from "rsuite";

//styles
import styles from "./OrganizationCard.module.scss";

const OrgCard = ({ id, name, maxWfhDays}: OrgCardProps) => {

  const handleDelete = async(id: string)=> {
    const response = await fetch(`http://localhost:5000/sys/deleteorg/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
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

  return (
    <div key={id} className={styles.CardBody}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            WFH Days: {maxWfhDays}
          </h6>
          <Button appearance="primary" color="red" onClick={() => handleDelete(id)}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default OrgCard;
