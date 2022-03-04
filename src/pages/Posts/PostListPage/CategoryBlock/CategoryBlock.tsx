import { useEffect, useState } from "react";
import { PostCategory } from "types/posts";
import { PostApi } from "api/PostApi/PostApi";

export type CategoryBlockProps = {
  onCategorySelected: (category: PostCategory) => void;
  defaultCategoryId?: number;
};

export default function CategoryBlock({
  onCategorySelected,
  defaultCategoryId,
}: CategoryBlockProps): JSX.Element {
  const [categories, setCategories] = useState<PostCategory[]>([]);

  useEffect(() => {
    PostApi.listPostCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    if (defaultCategoryId) {
      const defaultCategory = categories.find(
        (category) => category.id === defaultCategoryId
      );

      defaultCategory && onCategorySelected(defaultCategory);
    }
  }, [categories]);

  return (
    <div className="bg-gray-100 rounded-md p-4 mb-4">
      <div className="text-lg mb-4">Category</div>
      <div className="text-sm">
        {categories.map((category, index) => {
          return (
            <div
              onClick={() => onCategorySelected(category)}
              key={index}
              className="text-gray-500 hover:text-black smooth cursor-pointer"
            >
              {category.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
