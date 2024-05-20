//modules
import { useState } from "react";

//library components
import { Modal, Button, Input } from "rsuite";
import { toast } from "react-toastify";

//services
import { createOrganization } from "../../services/systemUserServices/systemUserServices";

//styles
import 'react-toastify/dist/ReactToastify.css';
import "./CreateOrgForm.scss";

const CreateOrganizationForm = ({closePopup, toggleChange}: createOrganizationFormProps) => {
  const [popup, setPopup] = useState(true);
  const [org_name, setOrg] = useState("");
  const [name, setName] = useState("");
  const [maxWfhDays, SetMaxWfhDays] = useState(-1);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if(!token){
      toast.error("Unauthorized Access!");
      return;
    }
    const isActive = true;
    const addOrg = { org_name, name, maxWfhDays, isActive};

    const response = await createOrganization(addOrg, token);

    const result = await response.json();

    if (!response.ok) {
      setError(result.data.error);
      toast.error(result.error, {
        position: "top-right"
        });
    }

    if (response.ok) {
      toast.success('Created Successfulyy!', {
        position: "top-right"
        });
      setTimeout(() => {
        setError("");
        setPopup(!popup);
        toggleChange();
      }, 300);
    }
  };

  const validateForm = async (e: FormSubmit) => {
    e.preventDefault();
            if (!org_name.trim() || !name.trim() || !maxWfhDays.toString().trim()){
                setError("Fill all felids");
                console.log(error);
                toast.error("Fill all Feilds!", {
                  position: "top-right"
                  });
                return;
          }
          else if(maxWfhDays < 0)
          {
            setError("Enter valid WFH Days!");
            toast.error("Enter valid WFH days!")
            return;
          }
         else handleSubmit(e);
    }

  const togglePopup = () => {
    setPopup(!popup);
    closePopup();
  };

  return (
    <>
    <Modal open={popup} onClose={togglePopup}  style={{ top: '9%'}}>
      <Modal.Header>
        <Modal.Title>Create Organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={validateForm}>
          <Input
            type="text"
            placeholder="Unique org_name"
            onChange={(e: InputFeild) => {
              setOrg(e);
            }}
          ></Input>
          <Input
            type="text"
            placeholder="Organization Name"
            onChange={(e: InputFeild) => {
              setName(e);
            }}
          ></Input>
          <Input
            type="number"
            placeholder="Max WFH Days"
            onChange={(e: InputFeild) => {
              SetMaxWfhDays(e);
            }}
          ></Input>

          <Button type="submit" appearance="primary" size="lg">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default CreateOrganizationForm;
