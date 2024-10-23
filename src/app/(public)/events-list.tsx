import { getEventsPublic } from "@/actions";
import { Event } from "./components";

const EventsList: React.FC = async () => {

  const { events } = await getEventsPublic({ active: true });
  
  // Render the list after data is fetched
  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <section className="grid grid-cols-1 gap-5">
      {events && events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </section>
  );

};

export default EventsList;
