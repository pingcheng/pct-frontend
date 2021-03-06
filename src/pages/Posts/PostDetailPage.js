import React, { Component } from "react";
import { PostApi } from "../../api/PostApi/PostApi";
import { Heading } from "../../components/Heading/Heading";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { BsTagFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { DateTime } from "luxon";
import { DiscussionEmbed } from "disqus-react";

export default class PostDetailPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			errorOnLoad: false,
			title: "",
			content: false,
			tags: [],
			timeCreated: DateTime.now()
		};
	}

	componentDidMount() {
		document.title = "Loading...";
		PostApi.getPost(this.props.match.params.slug)
		.then(response => {
			document.title = response.data.title;
			this.setState({
				title: response.data.title,
				content: response.data.content,
				tags: response.data.tags,
				timeCreated: DateTime.fromISO(response.data.timeCreated)
			})
		})
		.catch(() => {
			document.title = "Fail to load post";
			this.setState({
				errorOnLoad: true
			})
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
			content = <div className="text-center">Loading...</div>;
		} else if (this.state.errorOnLoad) {
			content = <div className="text-center">Failed to load</div>;
		} else {

			const renderers = {
				code: ({language, value}) => {
					return <SyntaxHighlighter style={atomOneDarkReasonable} language={language}>{value}</SyntaxHighlighter>
				}
			};

			const subtitle = (
				<div>
					<span><BiTimeFive /> {this.state.timeCreated.toISODate()}</span>
					<span className="pl-4"><BsTagFill /> {this.state.tags.join(", ")}</span>
				</div>
			)

			content = (
				<div>
					<Heading title={this.state.title} subTitle={subtitle} className="text-2xl md:text-3xl" />

					<div className="post-body">
						<ReactMarkdown renderers={renderers} children={this.state.content} />
					</div>
				</div>
			);
		}

		let disqusContent;
		if (this.state.loaded && !this.state.errorOnLoad) {
			disqusContent = (
				<DiscussionEmbed
					shortname="pingchengtech"
					config={
						{
							url: `${window.location.origin}${this.props.location.pathname}`,
							identifier: `post/${this.props.match.params.slug}`,
							title: this.state.title
						}
					}
				/>
			);
		}

		return (
			<div className="container-body">
				<div>
					{content}
				</div>
				<div>
					{disqusContent}
				</div>
			</div>
		)
	}
}