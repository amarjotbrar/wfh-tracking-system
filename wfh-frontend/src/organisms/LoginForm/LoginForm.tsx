//modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//library components
import { Button, Input } from "rsuite";

//typings
import "./types.d.ts";

//styles
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [user, setUser] = useState("System");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleSystem = () => {
    console.log(org, email, otp);
    navigate("/sys/home");
  };

  const handleOrganization = () => {
    console.log(org, email, otp);
    navigate("/org/home");
  };

  return (
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

          <form onSubmit={user == "System" ? handleSystem : handleOrganization}>
            <Input
              disabled={user == "System" ? true : false}
              type="text"
              placeholder="Organization"
              onChange={(e: InputFeild) => {
                setOrg(e.target.value);
              }}
            ></Input>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={(e: InputFeild) => {
                setEmail(e.target.value);
              }}
            ></Input>

            <div className={styles.OtpContainer}>
              <Input
                type="text"
                onChange={(e: InputFeild) => {
                  setOtp(e.target.value);
                }}
                placeholder="OTP"
              ></Input>
              <Button className={styles.OtpButton} appearance="default">Get OTP</Button>
            </div>

            <Button type="submit" appearance="primary" size="lg">
              Submit
            </Button>
          </form>
        </div>
  );
};

export default LoginForm;
