import { Suspense } from "react";

import EventsList from "./(components)/events-list";
import EventsSkeleton from "./(components)/events-skeleton";

const EventsPage = async () => {
  return (
    <Suspense fallback={<EventsSkeleton />}>
      <EventsList />
    </Suspense>
  );
};

export default EventsPage;
