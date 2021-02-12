import React, { Component } from "react";
import PropTypes from "prop-types";

export class SimpleRowData extends Component {

	static propTypes = {
		label: PropTypes.string.isRequired
	};

	render() {
		return (
			<div className="flex mb-4">
				<div
					className="text-gray-400 text-xs w-1/3 text-right pr-2"
				>{ this.props.label.trim().toUpperCase() }</div>

				<div
					className="flex-1 pl-2"
				>{ this.props.children }</div>
			</div>
		)
	}
}