import { FC } from "react";
import { getEvents } from "@/actions";
import { auth } from "@/auth.config";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getImageUrl } from "@/utils";
import { Edit } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import DeleteEvent from "./delete-event";
import ToggleActive from "./toggle-active.component";

const EventsList: FC = async () => {

  const session = await auth();

  const { events } = await getEvents({
    role: session?.user.role,
    authorId: session?.user.id
  });

  if (events.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no events created yet.
          </h3>
          <Button className="mt-4" variant="primary" asChild>
            <Link href="/admin/events/new">
              Create Event
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">
          Events
        </CardTitle>
        <CardDescription className="text-right">
          <Button variant="primary" className="w-full md:w-fit" asChild>
            <Link href="/admin/events/new">
              Add an Event
            </Link>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden xl:table-cell">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden xl:table-cell">Artist</TableHead>
              <TableHead className="hidden xl:table-cell">Event Date</TableHead>
              <TableHead className="table-cell">Active</TableHead>
              <TableHead className="hidden xl:table-cell">&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              events.map((event) => (
                <TableRow key={event.id} className="bg-secondary/50">
                  <TableCell className="hidden xl:table-cell xl:w-[150px]">
                    <Image
                      src={getImageUrl(event.imageUrl)}
                      alt={event.title}
                      width={150}
                      height={100}
                      className="w-full max-w-[150px] h-[100px] object-cover rounded-lg"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{ event.title }</span>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    { event.artist }
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {
                      event.eventDate
                        ? new Intl.DateTimeFormat("en-CA", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(event.eventDate)
                        : "Not assigned yet"
                    }
                  </TableCell>
                  <TableCell className="table-cell">
                    <ToggleActive id={event.id} currentStatus={event.active} />
                  </TableCell>
                  <TableCell className="md:table-cell">
                    <div className="flex gap-2 justify-center items-center">
                      <Button variant="warning" asChild>
                        <Link href={`/admin/events/${event.permalink}/edit/`}>
                          <Edit />
                        </Link>
                      </Button>
                      <DeleteEvent eventId={event.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EventsList;
