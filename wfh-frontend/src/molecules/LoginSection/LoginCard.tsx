//modules
import { Link } from "react-router-dom";

//library components
import { Button } from "rsuite";

//styles
import styles from "./LoginCard.module.scss";

const LoginCard = () => {
  return (
    <div className={styles.CardContainer}>
      <h3>Already a User?</h3>
      <p>
        <b>Welcome back!</b> Sign in here to resume your work-from-home journey,
        tracking tasks, measuring productivity, and staying on top of your
        remote work game.
      </p>
      <Link to="/login">
        <Button size="lg" appearance="primary">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default LoginCard;
