import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ArticleForm from "../(components)/article-form";

const CreateArticlePage = () => {
  return (
      <Card>
        <CardHeader className="px-7">
          <CardTitle className="text-4xl">Create Article</CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
  );
};

export default CreateArticlePage;
