import { getEvents } from "@/actions";
import EventsList from "./(components)/events-list";
import { auth } from "@/auth.config";

const EventsPage = async () => {

  const session = await auth();

  const { events } = await getEvents({
    role: session?.user.role,
    authorId: session?.user.id
  });

  return (
    <EventsList events={events} />
  );
};

export default EventsPage;
