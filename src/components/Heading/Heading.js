import React, { Component } from "react";
import PropTypes from "prop-types"

/**
 * Heading component.
 */
export class Heading extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		align: PropTypes.string,
		level: PropTypes.number
	};

	static defaultProps = {
		align: "left",
		level: 1
	};

	render() {
		return (
			<div>
				<h1
					className="mb-8"
					style={{
						textAlign: this.props.align
					}}
				>{ this.props.title }</h1>
			</div>
		)
	}
}