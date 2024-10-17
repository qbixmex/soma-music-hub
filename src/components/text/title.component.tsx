import clsx from "clsx";
import { CSSProperties, FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  style?: CSSProperties;
};

const Title: FC<Props> = ({
  children,
  heading = 'h1',
  className,
  style,
}) => {
  const Heading = heading;
  return (
    <Heading className={clsx(className, {
      'text-purple-400': heading === 'h1',
      'text-blue-400': heading === 'h2',
      'text-orange-400': heading === 'h3',
    })} style={style}>
      {children}
    </Heading>
  );
};

export default Title;