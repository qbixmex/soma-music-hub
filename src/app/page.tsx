import { getEventsPublic } from "@/actions";
import PublicLayout from "./(public)/public.layout";
import { Title } from "@/components/text";
import { Event } from "./(public)/components";

const HomePage = async () => {

  const { events } = await getEventsPublic({ isPublished: true });

  return (
    <PublicLayout>
      <div className="container px-5 sm:mx-auto sm:px-6 md:px-8 lg:px-10 xl:px-20">
        <Title heading="h1" className="text-5xl font-bold mb-10">
          Soma Music Hub
        </Title>

        {events.length === 0 && (
          <p className="paragraph">No events found.</p>
        )}

        <section>
          { events && events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </section>
      </div>
    </PublicLayout>
  );

};

export default HomePage;