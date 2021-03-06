import React, { Component } from "react";
import { NavigationMenu } from "../components/Navigation/NavigationMenu";
import { HiHeart } from "react-icons/hi";

export default class WithNavigationMenu extends Component {

	render() {
		return (
			<div>
				<NavigationMenu />

				<div className="pt-8">
					{this.props.children}

					<div className="text-center text-gray-500 my-4 text-sm">
						Hand crafted with <span className="text-red-400 text-xl"><HiHeart /></span> by Ping Cheng
					</div>
				</div>
			</div>
		);
	}

}