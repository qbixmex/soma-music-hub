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
import { DashboardArticle } from "@/actions";
import Link from "next/link";
import { FileX } from "lucide-react";
import clsx from "clsx";

type Props = {
  title: string;
  subTitle: string;
  emptyMessage: string;
  articles: DashboardArticle[];
};

const DashboardArticles: FC<Props> = ({ title, subTitle, emptyMessage, articles }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="px-7">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent className={clsx("flex-grow flex flex-col p-0", {
        "justify-center pb-6": articles.length === 0,
      })}>
        {articles.length > 0 ? (
          <div className="p-6 pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-full lg:max-w-[400px]">Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article, index) => (
                  <TableRow key={article.id} className={index % 2 === 0 ? 'bg-muted/80' : 'bg-muted/60'}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/${article.slug}`}
                        className="text-blue-500 dark:text-blue-400 hover:underline"
                      >
                        {article.title}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {article.category.name}
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
            <FileX size={100} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardArticles;