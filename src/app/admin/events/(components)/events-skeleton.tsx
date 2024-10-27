import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EventsSkeleton = () => {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">
          Events
        </CardTitle>
        <CardDescription className="w-full flex justify-end">
          <span className="block w-[150px] h-[40px] rounded bg-gray-600 animate-pulse"></span>
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
              [1,2,3,4,5].map((event) => (
                <TableRow key={event} className="bg-secondary/50">
                  <TableCell className="hidden xl:table-cell xl:w-[150px]">
                    <div className="w-[150px] h-[100px] rounded bg-gray-600 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="w-[200px] h-8 rounded bg-gray-600 animate-pulse"></div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <div className="w-[150px] h-8 rounded bg-gray-600 animate-pulse"></div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <div className="w-[120px] h-8 rounded bg-gray-600 animate-pulse"></div>
                  </TableCell>
                  <TableCell className="table-cell">
                    <div className="w-[80px] h-8 rounded bg-gray-600 animate-pulse"></div>
                  </TableCell>
                  <TableCell className="md:table-cell">
                    <div className="flex gap-2 justify-center items-center">
                      <div className="w-[100px] h-[40px] rounded bg-gray-600 animate-pulse"></div>
                      <div className="w-[100px] h-[40px] rounded bg-gray-600 animate-pulse"></div>
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

export default EventsSkeleton;