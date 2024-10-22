import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components/text";
import { Button } from "@/components/ui/button";
import { EventPublic } from "@/actions/events/fetch_events";
import { getImageUrl } from "@/utils";
import {
  CalendarDays as Calendar,
  MapPin as Location
} from "lucide-react";

type Props = {
  event: EventPublic;
};

const Event: React.FC<Readonly<Props>> = ({ event }) => {

  const eventImage = getImageUrl(event.imageUrl);

  return (
    <article className="flex flex-col gap-10 md:flex-row">
      <header className="w-full md:max-w-[480px]">
        <figure>
          <Link
            href={`/${event.permalink}`}
            title={`read more about ${event.title}`}
          >
            <Image
              src={eventImage}
              className="w-full max-w-[480px] h-auto rounded-md border border-gray-600"
              alt={event.title}
              width={480}
              height={320}
            />
          </Link>
        </figure>
      </header>
      <section className="w-full flex flex-col justify-center gap-2">
        <Link href={`/${event.permalink}`}>
          <Title
            heading="h2"
            className="font-semibold text-xl lg:text-2xl hover:underline"
          >{event.title}</Title>
        </Link>

        <p className="text-pretty">{event.description}</p>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex gap-2 items-center text-white">
            <Calendar size={24} className="text-pink-400" />
            <span className="italic text-gray-300">
            {
              event.eventDate
              ? new Intl.DateTimeFormat("en-CA", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "America/Vancouver"
                }).format(event.eventDate)
              : "Not assigned yet"
            }
            </span>
          </div>
          <div className="flex gap-2 items-center text-white">
            <Location size={24} className="text-pink-400" />
            <span className="italic text-gray-300">
              { event.location }
            </span>
          </div>
        </div>

        <div className="text-right">
          <Button variant="outline">
            <Link
              href={`/${event.permalink}`}
              title={`read more about ${event.title}`}
            >
            more info
            </Link>
          </Button>
        </div>
      </section>
    </article>
  );

};

export default Event;
