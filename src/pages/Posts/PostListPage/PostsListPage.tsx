import { ReactNode, useEffect, useState } from "react";
import { LOADING_STATUS } from "types/api";
import { Post } from "types/posts";
import { PostApi } from "api/PostApi/PostApi";
import { Heading } from "components/Heading/Heading";
import PostsList from "pages/Posts/PostListPage/PostsList/PostsList";

export default function PostListPage(): JSX.Element {
  const [status, setStatus] = useState<LOADING_STATUS>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [postsFragment, setPostFragment] = useState<ReactNode>();

  useEffect(() => {
    setStatus(LOADING_STATUS.LOADING);

    PostApi.listPosts(currentPage)
      .then((response) => {
        setPosts(response.items);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
        setStatus(LOADING_STATUS.LOADED);
      })
      .catch(() => {
        setStatus(LOADING_STATUS.FAILED);
      });
  }, [currentPage, totalPages]);

  useEffect(() => {
    switch (status) {
      case LOADING_STATUS.LOADING:
        setPostFragment(<LoadingText />);
        break;

      case LOADING_STATUS.FAILED:
        setPostFragment(<FailedText />);
        break;

      case LOADING_STATUS.LOADED:
        setPostFragment(
          <>
            <PostsList
              posts={posts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={() => setCurrentPage(currentPage - 1)}
              onNextPage={() => setCurrentPage(currentPage + 1)}
            />
          </>
        );
        break;

      default:
        break;
    }
  }, [status]);

  return (
    <div className="container-body">
      <div>
        <Heading title="Posts" align="center" />
      </div>

      <div className="flex flex-wrap">
        <div className="w-full md:w-3/4">
          <div className="w-full pr-4">{postsFragment}</div>
        </div>
      </div>
    </div>
  );
}

function LoadingText(): JSX.Element {
  return <div className="text-center">Loading...</div>;
}

function FailedText(): JSX.Element {
  return <div className="text-center">Failed to load posts</div>;
}
