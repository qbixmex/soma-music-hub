"use client"

type Props = {
  children: React.ReactNode;
};

const SessionProvider: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      { children }
    </SessionProvider>
  );
};

export default SessionProvider;
