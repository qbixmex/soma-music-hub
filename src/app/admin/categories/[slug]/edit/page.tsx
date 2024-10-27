import { FC } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryForm from "../../(components)/category-form";
import { getCategoryByPermalink } from "@/actions";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ permalink: string }>;
};

const CategoryEditPage: FC<Props> = async ({ params }) => {
  const permalink = (await params).permalink;

  const { category } = await getCategoryByPermalink(permalink);

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
