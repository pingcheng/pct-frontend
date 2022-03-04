import { useLocation, useRouteMatch } from "react-router-dom";
import React, { ElementType, useEffect, useState } from "react";
import { Post } from "types/posts";
import { PostApi } from "api/PostApi/PostApi";
import { Heading } from "components/Heading/Heading";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { BiTimeFive } from "react-icons/bi";
import { DateTime } from "luxon";
import { BsTagFill } from "react-icons/bs";
import DisqusComments from "../../components/DisqusComments/DisqusComments";

export type UrlParams = {
  slug: string;
};

export default function PostDetailPage(): JSX.Element {
  const routeMatch = useRouteMatch<UrlParams>();
  const location = useLocation();

  const [slug, setSlug] = useState<string>();
  const [post, setPost] = useState<Post>();
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => setSlug(routeMatch.params.slug));

  useEffect(() => {
    if (!slug) {
      return;
    }

    setLoadFailed(false);
    document.title = "Loading...";

    PostApi.getPost(slug)
      .then((post) => {
        setPost(post);
        document.title = post.title;
        console.log(post);
      })
      .catch(() => {
        document.title = "Failed to load post";
        setLoadFailed(true);
      });
  }, [slug]);

  let section = LoadingPlaceholder();

  if (loadFailed) {
    section = LoadFailedPlaceholder();
  } else if (post) {
    section = (
      <>
        {PostSection(post)}
        <DisqusComments
          url={window.location.origin + location.pathname}
          identifier={`post/${slug}`}
          title={post.title}
        />
      </>
    );
  } else {
    section = LoadingPlaceholder();
  }

  return <div className="container-body">{section}</div>;
}

function LoadingPlaceholder(): JSX.Element {
  return <div className="text-center">Loading...</div>;
}

function LoadFailedPlaceholder(): JSX.Element {
  return <div className="text-center">Failed to load</div>;
}

function PostSection(post: Post): JSX.Element {
  const renderers: { [nodeType: string]: ElementType } = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter style={atomOneDarkReasonable} language={language}>
          {value}
        </SyntaxHighlighter>
      );
    },
  };

  console.log("post section", post);

  return (
    <div>
      <Heading title={post.title} subTitle={PostSubTitle(post)} />
      <div className="post-body">
        <ReactMarkdown renderers={renderers}>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}

function PostSubTitle(post: Post): JSX.Element {
  return (
    <div>
      <span>
        <BiTimeFive /> {DateTime.fromISO(post.timeCreated).toISODate()}
      </span>
      <span className="pl-4">
        <BsTagFill /> {post.tags.join(", ")}
      </span>
    </div>
  );
}
