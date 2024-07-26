"use client";

import { FC } from "react";
import Link from "next/link";
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
import { Edit, Eye, Trash2 } from "lucide-react";
import { Article } from "@/interfaces";
import { deleteArticle } from "@/actions";
import { toast } from "sonner";
import { format } from "date-fns";

type Props = {
  articles: Article[];
};

const ArticlesList: FC<Props> = ({ articles }) => {

  const handleDeleteArticle = async (id: string) => {
    const response = await deleteArticle(id);

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

  if (articles.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no articles create yet.
          </h3>
          <Link href="/admin/articles/new">
            <Button className="mt-4" variant="primary">Create Article</Button>
          </Link>
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
                    <span className="font-medium">{ article.title }</span>
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
                    { format(new Date(article.publishedAt!), "PPP") }
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
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="danger"><Trash2 /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            <p>This action cannot be undone.</p>
                            <p> This will permanently delete your article and data from our servers will deleted forever.</p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteArticle(article.id!)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
