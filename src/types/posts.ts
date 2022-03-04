export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  status: string;
  category: PostCategory;
  tags: PostTag[];
  timeCreated: string;
};

export type PostCategory = {
  id: number;
  name: string;
};

export type PostTag = string;
