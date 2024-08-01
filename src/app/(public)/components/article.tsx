import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components/text";
import { Button } from "@/components/ui/button";
import { ArticlePublic } from "@/actions/articles/fetch_articles";

type Props = {
  article: ArticlePublic;
};

const Article: React.FC<Readonly<Props>> = ({ article }) => {

  return (
    <article>
      <figure className="mb-4">
        <Link
          href={`/${article.slug}`}
          title={`read more about ${article.title}`}
        >
          <Image
            src={`/images/${article.image}`}
            className="w-[640px] h-[360px] sm:w-[320] sm:h-[180px] rounded-lg object-cover"
            alt={article.title}
            width={320}
            height={180}
          />
        </Link>
      </figure>

      <Link href={`/${article.slug}`}>
        <Title
          heading="h2"
          className="font-semibold text-xl lg:text-2xl hover:underline"
        >{article.title}</Title>
      </Link>
      <p className="paragraph mb-5">{article.description}</p>
      <p className="text-right">
        <Link
          href={`/${article.slug}`}
          title={`read more about ${article.title}`}
        >
          <Button variant="outline">
            read more
          </Button>
        </Link>
      </p>
    </article>
  );

};

export default Article;
