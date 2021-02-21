import React, { Component } from "react";
import { PostApi } from "../../api/PostApi/PostApi";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ReactMarkdown from "react-markdown";
import { Heading } from "../../components/Heading/Heading";
import { BiTimeFive } from "react-icons/bi";

export default class PostsListPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			postLoaded: false,
			errorOnPostLoad: false,
			posts: [],
			totalPages: 1,
			currentPage: 1,

			postCategoriesLoaded: false,
			errorOnPostCategoriesLoad: false,
			postCategories: [],

			queryPage: 1,
			queryCategoryId: null,
		}
	}

	/**
	 * Event handler when component is loaded
	 * 1. Read the url search query
	 * 2. Load posts
	 */
	componentDidMount() {
		this.readUrlQueries(() => {
			this.loadPosts();
			this.loadPostCategories();
		});
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

		const categoryId = query.get("categoryId");
		if (categoryId !== null && Number.isInteger(parseInt(categoryId))) {
			updates.queryCategoryId = parseInt(categoryId);
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

		PostApi.listPosts(this.state.queryPage, {
			categoryId: this.state.queryCategoryId
		})
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
	 * Load the post categories into the page state.
	 */
	loadPostCategories = () => {
		this.setState({
			postLoaded: false,
			errorOnPostLoaded: false,
		}, () => {

			PostApi.listPostCategories()
				.then(response => {
					this.setState({
						postCategories: response.data
					});
				})
				.catch(() => {
					this.setState({
						errorOnPostCategoriesLoad: true
					});
				})
				.finally(() => {
					this.setState({
						postCategoriesLoaded: true,
					});
				});
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

	/**
	 * Change the post category.
	 *
	 * @returns {Promise<void>}
	 */
	changeCategory = async (categoryId) => {
		const query = new URLSearchParams(this.props.location.search);
		query.set("categoryId", categoryId);
		query.delete("page");
		await this.props.history.push({
			pathname: this.props.location.pathname,
			search: query.toString()
		});
		this.componentDidMount();
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
							<h2 className="text-2xl mb-4 md:text-3xl">
								<div className="font-bold">{post.title}</div>
								<div className="text-sm text-gray-500"><BiTimeFive /> {date.toISODate()}</div>
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

		// Compose HTML content for post categories
		let postCategoriesHtml;
		if (!this.state.postCategoriesLoaded) {
			postCategoriesHtml = <div>Load post categories...</div>;
		} else if (this.state.errorOnPostCategoriesLoad) {
			postCategoriesHtml = <div>Failed to load post categories</div>;
		} else {
			postCategoriesHtml = this.state.postCategories.map((category, index) => {
				return <div
					onClick={() => this.changeCategory(category.id)}
					key={index}
					className="text-gray-700 hover:text-black smooth cursor-pointer"
				>{category.name}</div>
			});
		}

		return (
			<div className="container-body">
				<Heading title="Posts" align="center"/>

				<div className="flex flex-wrap">
					<div className="w-full md:w-3/4">
						<div className="w-full pr-4">
							{content}
						</div>
					</div>

					<div className="w-full md:w-1/4">
						<div className="bg-gray-200 rounded-md p-4">
							<div className="text-lg mb-4">Post Category</div>
							<div className="text-sm">
								{postCategoriesHtml}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}