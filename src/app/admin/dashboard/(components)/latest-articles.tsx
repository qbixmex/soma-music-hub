"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
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

const LatestArticles = () => {

  if (false) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no articles create yet.
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add an Article</Button>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Articles</CardTitle>
        <CardDescription>Recent articles</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Published Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-muted/50">
              <TableCell>
                <div className="font-medium">How to create a React component</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">React</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Published
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2024-07-22</TableCell>
              <TableCell className="text-right">
                <Button variant="secondary">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className="bg-accent">
              <TableCell>
                <div className="font-medium">What&apos;s the best libraries for NextJs</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">NextJS</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Published
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2024-05-12</TableCell>
              <TableCell className="text-right">
                <Button variant="secondary">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted/50">
              <TableCell>
                <div className="font-medium">Why is important SEO in websites ?</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">SEO</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Published
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2024-06-02</TableCell>
              <TableCell className="text-right">
                <Button variant="secondary">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LatestArticles;