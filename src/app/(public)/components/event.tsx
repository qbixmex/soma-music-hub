import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components/text";
import { Button } from "@/components/ui/button";
import { EventPublic } from "@/actions/events/fetch_events";
import { getImageUrl } from "@/utils";

type Props = {
  event: EventPublic;
};

const Event: React.FC<Readonly<Props>> = ({ event }) => {

  const eventImage = getImageUrl(event.imageUrl);

  return (
    <article className="flex flex-col md:flex-row gap-10">
      <header className="w-full md:w-1/4">
        <figure>
          <Link
            href={`/${event.permalink}`}
            title={`read more about ${event.title}`}
          >
            <Image
              src={eventImage}
              className="w-full h-auto rounded-lg"
              alt={event.title}
              width={640}
              height={360}
            />
          </Link>
        </figure>
      </header>
      <section className="w-full md:w-3/4 flex flex-col justify-center">
        <Link href={`/${event.permalink}`}>
          <Title
            heading="h2"
            className="font-semibold text-xl lg:text-2xl hover:underline"
          >{event.title}</Title>
        </Link>
        <p className="paragraph">{event.description}</p>
        <div className="text-right">
          <Link
            href={`/${event.permalink}`}
            title={`read more about ${event.title}`}
          >
            <Button variant="outline">
              read more
            </Button>
          </Link>
        </div>
      </section>
    </article>
  );

};

export default Event;
