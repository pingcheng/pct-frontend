import { ReactNode, useEffect, useState } from "react";
import { LOADING_STATUS } from "types/api";
import { Post, PostCategory, PostTag } from "types/posts";
import { PostApi } from "api/PostApi/PostApi";
import { Heading } from "components/Heading/Heading";
import PostsList from "pages/Posts/PostListPage/PostsList/PostsList";
import { useLocation } from "react-router-dom";
import { integerOrNull } from "utils/NumberUtils";
import CategoryBlock from "pages/Posts/PostListPage/CategoryBlock/CategoryBlock";
import TagBlock from "pages/Posts/PostListPage/TagBlock/TagBlock";

export default function PostListPage(): JSX.Element {
  const location = useLocation();
  const [queryCategoryId, setQueryCategoryId] = useState<number>();

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState<PostCategory>();
  const [currentTag, setCurrentTag] = useState<PostTag>();

  const [postStatus, setPostStatus] = useState<LOADING_STATUS>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsFragment, setPostFragment] = useState<ReactNode>();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setCurrentTag(query.get("tag") ?? undefined);
    setQueryCategoryId(integerOrNull(query.get("categoryId")) ?? undefined);
  }, []);

  useEffect(() => {
    setPostStatus(LOADING_STATUS.LOADING);

    PostApi.listPosts(currentPage, {
      categoryId: currentCategory?.id,
      tag: currentTag,
    })
      .then((response) => {
        setPosts(response.items);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
        setPostStatus(LOADING_STATUS.LOADED);
      })
      .catch(() => {
        setPostStatus(LOADING_STATUS.FAILED);
      });
  }, [currentPage, totalPages, currentCategory, currentTag]);

  useEffect(() => {
    switch (postStatus) {
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
  }, [postStatus]);

  return (
    <div className="container-body">
      <div>
        <Heading
          title="Posts"
          align="center"
          subTitle={
            <>
              <Filter
                text={
                  currentCategory
                    ? `Category - ${currentCategory.name}`
                    : undefined
                }
                onRemove={() => setCurrentCategory(undefined)}
              />
              <Filter
                text={currentTag ? `Tag - ${currentTag}` : undefined}
                onRemove={() => setCurrentTag(undefined)}
              />
            </>
          }
        />
      </div>

      <div className="flex flex-wrap">
        <div className="w-full md:w-3/4">
          <div className="w-full pr-4">{postsFragment}</div>
        </div>

        <div className="w-full md:w-1/4">
          <CategoryBlock
            onCategorySelected={(category) => setCurrentCategory(category)}
            defaultCategoryId={queryCategoryId}
          />

          <TagBlock onTagSelected={(tag) => setCurrentTag(tag)} />
        </div>
      </div>
    </div>
  );
}

function LoadingText(): JSX.Element {
  return <div className="text-center">Loading...</div>;
}

function FailedText(): JSX.Element {
  return <div className="text-center">Failed to load</div>;
}

function Filter({
  text,
  onRemove,
}: {
  text?: string;
  onRemove: () => void;
}): JSX.Element {
  if (text) {
    return (
      <div
        onClick={() => onRemove()}
        className="inline-block px-2 py-1 rounded-lg bg-gray-100 text-xs hover:text-black cursor-pointer hover:bg-gray-300 smooth mr-2"
      >
        ✕ {text}
      </div>
    );
  }

  return <></>;
}
