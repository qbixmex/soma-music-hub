import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArticleForm from "../(components)/article-form";
import { getCategories } from "@/actions";

const CreateArticlePage = async () => {

  const { categories } = await getCategories();

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">Create Article</CardTitle>
      </CardHeader>
      <CardContent>
        <ArticleForm categories={categories} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CreateArticlePage;
