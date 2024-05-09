import { SystemUserServices } from "../../services/index";
import "./OrgCard.scss";
import { Button } from "rsuite";

const OrgCard = ({ id, name, maxWfhDays}: OrgCardProps) => {

  const handleDelete = async(id: string)=> {
    const response = await SystemUserServices.DeleteOrganization(id);
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
    <div key={id} className="col-3">
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
