import { ReactNode, useEffect, useState } from "react";
import { LOADING_STATUS } from "types/api";
import { Post, PostCategory, PostTag } from "types/posts";
import { PostApi } from "api/PostApi/PostApi";
import { Heading } from "components/Heading/Heading";
import PostsList from "pages/Posts/PostListPage/PostsList/PostsList";

export default function PostListPage(): JSX.Element {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState<PostCategory>();
  const [currentTag, setCurrentTag] = useState<PostTag>();

  const [postStatus, setPostStatus] = useState<LOADING_STATUS>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsFragment, setPostFragment] = useState<ReactNode>();

  const [categoryStatus, setCategoryStatus] = useState<LOADING_STATUS>();
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [categoriesFragment, setCategoriesFragment] = useState<ReactNode>();

  const [tagsStatus, setTagsStatus] = useState<LOADING_STATUS>();
  const [tags, setTags] = useState<PostTag[]>([]);
  const [tagsFragment, setTagsFragment] = useState<ReactNode>();

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

  useEffect(() => {
    setCategoryStatus(LOADING_STATUS.LOADING);
    PostApi.listPostCategories()
      .then((categories) => {
        setCategories(categories);
        setCategoryStatus(LOADING_STATUS.LOADED);
      })
      .catch(() => {
        setCategoryStatus(LOADING_STATUS.FAILED);
      });

    setTagsStatus(LOADING_STATUS.LOADING);
    PostApi.listPostTags()
      .then((tags) => {
        setTags(tags);
        setTagsStatus(LOADING_STATUS.LOADED);
      })
      .catch(() => setTagsStatus(LOADING_STATUS.FAILED));
  }, []);

  useEffect(() => {
    switch (categoryStatus) {
      case LOADING_STATUS.LOADING:
        setCategoriesFragment(<Text content="Load post categories..." />);
        break;

      case LOADING_STATUS.FAILED:
        setCategoriesFragment(
          <Text content="Failed to load post categories" />
        );
        break;

      case LOADING_STATUS.LOADED:
        setCategoriesFragment(
          <>
            {categories.map((category, index) => {
              return (
                <div
                  onClick={() => setCurrentCategory(category)}
                  key={index}
                  className="text-gray-500 hover:text-black smooth cursor-pointer"
                >
                  {category.name}
                </div>
              );
            })}
          </>
        );
        break;
      default:
        break;
    }
  }, [categoryStatus]);

  useEffect(() => {
    switch (tagsStatus) {
      case LOADING_STATUS.LOADING:
        setTagsFragment(<Text content="Load post tags..." />);
        break;

      case LOADING_STATUS.FAILED:
        setTagsFragment(<Text content="Failed to load post tags" />);
        break;

      case LOADING_STATUS.LOADED:
        setTagsFragment(
          <>
            {tags.map((tag, index) => {
              return (
                <div
                  onClick={() => setCurrentTag(tag)}
                  key={index}
                  className="text-gray-500 hover:text-black smooth cursor-pointer mr-2 inline-block"
                >
                  {tag}
                </div>
              );
            })}
          </>
        );
        break;
      default:
        break;
    }
  }, [tagsStatus]);

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
          <div className="bg-gray-100 rounded-md p-4 mb-4">
            <div className="text-lg mb-4">Category</div>
            <div className="text-sm">{categoriesFragment}</div>
          </div>

          <div className="bg-gray-100 rounded-md p-4">
            <div className="text-lg mb-4">Tags</div>
            <div className="text-sm w-full">{tagsFragment}</div>
          </div>
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

function Text({ content }: { content: string }): JSX.Element {
  return <div>{content}</div>;
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
