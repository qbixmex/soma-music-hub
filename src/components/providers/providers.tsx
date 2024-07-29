import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

const Providers: FC<{children: ReactNode}> = (props) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {props.children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
