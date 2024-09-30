import Divisor from "@components/divisor";
import styles from "./home.module.css";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <main className="container px-5 mx-auto">
      <h1 className={styles.heading}>Quantic Coders</h1>

      <Divisor />

      <div className="flex gap-2 flex-wrap">
        <Button variant="primary" size="lg">Primary</Button>
        <Button variant="success" size="lg">Success</Button>
        <Button variant="warning" size="lg">Warning</Button>
        <Button variant="danger" size="lg">Danger</Button>
      </div>
    </main>
  );
};

export default HomePage;
