import React, { ElementType } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";

type Renderers = {
  [nodeType: string]: ElementType;
};

export const renderers: Renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={atomOneDarkReasonable} language={language}>
        {value}
      </SyntaxHighlighter>
    );
  },
};
