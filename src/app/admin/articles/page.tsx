import { getArticles } from "@/actions";
import ArticlesList from "./(components)/articles-list";
import { auth } from "@/auth.config";

const ArticlesPage = async () => {

  const session = await auth();

  const { articles } = await getArticles({
    role: session?.user.role,
    authorId: session?.user.id
  });

  return (
    <ArticlesList articles={articles} />
  );
};

export default ArticlesPage;
