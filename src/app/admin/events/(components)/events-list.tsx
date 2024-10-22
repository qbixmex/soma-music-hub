"use client";

import { FC } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import { EventsForList, deleteEvent } from "@/actions";
import { toast } from "sonner";
import ToggleActive from "./toggle-active.component";
import { getImageUrl } from "@/utils";

type Props = {
  events: EventsForList[];
};

const EventsList: FC<Props> = ({ events }) => {

  const handleDeleteEvent = async (id: string) => {
    const response = await deleteEvent(id);

    if (!response.ok) {
      toast.error(response.message, {
        duration: 3000,
        position: "top-right",
        className: "bg-red-500 text-white",
      });
    }

    if (response.ok) {
      toast.success(response.message, {
        duration: 3000,
        position: "top-right",
        className: "bg-green-500 text-white",
      });
    }
  };

  if (events.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no events created yet.
          </h3>
          <Link href="/admin/events/new">
            <Button className="mt-4" variant="primary">Create Event</Button>
          </Link>
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
        <Link href="/admin/events/new">
          <Button variant="primary" className="w-full md:w-fit">
            Add an Event
          </Button>
        </Link>
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
                      <Link href={`/admin/events/${event.permalink}/edit/`}>
                        <Button variant="warning">
                          <Edit />
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="danger"><Trash2 /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              <p>This action cannot be undone.</p>
                              <p> This will permanently delete your event and data from our servers will deleted forever.</p>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteEvent(event.id!)}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
