import "./OrgCard.scss";
import { Button } from "rsuite";

const OrgCard = ({ id, name, maxWfhDays}: OrgCardProps) => {
  return (
    <div key={id} className="col-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            WFH Days: {maxWfhDays}
          </h6>
          <Button appearance="primary" color="red"/>
        </div>
      </div>
    </div>
  );
};

export default OrgCard;
