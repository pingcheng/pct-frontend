import { Post } from "types/posts";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { DateTime } from "luxon";
import MarkdownText from "components/MarkdownText/MarkdownText";

export type PostsListProps = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export default function PostsList({
  posts,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PostsListProps): JSX.Element {
  if (posts.length === 0) {
    return <div>No posts :)</div>;
  }

  return (
    <>
      {posts.map((post, index) => {
        const link = `/posts/${post.slug}`;
        return (
          <div className="mb-10" key={index}>
            <Link to={link}>
              <h2 className="text-2xl mb-4 md:text-3xl">
                <div className="font-bold">{post.title}</div>
                <div className="text-sm text-gray-500">
                  <BiTimeFive />{" "}
                  {DateTime.fromISO(post.timeCreated).toISODate()}
                </div>
              </h2>
            </Link>

            <div className="post-body mb-4">
              <MarkdownText>{post.content}</MarkdownText>
            </div>

            <Link to={link} className="text-blue-500">
              [ Read More ]
            </Link>
          </div>
        );
      })}

      <div className="flex justify-between mb-4" key="paginator">
        {currentPage > 1 ? (
          <div
            onClick={() => onPrevPage()}
            className="text-blue-500 cursor-pointer"
          >
            Previous Page
          </div>
        ) : (
          <div />
        )}

        {currentPage < totalPages ? (
          <div
            onClick={() => onNextPage()}
            className="text-blue-500 cursor-pointer"
          >
            Next Page
          </div>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
