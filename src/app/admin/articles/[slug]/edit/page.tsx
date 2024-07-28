import { FC } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArticleForm from "../../(components)/article-form";
import { getArticleBySlug, getCategories } from "@/actions";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const ArticleEditPage: FC<Props> = async ({ params: { slug } }) => {

  const { article } = await getArticleBySlug(slug);
  const { categories } = await getCategories();

  if (!article) {
    redirect('/admin/articles');
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">Edit Article</CardTitle>
      </CardHeader>
      <CardContent>
        <ArticleForm article={article} categories={categories} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default ArticleEditPage;
