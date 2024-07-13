import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

const Providers: FC<{children: ReactNode}> = (props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {props.children}
    </ThemeProvider>
  );
};

export default Providers;
