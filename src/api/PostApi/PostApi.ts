import { ApiClient } from "../ApiClient";
import { Post } from "types/posts";

export type ListPostsOptions = {
  categoryId?: number;
  tag?: string;
};

type ApiResponse<T> = {
  data: T;
  message: string;
};

export class PostApi {
  static async listPosts(page = 1, options: ListPostsOptions = {}) {
    return await ApiClient.get("/posts", {
      params: {
        page: page,
        categoryId: options.categoryId || null,
        tag: options.tag || null,
      },
    });
  }

  static async getPost(slug: string): Promise<Post> {
    const response = await ApiClient.get<ApiResponse<Post>>(`/posts/${slug}`);

    return response.data.data;
  }

  /**
   * List post categories.
   *
   * @returns {Promise<any>}
   */
  static async listPostCategories() {
    const response = await ApiClient.get("/postCategories");

    return response.data;
  }

  /**
   * List post tags.
   *
   * @returns {Promise<any>}
   */
  static async listPostTags() {
    const response = await ApiClient.get("/postTags");

    return response.data;
  }
}
