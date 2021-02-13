import React, { Component } from "react";
import PropTypes from "prop-types"

/**
 * Heading component.
 */
export class Heading extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		align: PropTypes.string,
		level: PropTypes.number,
		className: PropTypes.string,
	};

	static defaultProps = {
		align: "left",
		level: 1,
		className: ""
	};

	render() {
		return (
			<div>
				<h1
					className={`mb-8 ${this.props.className}`}
					style={{
						textAlign: this.props.align
					}}
				>{ this.props.title }</h1>
			</div>
		)
	}
}