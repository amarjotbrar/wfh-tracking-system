import { Button, Input } from "rsuite";
import "./RegisterForm.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

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
    const addOrgUser = { firstName, lastName, email, dob, isVerified };

    const response = await fetch("http://localhost:5000/sys/register", {
      method: "POST",
      body: JSON.stringify(addOrgUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      console.log(result);
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setDOB("");

      setError("Created Successfully!");
      setTimeout(() => {
        setError("");
        navigate("/login");
      }, 3000);
    }
  };

  const handleOrganization = async (e: FormSubmit) => {
    e.preventDefault();
    const addOrgUser = {
      firstName,
      lastName,
      email,
      org,
      dob,
      doj,
      isVerified,
    };

    const response = await fetch("http://localhost:5000/register/org", {
      method: "POST",
      body: JSON.stringify(addOrgUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
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
      navigate("/login");
    }
  };

  const validateSys = async (e: FormSubmit) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !dob) {
      setError("Fill all the Feilds!");
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
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else handleOrganization(e);
  };

  return (
    <div className={"RegisterContainer " + user}>
      <div className="errorContainer">
        {error && (
          <div
            className={
              error == "Created Successfully!"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {error}
          </div>
        )}
      </div>
      <h3>Register</h3>
      <div className="underline"></div>
      <div className="userSelection">
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

        <div className="dateContainer">
          <label className="form-label">Date of Birth</label>
          <Input
            type="date"
            onChange={(e: InputFeild) => {
              setDOB(e);
            }}
          ></Input>
        </div>

        <div className="dateContainer">
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
  );
};

export default RegisterForm;
