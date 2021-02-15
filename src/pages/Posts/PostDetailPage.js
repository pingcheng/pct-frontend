import React, { Component } from "react";
import { PostApi } from "../../api/PostApi/PostApi";
import { Heading } from "../../components/Heading/Heading";
import ReactMarkdown from "react-markdown";

export default class PostDetailPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			errorOnLoad: false,
			title: "",
			content: false,
			tags: [],
			timeCreated: ""
		};
	}

	componentDidMount() {
		PostApi.getPost(this.props.match.params.slug)
		.then(response => {
			this.setState({
				title: response.data.title,
				content: response.data.content,
				tags: response.data.tags,
				timeCreated: response.data.timeCreated
			})
		})
		.catch(() => {
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
			content = (
				<div>
					<Heading title={this.state.title} subTitle={`Published on ${this.state.timeCreated}`}/>

					<div className="post-body">
						<ReactMarkdown>
							{this.state.content}
						</ReactMarkdown>
					</div>
				</div>
			);
		}

		return (
			<div className="container-body">
				{content}
			</div>
		)
	}
}