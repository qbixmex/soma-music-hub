import { FC, Suspense } from "react";
import { Metadata } from "next";
import { getEventMetadataByPermalink, getStaticEventsPermalinks } from "@/actions";
import PublicLayout from "../(public)/public.layout";
import Event from "./(components)/event.component";
import "./event.css";
import EventSkeleton from "./(components)/event-skeleton";

type Props = {
  params: Promise<{
    permalink: string;
  }>;
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;

  // fetch data
  const { metadata } = await getEventMetadataByPermalink(params.permalink);

  const metaTitle = metadata?.title;
  const metaDescription = metadata?.description
    ? metadata?.description.length >= 160
      ? `${metadata?.description.slice(0, 157)} ...`
      : metadata?.description
    : "";
  const metaRobots = metadata?.robots;

  return {
    title: metaTitle,
    description: metaDescription,
    robots: metaRobots,
    authors: [{ name: metadata?.author }],
    // social media
    // openGraph: {
    //   title: metaTitle,
    //   description: metaDescription,
    //   // images: ['https://example.com/image-1.jpg', 'https://example.com/image-2.jpg'],
    //   images: [`/products/${product?.images[1]}`],
    // },
  }
};

//* ONLY BUILD TIME
export const generateStaticParams = async () => {

  const result = await getStaticEventsPermalinks(100);

  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.permalinks.map((permalink) => ({ permalink }));

};

//* This re-validates the page every 7 days
export const revalidate = 604800;

const EventPage: FC<Props> = async props => {
  const params = await props.params;

  return (
    <PublicLayout>
      <Suspense fallback={<EventSkeleton />}>
        <Event permalink={params.permalink} />
      </Suspense>
    </PublicLayout>
  );
};

export default EventPage;
