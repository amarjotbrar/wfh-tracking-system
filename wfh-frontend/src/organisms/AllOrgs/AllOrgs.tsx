import "./AllOrgs.scss";
import { useState, useEffect } from "react";
import OrgCard from "../OrgCard/OrgCard";

const AllOrgs = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000/sys/showorgs");

      if (!response.ok) {
        const result = await response.json();
        setError(result.error);
      } else {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  });

  return (
    <>
      <div className="sysHomeBody">
        {error && <div className="alert alert-danger">{error}</div>}
        <h3>All Organizations:</h3>
        <div className="orgsContainer">
            {data.filter((ele) => ele.isVisible).map((ele) => (
            <OrgCard key={ele._id} id={ele._id} name={ele.name} maxWfhDays={ele.maxWfhDays} />
            ))}
        </div>
      </div>
    </>
  );
};

export default AllOrgs;
