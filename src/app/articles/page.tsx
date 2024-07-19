import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import articlesFetch from "@/data/articles.json";
import { Article } from "@/interfaces";
import { Title } from "@/components/text";

const ArticlesPage = () => {

  const articles = (articlesFetch as Article[])
    .filter((article) => article.publishedAt);

  return (
    <>
      <Title heading="h1" className="text-5xl font-bold mb-10">
        Quantic Coders
      </Title>

      {articles.length === 0 && (
        <p className="paragraph">No articles found.</p>
      )}

      {
        articles.length > 0 && articles.map((article) => (
          <article key={article.id} className="grid grid-cols-1 gap-5 md:grid-cols-4">
            <div className="col-span-4 lg:col-span-2">
              <Link
                href={`/articles/${article.slug}`}
                title={`read more about "${article.title}"`}
              >
                <Image
                  src={`/images/${article.image}`}
                  className="w-[640px] h-[360px] rounded-lg object-cover"
                  alt={article.title}
                  width={640}
                  height={360}
                />
              </Link>
            </div>
            <div className="col-span-4 lg:col-span-2 flex flex-col gap-5 justify-center">
              <Link href={`/articles/${article.slug}`}>
                <Title
                  heading="h2"
                  className="font-semibold text-3xl lg:text-5xl hover:underline"
                >{article.title}</Title>
              </Link>

              <p className="paragraph mb-5">{article.description}</p>

              <p className="text-right">
                <Link
                  href={`/articles/${article.slug}`}
                  title={`read more about "${article.title}"`}
                >
                  <Button variant="outline">
                    read more
                  </Button>
                </Link>
              </p>
            </div>
          </article>
        ))
      }
    </>
  );
};

export default ArticlesPage;