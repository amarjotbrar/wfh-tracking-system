//modules
import { useNavigate } from "react-router-dom";
import { useState} from "react";

//services
import systemUserServices from "../../services/systemUserServices";
import organizationUserServices from "../../services/organizationUserServices";

//library components
import { ToastContainer, toast } from "react-toastify";
import { Button, Input } from "rsuite";

//styles
import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const [user, setUser] = useState("System");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [dob, setDOB] = useState("");
  const [doj, setDOJ] = useState("");
  const [error, setError] = useState("");
  const isVerified = false;

  const navigate = useNavigate();

  const handleSystem = async (e: FormSubmit) => {
    e.preventDefault();
    const addSysUser = { firstName, lastName, email, dob, isVerified };

    const response = await systemUserServices.createSystemUser(addSysUser);

    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
      console.log(error);

      if(result.code == 501)
      {
        for (const element of result.error){
          toast.error(element);
        }
      }
      else toast.error(result.error);
    }

    if (response.ok) {
      console.log(result);
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setDOB("");

      toast.success("Created Successfully!", {position:'top-right'});
      setTimeout(() => {
        setError("");
        navigate("/login");
      }, 3000);
    }
  };

  const handleOrganization = async (e: FormSubmit) => {
    e.preventDefault();
    const isAdmin = false;
    const addOrgUser = {
      firstName,
      lastName,
      email,
      org,
      dob,
      doj,
      isAdmin,
      isVerified,
    };

    const response = await organizationUserServices.createOrganizationUser(addOrgUser);

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
      toast.error(result.error, {position:"top-right"})
    }

    if (response.ok) {
      console.log(result);
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setOrg("");
      setDOB("");
      setDOJ("");
      toast.success("Created Successfully!", {position:"top-right"})
      setTimeout(() => {
        setError("");
        navigate("/login");
      }, 3000);
    }
  };

  const validateSys = async (e: FormSubmit) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !dob) {
      setError("Fill all the Feilds!");
      toast.error("Fill all the Feilds!",{position:'top-right'});
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else {
      handleSystem(e);
    }
  };

  const validateOrg = async (e: FormSubmit) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !dob || !doj || !org) {
      setError("Fill all the Feilds!");
      toast.error("Fill all the Feilds!", {position:'top-right'});
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else handleOrganization(e);
  };

  return (
    <>
      <div className={styles.RegisterContainer}>
        <h3>Register</h3>
        <div className={styles.Underline}></div>
        <div className={styles.UserSelection}>
          <Button
            size="lg"
            onClick={() => {
              setUser("System");
            }}
            appearance={user == "System" ? "primary" : "default"}
          >
            System
          </Button>
          <Button
            size="lg"
            onClick={() => {
              setUser("Organization");
            }}
            appearance={user == "Organization" ? "primary" : "default"}
          >
            Organization
          </Button>
        </div>

        <form onSubmit={user == "System" ? validateSys : validateOrg}>
          <Input
            type="text"
            placeholder="First Name"
            onChange={(e: InputFeild) => {
              setFirstname(e);
            }}
          ></Input>
          <Input
            type="text"
            placeholder="Last Name"
            onChange={(e: InputFeild) => {
              setLastname(e);
            }}
          ></Input>
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(e: InputFeild) => {
              setEmail(e);
            }}
          ></Input>
          <Input
            type="text"
            disabled={user == "System" ? true : false}
            placeholder="Organization"
            onChange={(e: InputFeild) => {
              setOrg(e);
            }}
          ></Input>

          <div className={styles.DateContainer}>
            <label className="form-label">Date of Birth</label>
            <Input
              type="date"
              onChange={(e: InputFeild) => {
                setDOB(e);
              }}
            ></Input>
          </div>

          <div className={styles.DateContainer}>
            <label className="form-label">Date of Joining</label>
            <Input
              disabled={user == "System" ? true : false}
              type="date"
              onChange={(e: InputFeild) => {
                setDOJ(e);
              }}
            ></Input>
          </div>

          <Button type="submit" appearance="primary" size="lg">
            Submit
          </Button>
        </form>
      </div>
    <ToastContainer/>
    </>
  );
};

export default RegisterForm;
