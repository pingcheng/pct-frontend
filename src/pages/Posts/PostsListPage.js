import React, { Component } from "react";
import { PostApi } from "../../api/PostApi/PostApi";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ReactMarkdown from "react-markdown";
import { Heading } from "../../components/Heading/Heading";
import { BiTimeFive } from "react-icons/bi";
import { integerOrNull } from "../../utils/NumberUtils";

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

			// Post Tags states
			postTagsLoaded: false,
			errorOnPostTagsLoad: false,
			postTag: [],

			queryPage: 1,
			queryCategoryId: null,
			queryTag: null,
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
			this.loadPostTags();
		});
	}

	componentDidUpdate(prevProps) {
		// Watch the url search string, "remount" the component when the query string changed.
		if (prevProps.location.search !== this.props.location.search) {
			this.componentDidMount();
		}
	}

	/**
	 * Read the query string and put them into state
	 *
	 * @param next
	 */
	readUrlQueries(next) {
		const query = new URLSearchParams(this.props.location.search);
		const updates = {};

		updates.queryPage = integerOrNull(query.get("page")) || 1;
		updates.queryCategoryId = integerOrNull(query.get("categoryId"));
		updates.queryTag = query.get("tag");

		this.setState(updates, next);
	}

	/**
	 * Load the posts.
	 */
	loadPosts = () => {

		this.setState({
			postLoaded: false,
			errorOnPostLoaded: false
		}, () => {
			PostApi.listPosts(this.state.queryPage, {
				categoryId: this.state.queryCategoryId,
				tag: this.state.queryTag
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
		});
	};

	/**
	 * Load the post categories into the page state.
	 */
	loadPostCategories = () => {

		// If the category is already loaded, then we don't need to reload them.
		if (this.state.postCategoriesLoaded) {
			return;
		}

		this.setState({
			postCategoriesLoaded: false,
			errorOnPostCategoriesLoad: false,
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
	 * Load the post tags into the page state.
	 */
	loadPostTags = () => {

		// If post tags are already loaded, then we don't need to reload them.
		if (this.state.postTagsLoaded) {
			return;
		}

		this.setState({
			postTagsLoaded: false,
			errorOnPostTagsLoad: false,
		}, () => {
			PostApi.listPostTags()
				.then(response => {
					this.setState({
						postTags: response.data
					});
				})
				.catch(() => {
					this.setState({
						errorOnPostTagsLoad: true,
					});
				})
				.finally(() => {
					this.setState({
						postTagsLoaded: true,
					})
				});
		});
	}

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
	};

	/**
	 * Change the post tag.
	 *
	 * @param tag
	 * @returns {Promise<void>}
	 */
	changeTag = async (tag) => {
		const query = new URLSearchParams(this.props.location.search);
		query.set("tag", tag);
		query.delete("page");
		await this.props.history.push({
			pathname: this.props.location.pathname,
			search: query.toString()
		});
	}

	removeUrlQuery = (name) => {
		const query = new URLSearchParams(this.props.location.search);
		query.delete(name);
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: query.toString()
		});
	}

	render() {

		const renderers = {
			code: ({language, value}) => {
				return <SyntaxHighlighter style={atomOneDarkReasonable} language={language}>{value}</SyntaxHighlighter>
			}
		};

		// Compose post html
		let content;
		if (!this.state.postLoaded) {
			content = <div className="text-center">Loading...</div>
		} else if (this.state.errorOnPostLoad) {
			content = <div className="text-center">Failed to load posts</div>
		} else if (this.state.posts.length > 0) {
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
		} else {
			content = <div>No posts found :(</div>;
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
					className="text-gray-500 hover:text-black smooth cursor-pointer"
				>{category.name}</div>
			});
		}

		// Compose HTML content for post tags
		let postTagsHtml;
		if (!this.state.postTagsLoaded) {
			postTagsHtml = <div>Load post tags...</div>;
		} else if (this.state.errorOnPostTagsLoad) {
			postTagsHtml = <div>Failed to load post tags</div>;
		} else {
			postTagsHtml = this.state.postTags.map((tag, index) => {
				return <div
					onClick={() => this.changeTag(tag)}
					key={index}
					className="text-gray-500 hover:text-black smooth cursor-pointer mr-2 inline-block"
				>{tag}</div>
			})
		}

		let filterHtml = [];
		if (this.state.queryCategoryId !== null && this.state.postCategoriesLoaded) {
			let categoryName = "Unknown";
			for (let category of this.state.postCategories) {
				if (category.id === this.state.queryCategoryId) {
					categoryName = category.name;
					break;
				}
			}

			filterHtml.push((
				<div
					onClick={() => this.removeUrlQuery('categoryId')}
					className="inline-block px-2 py-1 rounded-lg bg-gray-200 text-xs hover:text-black cursor-pointer hover:bg-gray-300 smooth mr-2"
				>
					✕ Category - {categoryName}
				</div>
			));
		}

		if (this.state.queryTag !== null && this.state.postTagsLoaded) {
			filterHtml.push((
				<div
					onClick={() => this.removeUrlQuery('tag')}
					className="inline-block px-2 py-1 rounded-lg bg-gray-200 text-xs hover:text-black cursor-pointer hover:bg-gray-300 smooth mr-2"
				>
					✕ Tag - {this.state.queryTag}
				</div>
			));
		}

		return (
			<div className="container-body">
				<div>
					<Heading title="Posts" align="center" subTitle={filterHtml}/>
				</div>

				<div className="flex flex-wrap">
					<div className="w-full md:w-3/4">
						<div className="w-full pr-4">
							{content}
						</div>
					</div>

					<div className="w-full md:w-1/4">
						<div className="bg-gray-200 rounded-md p-4 mb-4">
							<div className="text-lg mb-4">Category</div>
							<div className="text-sm">
								{postCategoriesHtml}
							</div>
						</div>

						<div className="bg-gray-200 rounded-md p-4">
							<div className="text-lg mb-4">Tags</div>
							<div className="text-sm w-full">
								{postTagsHtml}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}