import { getArticles } from "@/actions";
import ArticlesList from "./(components)/articles-list";

const ArticlesPage = async () => {

  const { articles } = await getArticles();

  return (
    <ArticlesList articles={articles} />
  );
};

export default ArticlesPage;
