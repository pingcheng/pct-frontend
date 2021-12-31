import { ApiClient } from "../ApiClient";

export class PostApi {
  static async listPosts(page = 1, options = {}) {
    let response;

    response = await ApiClient.get("/posts", {
      params: {
        page: page,
        categoryId: options.categoryId || null,
        tag: options.tag || null,
      },
    });

    return response;
  }

  static async getPost(slug) {
    let response;

    response = await ApiClient.get(`/posts/${slug}`);

    return response.data;
  }

  /**
   * List post categories.
   *
   * @returns {Promise<any>}
   */
  static async listPostCategories() {
    let response;

    response = await ApiClient.get("/postCategories");

    return response.data;
  }

  /**
   * List post tags.
   *
   * @returns {Promise<any>}
   */
  static async listPostTags() {
    let response;

    response = await ApiClient.get("/postTags");

    return response.data;
  }
}
