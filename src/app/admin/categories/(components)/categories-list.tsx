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
import { Edit, Trash2 } from "lucide-react";
import { Category } from "@/interfaces";
import { deleteCategory } from "@/actions";
import { toast } from "sonner";
import { format } from "date-fns";

type Props = {
  categories: Category[];
};

const ArticlesList: FC<Props> = ({ categories }) => {

  const handleDeleteCategory = async (id: string) => {
    const response = await deleteCategory(id);

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

  if (categories.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no categories create yet.
          </h3>
          <Link href="/admin/categories/new">
            <Button className="mt-4" variant="primary">Create Category</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">
          Categories
        </CardTitle>
        <CardDescription className="text-right">
        <Link href="/admin/categories/new">
          <Button variant="primary" className="w-full md:w-fit">
            Add an Category
          </Button>
        </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-column">Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              categories.map((category) => (
                <TableRow key={category.id} className="bg-secondary/50">
                  <TableCell>
                    <span className="font-medium">{ category.name }</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="font-medium">{ category.description }</span>
                  </TableCell>
                  <TableCell className="flex gap-x-2 justify-end">
                    <Link href={`/admin/categories/${category.slug}/edit/`}>
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
                          <AlertDialogAction onClick={() => handleDeleteCategory(category.id!)}>
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
