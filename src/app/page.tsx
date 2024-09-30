import Divisor from "@components/divisor";
import styles from "./home.module.css";

const HomePage = () => {
  return (
    <main className="container px-5 mx-auto">
      <h1 className={styles.heading}>Quantic Coders</h1>
      <Divisor />
    </main>
  );
};

export default HomePage;
