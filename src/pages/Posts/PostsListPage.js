import React, { Component } from "react";
import { PostApi } from "../../api/PostApi/PostApi";
import { Link } from "react-router-dom";
import { Heading } from "../../components/Heading/Heading";

export default class PostsListPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			totalPages: 1,
			currentPage: 1,
			failed: false
		}
	}

	componentDidMount() {
		PostApi.listPosts()
		.then(response => {
			console.log(response);
			this.setState({
				posts: response.data.data.items,
				totalPages: response.data.data.totalPages,
				currentPage: response.data.data.currentPage,
			});
		})
		.catch(error => {
			console.log("error!", error);
		});
	}

	render() {
		return (
			<div className="container-body">
				{this.state.posts.map((post, index) => (
					<Link key={index} to={`/posts/${post.slug}`}>
						<Heading title={post.title} className="social-link" />
					</Link>
				))}
			</div>
		)
	}
}