import React, { Component } from "react";
import { Heading } from "../../components/Heading/Heading";
import { Portfolios } from "./data";
import { Link } from "react-router-dom";
import { PortfolioCard } from "../../components/Portfolio/PortfolioCard";

export default class PortfolioListPage extends Component {

	componentDidMount() {
		document.title = "Portfolio";
	}

	render() {
		return (
			<div className="container-body">
				<Heading title="Portfolio" align="center"/>

				<div className="flex flex-wrap justify-around mt-4">
					{Portfolios.map(item => (
						<Link to={`/portfolio/${item.slug}`} key={item.slug}>
							<PortfolioCard
								name={item.name}
								description={item.shortDescription}
								image={item.coverImage}
							/>
						</Link>
					))}
				</div>
			</div>
		);
	}
}