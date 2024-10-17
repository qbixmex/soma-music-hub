import { FC, ReactNode } from "react";
import { TopNavigation } from "./components";

type Props = {
  children?: ReactNode;
};

const PublicLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <TopNavigation />
      {children}
    </>
  );

};

export default PublicLayout;
