import { useEffect, useState } from "react";
import { PostCategory, PostTag } from "types/posts";
import { Heading } from "components/Heading/Heading";
import { useHistory, useLocation } from "react-router-dom";
import { integerOrNull } from "utils/NumberUtils";
import CategoryBlock from "pages/Posts/PostListPage/CategoryBlock/CategoryBlock";
import TagBlock from "pages/Posts/PostListPage/TagBlock/TagBlock";
import PostBlock from "pages/Posts/PostListPage/PostBlock/PostBlock";

export default function PostListPage(): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const [queryCategoryId, setQueryCategoryId] = useState<number>();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState<PostCategory>();
  const [currentTag, setCurrentTag] = useState<PostTag>();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setCurrentTag(query.get("tag") ?? undefined);
    setQueryCategoryId(integerOrNull(query.get("categoryId")) ?? undefined);
    setCurrentPage(integerOrNull(query.get("page")) ?? 1);
  }, []);

  useEffect(() => {
    const queries: Record<string, string | number | undefined> = {
      page: currentPage === 1 ? undefined : currentPage,
      categoryId: currentCategory?.id,
      tag: currentTag,
    };
    const search = Object.keys(queries)
      .filter((key) => queries[key] !== undefined)
      .map((key) => `${key}=${queries[key]}`)
      .join("&");
    history.push({
      pathname: location.pathname,
      search: `?${search}`,
    });
  }, [currentPage, currentCategory, currentTag]);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory, currentTag]);

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
          <div className="w-full pr-4">
            <PostBlock
              page={currentPage}
              categoryId={currentCategory?.id ?? queryCategoryId ?? undefined}
              tag={currentTag}
              onPageChanged={(page) => setCurrentPage(page)}
            />
          </div>
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
