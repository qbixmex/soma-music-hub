import crypto from "crypto";
import { FC, Fragment } from "react";
import CodeSnippet from "@/app/articles/code-snippet.component";

const Content: FC<{id: string; content: string;}> = ({ id, content }) => {
  const regex = /<code>([\s\S]*?)<\/code>/g;
  let lastIndex = 0;
  const elements = [];

  content.replace(regex, (match, codeContent, offset) => {
    // Add the content before the <code> tag if there's any
    if (offset > lastIndex) {
      elements.push(
        <section
          key={crypto.randomUUID()}
          dangerouslySetInnerHTML={{ __html: content.slice(lastIndex, offset) }}
        />
      );
    }

    // Add the code snippet
    elements.push(<CodeSnippet key={crypto.randomUUID()} snippet={codeContent} />);

    lastIndex = offset + match.length;

    // This return is not used but required by the replace function
    return match; 
  });

  // Add any remaining content after the last <code> tag
  if (lastIndex < content.length) {
    elements.push(
      <section
        key={crypto.randomUUID()}
        dangerouslySetInnerHTML={{ __html: content.slice(lastIndex) }}
      />
    );
  }

  return <Fragment>{elements}</Fragment>;
};

export default Content;
