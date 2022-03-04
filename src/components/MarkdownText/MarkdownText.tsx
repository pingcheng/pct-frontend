import ReactMarkdown from "react-markdown";
import { renderers } from "./supports";

export type MarkdownTextProps = {
  children: string;
};

export default function MarkdownText({
  children,
}: MarkdownTextProps): JSX.Element {
  return <ReactMarkdown renderers={renderers}>{children}</ReactMarkdown>;
}
