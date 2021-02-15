import React, { Component } from "react";
import { PostApi } from "../../api/PostApi/PostApi";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

export default class PostsListPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			posts: [],
			totalPages: 1,
			currentPage: 1,
			failed: false
		}
	}

	componentDidMount() {
		PostApi.listPosts()
		.then(response => {
			this.setState({
				posts: response.data.data.items,
				totalPages: response.data.data.totalPages,
				currentPage: response.data.data.currentPage,
			});
		})
		.catch(error => {

		})
		.finally(() => {
			this.setState({
				loaded: true
			})
		})
	}

	render() {

		let content;

		if (!this.state.loaded) {
			content = <div className="text-center">Loading...</div>
		} else {
			content = this.state.posts.map((post, index) => {
				const date = DateTime.fromISO(post.timeCreated);
				return (
					<Link key={index} to={`/posts/${post.slug}`}>
						<h2 className="social-link text-2xl mb-8">
							<div>{post.title}</div>
							<div className="text-sm text-gray-500">Published on {date.toISODate()}</div>
						</h2>
					</Link>
				)
			});
		}

		return (
			<div className="container-body">
				{content}
			</div>
		)
	}
}