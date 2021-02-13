import React, { Component } from "react";
import { Heading } from "../../components/Heading/Heading";
import { Portfolio } from "./data";
import { Link } from "react-router-dom";

export default class PortfolioListPage extends Component {
	render() {
		return (
			<div>
				<Heading title="Portfolio" align="center"/>

				<div className="flex flex-wrap justify-around mt-4">
					{Portfolio.map(item => (
						<Link to={`/portfolio/${item.slug}`}>
							<div
								className="portfolio-card"
								style={{
									backgroundImage: `url(${item.coverImage})`
								}}
							>
								<div className="absolute bottom-0 p-2 text-gray-200" style={{
									zIndex: 10
								}}>
									<div className="text-sm font-bold">{item.name}</div>
									<div className="text-xs">{item.shortDescription}</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		);
	}
}