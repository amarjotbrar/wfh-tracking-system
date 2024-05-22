//styles
import styles from "./RegisterCard.module.scss";

const RegisterCard = () => {
  return (
    <div className={styles.CardContainer}>
      <h3>New User!</h3>
      <p>
        <b>New to our platform?</b> Join us now to start tracking your
        work-from-home experience, track tasks, and elevate your productivity
        from day one.
      </p>
      <h4>Please ask Admin to add you in the system!</h4>
    </div>
  );
};

export default RegisterCard;
