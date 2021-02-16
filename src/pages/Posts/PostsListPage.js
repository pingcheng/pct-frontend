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

			queryPage: 1,
		}
	}

	/**
	 * Event handler when component is loaded
	 * 1. Read the url search query
	 * 2. Load posts
	 */
	componentDidMount() {
		this.readUrlQueries(this.loadPosts);
	}

	/**
	 * Read the query string and put them into state
	 *
	 * @param next
	 */
	readUrlQueries(next) {
		const query = new URLSearchParams(this.props.location.search);
		const updates = {};
		const page = query.get("page");

		if (page !== null && Number.isInteger(parseInt((page)))) {
			updates.queryPage = parseInt(page);
		} else {
			updates.queryPage = 1;
		}

		this.setState(updates, next);
	}

	/**
	 * Load the posts.
	 */
	loadPosts = () => {

		this.setState({
			postLoaded: false,
			errorOnPostLoaded: false
		});

		PostApi.listPosts(this.state.queryPage)
		.then(response => {
			this.setState({
				posts: response.data.data.items,
				totalPages: response.data.data.totalPages,
				currentPage: response.data.data.currentPage,
			});
		})
		.catch(error => {
			this.setState({
				errorOnPostLoad: true,
			})
		})
		.finally(() => {
			this.setState({
				postLoaded: true
			})
		});
	};

	/**
	 * Go to the next page.
	 *
	 * @returns {Promise<void>}
	 */
	nextPage = async () => {
		if (this.state.postLoaded) {
			const query = new URLSearchParams(this.props.location.search);
			query.set("page", String(this.state.queryPage + 1));
			await this.props.history.push({
				pathname: this.props.location.pathname,
				search: query.toString()
			});
			this.componentDidMount();
		}
	};

	/**
	 * Go to the previous page.
	 *
	 * @returns {Promise<void>}
	 */
	previousPage = async () => {
		if (this.state.postLoaded) {
			const query = new URLSearchParams(this.props.location.search);
			query.set("page", String(this.state.queryPage - 1));
			await this.props.history.push({
				pathname: this.props.location.pathname,
				search: query.toString()
			});
			this.componentDidMount();
		}
	};

	render() {

		let content;
		const renderers = {
			code: ({language, value}) => {
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
					<div className="mb-10" key={index}>
						<Link to={link}>
							<h2 className="text-2xl mb-4 md:text-4xl">
								<div className="font-bold">{post.title}</div>
								<div className="text-sm text-gray-500 pt-2">Published on {date.toISODate()}</div>
							</h2>
						</Link>

						<div className="post-body">
							<ReactMarkdown className="text-base text-black mb-4" renderers={renderers} children={post.content} />
						</div>

						<Link to={link} className="text-blue-500">[ Read More ]</Link>
					</div>
				)
			});

			content.push(
				<div className="flex justify-between" key="paginator">
					{this.state.currentPage > 1 ? <div onClick={this.previousPage} className="text-blue-500 cursor-pointer">Previous Page</div> : <div> </div>}
					{this.state.currentPage < this.state.totalPages ? <div onClick={this.nextPage} className="text-blue-500 cursor-pointer">Next Page</div> : <div> </div>}
				</div>
			);
		}

		return (
			<div className="container-body">
				<Heading title="Posts" align="center"/>

				<div className="flex flex-wrap">
					<div className="flex-1 w-full">
						{content}
					</div>
				</div>
			</div>
		)
	}
}