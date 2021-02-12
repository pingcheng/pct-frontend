import React, { Component } from "react";
import { NavigationMenu } from "../components/Navigation/NavigationMenu";

export default class WithNavigationMenu extends Component {

	render() {
		return (
			<div>
				<NavigationMenu />

				<div>
					{this.props.children}
				</div>
			</div>
		);
	}

}