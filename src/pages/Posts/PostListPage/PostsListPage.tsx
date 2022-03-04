import { ReactNode, useEffect, useState } from "react";
import { LOADING_STATUS } from "types/api";
import { Category, Post } from "types/posts";
import { PostApi } from "api/PostApi/PostApi";
import { Heading } from "components/Heading/Heading";
import PostsList from "pages/Posts/PostListPage/PostsList/PostsList";

export default function PostListPage(): JSX.Element {
  const [status, setStatus] = useState<LOADING_STATUS>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState<Category>();

  const [categoryStatus, setCategoryStatus] = useState<LOADING_STATUS>();
  const [categories, setCategories] = useState<Category[]>([]);

  const [postsFragment, setPostFragment] = useState<ReactNode>();
  const [categoriesFragment, setCategoriesFragment] = useState<ReactNode>();

  useEffect(() => {
    setStatus(LOADING_STATUS.LOADING);

    PostApi.listPosts(currentPage, {
      categoryId: currentCategory?.id,
    })
      .then((response) => {
        setPosts(response.items);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
        setStatus(LOADING_STATUS.LOADED);
      })
      .catch(() => {
        setStatus(LOADING_STATUS.FAILED);
      });
  }, [currentPage, totalPages, currentCategory]);

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

  return (
    <div className="container-body">
      <div>
        <Heading
          title="Posts"
          align="center"
          subTitle={
            <>
              <CategoryFilter
                category={currentCategory}
                onRemove={() => setCurrentCategory(undefined)}
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

function CategoryFilter({
  category,
  onRemove,
}: {
  category?: Category;
  onRemove: () => void;
}): JSX.Element {
  if (category) {
    return (
      <div
        onClick={() => onRemove()}
        className="inline-block px-2 py-1 rounded-lg bg-gray-100 text-xs hover:text-black cursor-pointer hover:bg-gray-300 smooth mr-2"
      >
        ✕ Category - {category.name}
      </div>
    );
  }

  return <></>;
}
