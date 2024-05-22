//library components
import { Button } from "rsuite";

//types
import { LoginCardProps } from "./types";

//styles
import styles from "./LoginCard.module.scss";

const LoginCard = ({handleLogin}: LoginCardProps) => {
  return (
    <div className={styles.CardContainer}>
      <h3>Already a User?</h3>
      <p>
        <b>Welcome back!</b> Sign in here to resume your work-from-home journey,
        tracking tasks, measuring productivity, and staying on top of your
        remote work game.
      </p>
        <Button size="lg" appearance="primary" onClick={handleLogin}>
          Login
        </Button>
    </div>
  );
};

export default LoginCard;
