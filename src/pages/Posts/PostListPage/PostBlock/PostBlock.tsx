import { ReactNode, useEffect, useState } from "react";
import { Post, PostTag } from "types/posts";
import { PostApi } from "api/PostApi/PostApi";
import PostsList from "pages/Posts/PostListPage/PostsList/PostsList";
import { LOADING_STATUS } from "types/api";

export type PostBlockProps = {
  page?: number;
  categoryId?: number;
  tag?: PostTag;
  onPageChanged: (page: number) => void;
};

export default function PostBlock({
  page = 1,
  categoryId,
  tag,
  onPageChanged = () => undefined,
}: PostBlockProps): JSX.Element {
  const [status, setStatus] = useState<LOADING_STATUS>(LOADING_STATUS.LOADING);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setStatus(LOADING_STATUS.LOADING);

    PostApi.listPosts(page, {
      categoryId,
      tag,
    })
      .then((response) => {
        setPosts(response.items);
        setTotalPages(response.totalPages);
        setStatus(LOADING_STATUS.LOADED);
      })
      .catch(() => setStatus(LOADING_STATUS.FAILED));
  }, [page, categoryId, tag]);

  const changePage = (targetPage: number): void => {
    if (targetPage < 1) {
      targetPage = 1;
    } else if (targetPage > totalPages) {
      targetPage = totalPages;
    }

    onPageChanged(targetPage);
  };

  const mapping: Record<LOADING_STATUS, ReactNode> = {
    [LOADING_STATUS.LOADING]: <div>Loading...</div>,
    [LOADING_STATUS.FAILED]: <div>Failed to load posts</div>,
    [LOADING_STATUS.LOADED]: (
      <PostsList
        posts={posts}
        currentPage={page}
        totalPages={totalPages}
        onPrevPage={() => changePage(page - 1)}
        onNextPage={() => changePage(page + 1)}
      />
    ),
  };

  return <>{mapping[status]}</>;
}