"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardEvent } from "@/actions";
import Link from "next/link";
import { CalendarX as Calendar } from "lucide-react";
import clsx from "clsx";

type Props = {
  title: string;
  subTitle: string;
  emptyMessage: string;
  events: DashboardEvent[];
};

export const DashboardEvents: FC<Props> = ({ title, subTitle, emptyMessage, events }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="px-7">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent className={clsx("flex-grow flex flex-col p-0", {
        "justify-center pb-6": events.length === 0,
      })}>
        {events.length > 0 ? (
          <div className="p-6 pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-full lg:max-w-[400px]">Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event, index) => (
                  <TableRow key={event.id} className={index % 2 === 0 ? 'bg-muted/80' : 'bg-muted/60'}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/${event.permalink}`}
                        className="text-blue-500 dark:text-blue-400 hover:underline"
                      >
                        {event.title}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {event.category.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5">
            <h3 className="text-3xl font-bold tracking-tight">
              { emptyMessage }
            </h3>
            <Calendar size={100} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardEvents;