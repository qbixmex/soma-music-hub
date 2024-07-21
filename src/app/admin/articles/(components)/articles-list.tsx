"use client";

import { FC } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Article } from "@/interfaces";

type Props = {
  articles: Article[];
};

const ArticlesList: FC<Props> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no articles create yet.
          </h3>
          <Button className="mt-4" variant="primary">Create Article</Button>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">
          Articles
        </CardTitle>
        <CardDescription className="text-right">
        <Link href="/admin/articles/new">
          <Button variant="primary" className="w-full md:w-fit">
            Add an Article
          </Button>
        </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Published Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              articles.map((article) => (
                <TableRow key={article.id} className="bg-secondary/50">
                  <TableCell>
                    <span className="font-medium">How to create a React component</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="info">
                      { article.category }
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      className="text-xs"
                      variant={article.publishedAt ? "success" : "warning"}
                    >
                      { article.publishedAt ? "Published" : "Draft" }
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    { article.publishedAt?.toDateString() ?? "N/A" }
                  </TableCell>
                  <TableCell className="flex gap-x-2 justify-center">
                    <Link href={`/admin/articles/${article.slug}`}>
                      <Button variant="info">
                        <Eye />
                      </Button>
                    </Link>
                    <Link href={`/admin/articles/${article.slug}/edit/`}>
                      <Button variant="warning">
                        <Edit />
                      </Button>
                    </Link>
                    <Button variant="danger">
                      <Trash2 />
                    </Button>
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

export default ArticlesList;
