//modules
import { Link } from "react-router-dom";

//library components
import { Button } from "rsuite";

//styles
import styles from "./RegisterCard.module.scss";

const RegisterCard = () => {
  return (
    <div className={styles.CardContainer}>
      <h3>New User!</h3>
      <p>
        <b>New to our platform?</b> Join us now to start tracing your
        work-from-home experience, track tasks, and elevate your productivity
        from day one.
      </p>
      <Link to="/register">
        <Button size="lg" appearance="primary">
          Register
        </Button>
      </Link>
    </div>
  );
};

export default RegisterCard;
