export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  status: string;
  category: PostCategory;
  tags: string[];
  timeCreated: string;
};

export type PostCategory = {
  id: number;
  name: string;
};
