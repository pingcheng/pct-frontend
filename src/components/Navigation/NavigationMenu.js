import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class NavigationMenu extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isMobileMenuVisible: false
		};
	}

	toggleMobileMenu = () => {
		this.setState({
			isMobileMenuVisible: !this.state.isMobileMenuVisible
		});
	};

	render() {
		return (
			<nav className="bg-gray-700">
				<div className="container-body">
					<div className="relative flex items-center justify-between h-16">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							<button onClick={this.toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
								<span className="sr-only">Open main menu</span>

								<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
								</svg>

								<svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

						<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">

							<div className="flex-shrink-0 flex items-center">
								<div className="font-bold text-white" style={{
									borderTop: "3px solid white",
									borderBottom: "3px solid white"
								}}>Ping Cheng</div>
							</div>

							<div className="hidden sm:block sm:ml-6">
								<div className="flex space-x-4">
									<NavLink to="/" exact className="nav-item" activeClassName="active">Home</NavLink>
									<NavLink to="/posts" className="nav-item" activeClassName="active">Posts</NavLink>
									<NavLink to="/portfolio" className="nav-item" activeClassName="active">Portfolio</NavLink>
									<NavLink to="/about" className="nav-item" activeClassName="active">About me</NavLink>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={`sm:hidden ${this.state.isMobileMenuVisible ? "block" : "hidden"}`}>
					<div className="px-2 pt-2 pb-3 space-y-1">
						<NavLink to="/" exact className="nav-item" activeClassName="active">Home</NavLink>
						<NavLink to="/posts" className="nav-item" activeClassName="active">Posts</NavLink>
						<NavLink to="/portfolio" className="nav-item" activeClassName="active">Portfolio</NavLink>
						<NavLink to="/about" className="nav-item" activeClassName="active">About me</NavLink>
					</div>
				</div>
			</nav>
		)
	}
}