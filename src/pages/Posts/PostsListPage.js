import React, { Component } from "react";
import { PostApi } from "../../api/PostApi/PostApi";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ReactMarkdown from "react-markdown";
import { Heading } from "../../components/Heading/Heading";

export default class PostsListPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			postLoaded: false,
			errorOnPostLoad: false,
			posts: [],
			totalPages: 1,
			currentPage: 1,
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
			this.state({
				errorOnPostLoad: true,
			})
		})
		.finally(() => {
			this.setState({
				postLoaded: true
			})
		})
	}

	render() {

		let content;
		const renderers = {
			code: ({language, value}) => {
				console.log(language, value);
				return <SyntaxHighlighter style={atomOneDarkReasonable} language={language}>{value}</SyntaxHighlighter>
			}
		};

		if (!this.state.postLoaded) {
			content = <div className="text-center">Loading...</div>
		} else if (this.state.errorOnPostLoad) {
			content = <div className="text-center">Failed to load posts</div>
		} else {
			content = this.state.posts.map((post, index) => {
				const date = DateTime.fromISO(post.timeCreated);
				const link = `/posts/${post.slug}`;
				return (
					<div className="mb-10">
						<Link key={index} to={link}>
							<h2 className="text-4xl mb-4">
								<div className="font-bold">{post.title}</div>
								<div className="text-sm text-gray-500">Published on {date.toISODate()}</div>
							</h2>
						</Link>

						<div className="post-body">
							<ReactMarkdown className="text-base text-black mb-4" renderers={renderers} children={post.content} />
						</div>

						<Link to={link} className="text-blue-500">[ Read More ]</Link>
					</div>
				)
			});
		}

		return (
			<div className="container-body">
				<Heading title="Posts" align="center"/>

				<div className="flex flex-wrap">
					<div className="flex-1">
						{content}
					</div>
				</div>
			</div>
		)
	}
}