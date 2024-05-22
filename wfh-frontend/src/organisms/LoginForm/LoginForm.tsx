//modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//library components
import { Button, Input } from "rsuite";
import {toast, ToastContainer} from 'react-toastify';

//services
import { loginOrganizationUser } from "../../services/organizationUserServices/organizationUserServices.ts";
import { loginSystemUser } from "../../services/systemUserServices/systemUserServices.ts";
import { organizationUserOtp, systemUserOtp } from "../../services/otpServices/otpServices.ts";

//typings
import "./types.d.ts";

//styles
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [user, setUser] = useState("System");
  const [org_name, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  // const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  const handleSystem = async (e:FormSubmit) => {
    e.preventDefault();
    const loginData = {email, otp};
    const response = await loginSystemUser(loginData);

    const result = await response.json();

    if(!response.ok)
    {
      toast.error(result.data.error);
    }
    else if(response.ok)
    {
      localStorage.setItem('token', result.data.response);
      toast.success("Verified Successfully", {autoClose:2000});
      // setLoad(true);
      // const timeoutId = setTimeout(() => {
      //   setLoad(false);
        navigate("/sys/home");
      // }, 1000);

      // timeoutId;
    }
  };

  const handleOrganization = async (e:FormSubmit) => {
    e.preventDefault();
    const loginData = {email,org_name,  otp};
    const response = await loginOrganizationUser(loginData);

    const result = await response.json();

    if(!response.ok)
      {
        toast.error(result.data.error);
      }
      else if(response.ok)
      {
        localStorage.setItem('token', result.data.response.token);
        const userType = result.data.response.userType;

        if(userType === "admin"){
          toast.success("Verified Admin Successfully", {autoClose:2000});
          // setLoad(true);
          // const timeoutId = setTimeout(() => {
          //   setLoad(false);
            navigate("/org/admin");
          // }, 2000);
          // timeoutId;
        }

        else if(userType === "user"){
          toast.success("Verified User Successfully", {autoClose:2000});
          // setLoad(true);
          // const timeoutId = setTimeout(() => {
          //   setLoad(false);
            navigate("/org/home");
          // }, 2000);
    
          // timeoutId;
        }
      }
  };

  const validateSystem = (e: FormSubmit) => {
    if(!email || !otp)
      {
        toast.error("Fill all Feilds!", {autoClose:3000})
      }
    else{
      handleSystem(e);
    }
  }

  const validateOrganization = (e: FormSubmit) => {
    if(!email || !otp || !org_name)
      {
        toast.error("Fill all Feilds!", {autoClose:3000})
      }
      else{
        handleOrganization(e)
      }
  }

  const handleOrgOtp = async (e: ButtonClick) => {
    e.preventDefault();
    if(!email)
      {
        toast.error("Please enter email!", {autoClose:3000});
        return;
      }
    else if(!org_name)
      {
        toast.error("Please enter org_name", {autoClose:3000});
        return;
      }
    const orgUserLoginData = {email, org_name}
    const response = await organizationUserOtp(orgUserLoginData);

    const result = await response.json();
    if(response.ok)
    {
      toast.success("Otp Sent!");
    }
    if(!response.ok)
    {
      toast.error(result.data.error);
    }
  }

  const handleSysOtp = async(e: ButtonClick) => {
      e.preventDefault();
      if(!email)
        {
          toast.error("Please enter email!", {autoClose:3000});
          return;
        }
      const response = await systemUserOtp({email});

      const result = await response.json();
      if(response.ok)
      {
        toast.success("Otp Sent!");
      }
      if(!response.ok)
      {
        toast.error(result.data.error);
      }
  }

  return (
    <>
        <div className={styles.LoginContainer}>
          <div className={styles.UpperContainer}>
            <h3>Login</h3>
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
          </div>

          <form onSubmit={user == "System" ? validateSystem : validateOrganization}>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={(e: InputFeild) => {
                setEmail(e);
              }}
            ></Input>

            <Input
              disabled={user == "System" ? true : false}
              type="text"
              placeholder="Organization"
              onChange={(e: InputFeild) => {
                setOrg(e);
              }}
            ></Input>

            <div className={styles.OtpContainer}>
              <Input
                type="text"
                onChange={(e: InputFeild) => {
                  setOtp(e);
                }}
                placeholder="OTP"
              ></Input>
              <Button type="button" className={styles.OtpButton} appearance="default" onClick={user === "System" ? handleSysOtp : handleOrgOtp}>Get OTP</Button>
            </div>

            <Button type="submit" appearance="primary" size="lg">
              Submit
            </Button>
          </form>
        </div>
        <ToastContainer/>
        {/* {load ? <Loader backdrop content="Redirecting to Home Page...." vertical />: <></>} */}
      </>
  );
};

export default LoginForm;
