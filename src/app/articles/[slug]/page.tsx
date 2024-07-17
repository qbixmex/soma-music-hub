import { FC } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import articles from "@/data/articles.json";
import { Content } from "@/components/content";
import { Title } from "@/components/text";
import { Button } from "@/components/ui/button";

type Props = {
  params: {
    slug: string;
  };
};

const ArticlePage: FC<Props> = ({ params: { slug } }) => {

  const article = articles.find((article) => article.slug === slug);
  
  if (!article) {
    redirect("/");
  }

  const { id, title, content, image } = article;

  return (
    <article>

      <Title
        heading="h1"
        className="font-bold text-3xl lg:text-5xl mb-5"
      >{title}</Title>

      <main>
        <Image
          src={`/images/${image}`}
          className="rounded-lg object-cover md:object-contain mb-5"
          alt={title}
          width={1280}
          height={720}
          priority
        />
        <Content id={id} content={content} />
      </main>

      <p className="text-right mb-5">
        <Button>
          <Link href="/articles">back to articles</Link>
        </Button>
      </p>

    </article>
  );

};

export default ArticlePage;
