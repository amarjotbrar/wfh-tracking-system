import "./AllOrgs.scss";
import { useState, useEffect } from "react";
import OrgCard from "../OrgCard/OrgCard";
import SearchIcon from '@rsuite/icons/Search';
import { InputGroup, Input } from "rsuite";

const AllOrgs = () => {
  const [data, setData] = useState<OrganizationData[]>([]);
  const [error, setError] = useState("");
  const [searchOrganization, setSearchOrganization] = useState("");

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

  const handleSearch = (e: InputFeild) => {
    setSearchOrganization(e);
  };

  const filteredData = data.filter((org) =>
    org.name.toLowerCase().includes(searchOrganization.toLowerCase())
  );

  return (
    <>
      <div className="sysHomeBody">
        {error && <div className="alert alert-danger">{error}</div>}
        <h3>All Organizations:</h3>
          <InputGroup  inside>
            <Input className="OrganizationSearch" type="text" value={searchOrganization} onChange={(e: InputFeild) => handleSearch(e)} placeholder="Search Organization" />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        <div className="orgsContainer">
          {filteredData.map((ele) => (
            <OrgCard key={ele._id} id={ele._id} name={ele.name} maxWfhDays={ele.maxWfhDays} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllOrgs;
