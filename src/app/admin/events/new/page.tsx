import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EventForm from "../(components)/event-form";
import { getCategories } from "@/actions";

const CreateEventPage = async () => {

  const { categories } = await getCategories();

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">Create Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm categories={categories} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CreateEventPage;
