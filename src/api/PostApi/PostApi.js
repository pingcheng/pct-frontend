import { ApiClient } from "../ApiClient";


export class PostApi {

	static async listPosts(page = 1, options = {}) {

		let response;

		try {
			response = await ApiClient.get("/posts", {
				params: {
					page: page,
					categoryId: options.categoryId || null,
				}
			});
		} catch (e) {
			throw e;
		}

		return response;
	}

	static async getPost(slug) {
		let response;

		try {
			response = await ApiClient.get(`/posts/${slug}`);
		} catch (e) {
			throw e;
		}

		return response.data;
	}

	/**
	 * List post categories.
	 *
	 * @returns {Promise<any>}
	 */
	static async listPostCategories() {
		let response;

		try {
			response = await ApiClient.get("/postCategories");
		} catch (e) {
			throw e;
		}

		return response.data;
	}
}