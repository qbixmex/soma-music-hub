import EventSkeleton from "./event-skeleton"

const EventsLoader: React.FC = () => {

  return (
    <div className="space-y-5">
      {[1,2].map((i) => <EventSkeleton key={i} />)}
    </div>
  );

};

export default EventsLoader;
