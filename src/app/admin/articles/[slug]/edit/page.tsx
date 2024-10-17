import { FC } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArticleForm from "../../(components)/article-form";
import { getArticleBySlug, getCategories, getAuthors } from "@/actions";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

type Props = {
  params: {
    slug: string;
  };
};

const ArticleEditPage: FC<Props> = async ({ params: { slug } }) => {

  const session = await auth();

  const { article } = await getArticleBySlug({
    slug,
    role: session?.user.role!,
    authorId: session?.user.id!,
  });
  const { categories } = await getCategories();
  const { authors } = await getAuthors();

  if (!article) {
    redirect('/admin/articles');
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">Edit Article</CardTitle>
      </CardHeader>
      <CardContent>
        <ArticleForm
          article={article}
          categories={categories}
          authors={authors}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default ArticleEditPage;
