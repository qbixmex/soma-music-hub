import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryForm from "../(components)/category-form";

const CreateArticlePage = () => {
  return (
      <Card>
        <CardHeader className="px-7">
          <CardTitle className="text-4xl text-center">Create Category</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
  );
};

export default CreateArticlePage;
