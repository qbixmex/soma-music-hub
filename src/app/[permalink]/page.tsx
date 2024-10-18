import { FC } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Content } from "@/components/content";
import { Title } from "@/components/text";
import { Button } from "@/components/ui/button";
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaUser } from "react-icons/fa6";
import { getEventByPermalinkPublic, getEventMetadataByPermalink } from "@/actions";
import PublicLayout from "../(public)/public.layout";
import { getImageUrl } from "@/utils";
import "./event.css";

type Props = {
  params: {
    permalink: string;
  };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  // read route params
  const permalink = params.permalink;

  // fetch data
  const { metadata } = await getEventMetadataByPermalink(permalink);

  const metaTitle = metadata?.title;
  const metaDescription = metadata?.description;

  return {
    title: metaTitle,
    description: metaDescription,
    robots: metadata?.robots,
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

//* This re-validates the page every 7 days
export const revalidate = 604800;

const EventPage: FC<Props> = async ({ params: { permalink } }) => {

  const response = await getEventByPermalinkPublic(permalink);

  const { event } = response;

  if (!event) {
    redirect("/");
  }

  const eventImage = getImageUrl(event.imageUrl);

  return (
    <PublicLayout>
      <article className="container px-5 sm:mx-auto sm:px-6 md:px-8 lg:px-10 xl:px-20">
        <header>
          <Title
            heading="h1"
            className="font-bold text-3xl mb-5 lg:text-4xl"
          >{event.title}</Title>

          <div className="lg:flex lg:gap-8">
            <div className="lg:w-1/2">
              <Image
                src={eventImage}
                className="w-auto h-auto rounded-lg object-cover mb-5 md:object-contain lg:order-first"
                alt={event.title}
                width={640}
                height={360}
                priority
              />
            </div>

            <section className="lg:w-1/2">
              <div className="block sm:grid sm:grid-cols-2 lg:block">
                <div className="gap-x-3 mb-8 lg:text-left">
                  {/* Author */}
                  <Link className="no-underline group" href="#">
                    <div className="flex items-center gap-3 mb-4 group">
                      <div className="text-slate-300 bg-slate-800 group-hover:text-slate-200 p-3 rounded-full text-lg transition-colors">
                        <FaUser />
                      </div>
                      <p className="italic mb-0 group-hover:text-slate-200 text-slate-500 transition-colors">
                        {event.author.name}
                      </p>
                    </div>
                  </Link>

                  {/* CATEGORY */}
                  <p className="space-x-2">
                    <span className="font-semibold">Category:</span>
                    <Link href="#">{event.category.name}</Link>
                  </p>

                  {/* DATE */}
                  <p className="space-x-2">
                    <span className="font-semibold">Date:</span>
                    <span className="italic text-base">
                      {`${event.publishedAt ?? 'Unknown'}`}
                    </span>
                  </p>
                </div>

                <div className="mb-8 lg:justify-start">
                  {/* TAGS */}
                  <div className="mb-4">
                    <p className="font-semibold mb-4">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {
                        event.tags.map((tag, i) => (
                          <Link
                            key={`${tag}-${i}`}
                            className="text-sm font-semibold px-3 py-2 bg-slate-800 rounded"
                            href="#"
                          >
                            {tag}
                          </Link>
                        ))
                      }
                    </div>
                  </div>

                  {/* SHARE SOCIAL MEDIA */}
                  <div className="mb-8 lg:justify-start">
                    <p className="font-semibold mb-3">Share Article</p>
                    <div className="flex flex-wrap gap-2">
                      <Link className="social-link" href="#" title="Share on Facebook">
                        <FaFacebook />
                      </Link>
                      <Link className="social-link" href="#" title="Share on Twitter">
                        <FaTwitter />
                      </Link>
                      <Link className="social-link" href="#" title="Share on Instagram">
                        <FaInstagram />
                      </Link>
                      <Link className="social-link" href="#" title="Share on Linkedin">
                        <FaLinkedin />
                      </Link>
                      <Link className="social-link" href="#" title="Share on Email">
                        <FaEnvelope />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </header>

        <main>
          <Content id={event.id!} content={event.content} />
        </main>

        <p className="text-right mb-5">
          <Button variant="outline">
            <Link href="/events" className="no-underline text-white">back to events</Link>
          </Button>
        </p>

      </article>
    </PublicLayout>
  );

};

export default EventPage;