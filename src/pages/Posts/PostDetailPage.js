import React, { Component } from "react";
import { PostApi } from "../../api/PostApi/PostApi";
import { Heading } from "../../components/Heading/Heading";

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
				loaded: true,
				title: response.data.title,
				content: response.data.content,
				tags: response.data.tags,
				timeCreated: response.data.timeCreated
			})
		})
		.catch(() => {})
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
					<Heading title={this.state.title} />

					<div className="py-4">
						{this.state.content}
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