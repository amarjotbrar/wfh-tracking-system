//modules
import { useState} from "react";

//services
import organizationUserServices from "../../services/organizationUserServices";

//library components
import { toast } from "react-toastify";
import { Button, Input } from "rsuite";

//typings
import { CreateOrganizationUserProps } from "./types";

//styles
import styles from "./CreateOrganizationForm.module.scss";

const CreateOrganizationForm = ({org_name, showUsers}: CreateOrganizationUserProps) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [doj, setDOJ] = useState("");
  const [error, setError] = useState("");
  const isVerified = false;

  const handleOrganization = async (e: FormSubmit) => {
    e.preventDefault();
    const isAdmin = false;
    const addOrgUser = {
      firstName,
      lastName,
      email,
      org_name,
      dob,
      doj,
      isAdmin,
      isVerified,
    };

    const response = await organizationUserServices.createOrganizationUser(addOrgUser);

    const result = await response.json();

    if (!response.ok) {
      setError(result.data.error);
      console.log(error);
      toast.error(result.data.error, {autoClose:2000})
    }

    if (response.ok) {
      console.log(result);
      setError("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setDOB("");
      setDOJ("");
      toast.success("Created Successfully!", {autoClose: 2000})
      setError("");
      showUsers();
    }
  };

  const validateOrg = async (e: FormSubmit) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !dob || !doj || !org_name) {
      toast.error("Fill all the Feilds!", {position:'top-right'});
      setTimeout(() => {
        setError("");
      }, 3000);
    } else handleOrganization(e);
  };

  // const getCurrentDate = () => {
  //   const today = new Date();
  //   return today.toISOString().split('T')[0];
  // };

  // const getMaxDate = () =>{
  //   const today = new Date();
  //   today.setFullYear(today.getFullYear() - 15);
  //   return today.toISOString().split('T')[0];
  // }

  return (
    <>
        <form onSubmit={validateOrg} className={styles.RegisterContainer}>
            <div className={styles.NameInputs}>
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
            </div>
            
            <div className={styles.DateInputs}>
                <div className={styles.DateContainer}>
                    <label className="form-label">Date of Birth</label>
                    <Input
                    // max={getMaxDate()}
                    type="date"
                    onChange={(e: InputFeild) => {
                        setDOB(e);
                    }}
                    ></Input>
                </div>

                <div className={styles.DateContainer}>
                    <label className="form-label">Joining Date</label>
                    <Input
                    type="date"
                    onChange={(e: InputFeild) => {
                        setDOJ(e);
                    }}
                    ></Input>
                </div>
            </div>
            
            <div className={styles.EmailInput}>
                <Input
                    type="email"
                    placeholder="E-mail"
                    onChange={(e: InputFeild) => {
                    setEmail(e);
                    }}
                ></Input>
            </div>

          <Button className={styles.CreateButton} type="submit" appearance="primary" size="lg">
            Create User
          </Button>
        </form>
    </>
  );
};

export default CreateOrganizationForm;
