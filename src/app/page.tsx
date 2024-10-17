<<<<<<< HEAD
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
=======
import { getArticlesPublic } from "@/actions";
import PublicLayout from "./(public)/public.layout";
import { Title } from "@/components/text";
import { Article } from "./(public)/components";

const HomePage = async () => {

  const { articles } = await getArticlesPublic({ isPublished: true });

  return (
    <PublicLayout>
      <div className="container px-5 sm:mx-auto sm:px-6 md:px-8 lg:px-10 xl:px-20">
        <Title heading="h1" className="text-5xl font-bold mb-10">
          Quantic Coders Blog
        </Title>

        {articles.length === 0 && (
          <p className="paragraph">No articles found.</p>
        )}

        <section className="grid grid-cols-1 sm:gap-x-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { articles && articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </section>
      </div>
    </PublicLayout>
  );

};

export default HomePage;
>>>>>>> dev
