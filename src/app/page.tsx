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
