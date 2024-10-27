import { FC } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EventForm from "../../(components)/event-form";
import { getEventByPermalink, getCategories, getAuthors } from "@/actions";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

type Props = {
  params: Promise<{
    permalink: string;
  }>;
};

const EventEditPage: FC<Props> = async ({ params }) => {
  const permalink = (await params).permalink;

  const session = await auth();

  const { event } = await getEventByPermalink({
    permalink,
    role: session?.user.role!,
    authorId: session?.user.id!,
  });
  const { categories } = await getCategories();
  const { authors } = await getAuthors();

  if (!event) {
    redirect('/admin/events');
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">Edit Article</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm
          event={event}
          categories={categories}
          authors={authors}
        />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default EventEditPage;
