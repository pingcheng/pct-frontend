import React, { Component } from "react";

export default class PortfolioDetailPage extends Component {
	render() {
		return (
			<div>
				Hello, {this.props.match.params.slug}
			</div>
		);
	}
}