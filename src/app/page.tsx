import { Suspense } from "react";
import PublicLayout from "./(public)/public.layout";
import { Title } from "@/components/text";
import EventsList from "./(public)/events-list";
import EventsLoader from "./(public)/components/events-loader";

const HomePage = async () => {

  return (
    <PublicLayout>
      <div className="container px-5 sm:mx-auto sm:px-6 md:px-8 lg:px-10 xl:px-20">
        <Title heading="h1" className="text-5xl font-bold mb-10">
          Soma Music Hub
        </Title>
        <Suspense fallback={<EventsLoader />}>
          <EventsList />
        </Suspense>
      </div>
    </PublicLayout>
  );

};

export default HomePage;
