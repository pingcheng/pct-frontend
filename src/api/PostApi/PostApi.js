import { ApiClient } from "../ApiClient";


export class PostApi {

	static async listPosts(page = 1, options = {}) {

		let response;

		try {
			response = await ApiClient.get("/posts");
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

}