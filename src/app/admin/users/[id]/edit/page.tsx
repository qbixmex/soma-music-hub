import { FC } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserForm from "../../(components)/user-form";
import { getUserById } from "@/actions";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const UserEditPage: FC<Props> = async ({ params: { id } }) => {

  const response = await getUserById(id);

  if (!response.user) {
    redirect('/admin/users');
  }

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-4xl">Edit User</CardTitle>
      </CardHeader>
      <CardContent>
        <UserForm user={response.user} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default UserEditPage;
