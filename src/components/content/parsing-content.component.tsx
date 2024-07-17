import { FC } from "react";
import CodeSnippet from "@/app/articles/code-snippet.component";

const Content: FC<{content: string}> = ({ content }) => {
  const regex = /<code>([\s\S]*?)<\/code>/g;
  let lastIndex = 0;
  const elements = [];

  content.replace(regex, (match, codeContent, offset) => {
    // Add the content before the <code> tag if there's any
    if (offset > lastIndex) {
      elements.push(
        <div dangerouslySetInnerHTML={{
          __html: content.slice(lastIndex, offset)
        }} />
      );
    }

    // Add the code snippet
    elements.push(<CodeSnippet snippet={codeContent} />);

    lastIndex = offset + match.length;

    // This return is not used but required by the replace function
    return match; 
  });

  // Add any remaining content after the last <code> tag
  if (lastIndex < content.length) {
    elements.push(<div dangerouslySetInnerHTML={{ __html: content.slice(lastIndex) }} />);
  }

  return <>{elements}</>;
};

export default Content;
