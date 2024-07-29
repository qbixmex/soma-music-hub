import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryForm from "../(components)/user-form";

const CreateArticlePage = () => {
  return (
      <Card>
        <CardHeader className="px-7">
          <CardTitle className="text-4xl text-center">Create User</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
  );
};

export default CreateArticlePage;
