import { DiscussionEmbed } from "disqus-react";
import React from "react";

export type DisqusCommentsProps = {
  url: string;
  identifier: string;
  title: string;
};

export default function DisqusComments({
  url,
  identifier,
  title,
}: DisqusCommentsProps): JSX.Element {
  return (
    <DiscussionEmbed
      shortname="pingchengtech"
      config={{
        url,
        identifier,
        title,
      }}
    />
  );
}
