"use client";

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@/components/ui/button";
import { FaCopy, FaCheck } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  snippet: string;
};

const CodeSnippet: React.FC<Readonly<Props>> = ({ snippet }) => {

  const [ copied, setCopied ] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <section className="mb-10">
      <div className="text-right">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={copyText}
              >
                { copied
                ? <FaCheck className='text-green-500' />
                : <FaCopy className='text-purple-400' />
              }
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Copy to clipboard
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
      </div>
      <SyntaxHighlighter
        language="typescript"
        style={theme}
        className="rounded-lg"
        wrapLongLines
      >
        {snippet}
      </SyntaxHighlighter>
    </section>
  );

};

export default CodeSnippet;
