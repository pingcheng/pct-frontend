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
					className="text-gray-400 w-1/3 text-right pr-2"
					style={{
						minWidth: "33.33333%"
					}}
				>{ this.props.label.trim().toUpperCase() }</div>

				<div
					className="flex-1 pl-2"
				>{ this.props.children }</div>
			</div>
		)
	}
}