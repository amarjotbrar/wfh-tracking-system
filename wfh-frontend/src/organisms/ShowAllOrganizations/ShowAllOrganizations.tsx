//modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//library components
import SearchIcon from '@rsuite/icons/Search';
import { InputGroup, Input } from "rsuite";
import { ToastContainer, toast } from "react-toastify";

//components
import OrgCard from "../OrganizationCard/OrganizationCard";
import ShowOrganizationUsers from "../ShowOrganizationUsers/ShowOrganizationUsers";

//styles
import styles from "./ShowAllOrganizations.module.scss";
import { showAllOrganizations } from "../../services/systemUserServices/systemUserServices";

const ShowAllOrganizations = () => {
  const [data, setData] = useState<OrganizationData[]>([]);
  const [error, setError] = useState("");
  const [searchOrganization, setSearchOrganization] = useState("");
  const [debounce , setDebounce] = useState("");

  const [showUsers, setShowUsers] = useState(false);
  const [displayOrganization, setDisplayOrganization] = useState("");
  const [showToast, setShowtoast] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  if(!token){
    navigate('/');
  }


  useEffect(() => {
    async function getData() {
      try {
        const response = await showAllOrganizations(token);
  
        if (!response.ok) {
          const result = await response.json();
          setError(result.data.error);
          toast.error("Unable to Show Organizations!");
          console.log(error);
        } else {
          const result = await response.json();
          setData(result.data.response);
        }
      } catch (error) {
        toast.error("Error fetching data!")
        console.error("Error fetching data:", error);
      }
    }
    getData();
  },[debounce, error, token]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(searchOrganization);
    }, 1000)

    return () => {
      clearTimeout(timeout);
    }
  }, [searchOrganization])

  const handleSearch = (e: InputFeild) => {
    setSearchOrganization(e);
  };

  const filteredData = data.filter((org) =>
    org.name.toLowerCase().includes(debounce.toLowerCase())
  );

  const changeShowUsers = (org_name: string) => {
    setShowUsers(!showUsers)
    setDisplayOrganization(org_name);
  }

  const handlepopup = () => {
    setShowUsers(!showUsers);
  }

  const toastnotification = (message: string, type: boolean) => {
    setShowtoast(!showToast);
    if(!type)toast.error(message);
    else toast.success(message);
  }

  return (
    <>
      <div className={styles.SystemUserHomeBody}>
        <h3>All Organizations:</h3>
          <InputGroup  inside>
            <Input className={styles.OrganizationSearch} type="text" value={searchOrganization} onChange={(e: InputFeild) => handleSearch(e)} placeholder="Search Organization" />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        <div className={styles.OrganizationsContainer}>
          {filteredData.map((ele) => (
            <OrgCard key={ele._id} id={ele._id} name={ele.name} maxWfhDays={ele.maxWfhDays} org_name={ele.org_name}  changeShowUsers = {changeShowUsers} toastnotification={toastnotification}/>
          ))}
        </div>
      </div>
      {showUsers ? <ShowOrganizationUsers org_name= {displayOrganization} close = {handlepopup}/>: <></>}
      <ToastContainer/>
    </>
  );
};

export default ShowAllOrganizations;
