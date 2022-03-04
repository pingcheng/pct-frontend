export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  status: string;
  category: Category;
  tags: string[];
  timeCreated: string;
};

export type Category = {
  id: number;
  name: string;
};
