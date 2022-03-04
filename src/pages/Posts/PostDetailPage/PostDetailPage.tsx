import { useLocation, useRouteMatch } from "react-router-dom";
import React, { ReactNode, useEffect, useState } from "react";
import { Post } from "types/posts";
import { PostApi } from "api/PostApi/PostApi";
import { Heading } from "components/Heading/Heading";
import { BiTimeFive } from "react-icons/bi";
import { DateTime } from "luxon";
import { BsTagFill } from "react-icons/bs";
import MarkdownText from "components/MarkdownText/MarkdownText";
import DisqusComments from "components/DisqusComments/DisqusComments";
import { LOADING_STATUS } from "types/api";

export type UrlParams = {
  slug: string;
};

export default function PostDetailPage(): JSX.Element {
  const routeMatch = useRouteMatch<UrlParams>();
  const location = useLocation();

  const [status, setStatus] = useState(LOADING_STATUS.LOADING);
  const [slug, setSlug] = useState<string>();
  const [post, setPost] = useState<Post>();
  const [content, setContent] = useState<ReactNode>();

  useEffect(() => setSlug(routeMatch.params.slug));

  useEffect(() => {
    if (!slug) {
      return;
    }

    PostApi.getPost(slug)
      .then((post) => {
        setPost(post);
        setStatus(LOADING_STATUS.LOADED);
      })
      .catch(() => {
        setStatus(LOADING_STATUS.FAILED);
      });
  }, [slug]);

  useEffect(() => {
    switch (status) {
      case LOADING_STATUS.LOADING:
        document.title = "Loading...";
        setContent(<LoadingText />);
        break;

      case LOADING_STATUS.FAILED:
        document.title = "Failed to load post";
        setContent(<LoadFailedText />);
        break;

      case LOADING_STATUS.LOADED:
        if (post) {
          document.title = post.title;
          setContent(
            <>
              <PostSection {...post} />
              <DisqusComments
                url={window.location.origin + location.pathname}
                identifier={`post/${slug}`}
                title={post.title}
              />
            </>
          );
        }
        break;
    }
  }, [status]);

  return <div className="container-body">{content}</div>;
}

function LoadingText(): JSX.Element {
  return <div className="text-center">Loading...</div>;
}

function LoadFailedText(): JSX.Element {
  return <div className="text-center">Failed to load</div>;
}

function PostSection(post: Post): JSX.Element {
  return (
    <div>
      <Heading title={post.title} subTitle={PostSubTitle(post)} />
      <div className="post-body">
        <MarkdownText>{post.content}</MarkdownText>
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
