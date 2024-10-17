import { getUsers } from "@/actions";
import UsersList from "./(components)/users-list";

const UsersPage = async () => {
  const { users } = await getUsers();

  return (
    <UsersList users={users} />
  );
};

export default UsersPage;
