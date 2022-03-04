import { useEffect, useState } from "react";
import { PostTag } from "types/posts";
import { PostApi } from "api/PostApi/PostApi";

export type TagBlockProps = {
  onTagSelected: (tag: PostTag) => void;
};

export default function TagBlock({
  onTagSelected,
}: TagBlockProps): JSX.Element {
  const [tags, setTags] = useState<PostTag[]>([]);

  useEffect(() => {
    PostApi.listPostTags().then((tags) => setTags(tags));
  }, []);

  return (
    <div className="bg-gray-100 rounded-md p-4">
      <div className="text-lg mb-4">Tags</div>
      <div className="text-sm w-full">
        {tags.map((tag, index) => {
          return (
            <div
              onClick={() => onTagSelected(tag)}
              key={index}
              className="text-gray-500 hover:text-black smooth cursor-pointer mr-2 inline-block"
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}
