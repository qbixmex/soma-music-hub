import { auth } from "@/auth.config";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-3xl font-bold">Profile</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableCell>Javier Perez</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableCell>javier@gmail.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-start md:justify-end">
      </CardFooter>
    </Card>
  );
};

export default ProfilePage;