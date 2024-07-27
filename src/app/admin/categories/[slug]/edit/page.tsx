import { FC } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryForm from "../../(components)/category-form";
import { getCategoryBySlug } from "@/actions";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const CategoryEditPage: FC<Props> = async ({ params: { slug } }) => {

  const { category } = await getCategoryBySlug(slug);

  if (!category) {
    redirect('/admin/categories');
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">Edit Category</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryForm category={category} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CategoryEditPage;
