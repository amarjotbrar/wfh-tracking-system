import "./CreateOrgForm.scss";
import { useState } from "react";
import { Modal, Button, Input } from "rsuite";
import { SystemUserServices } from "../../services/index";

const CreateOrgForm = () => {
  const [popup, setPopup] = useState(true);
  const [org_name, setOrg] = useState("");
  const [name, setName] = useState("");
  const [maxWfhDays, SetMaxWfhDays] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();

    const addOrg = { org_name, name, maxWfhDays};

    const response = await SystemUserServices.CreateOrganization(addOrg);

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("Created Successfully!");
      setTimeout(() => {
        setError("");
        setPopup(!popup);
      }, 3000);
    }
  };

  const togglePopup = () => {
    setPopup(!popup);
  };
  return (
    <Modal open={popup} onClose={togglePopup}>
      <Modal.Header>
        <Modal.Title>Create Organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <form onSubmit={handleSubmit}>
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
  );
};

export default CreateOrgForm;
