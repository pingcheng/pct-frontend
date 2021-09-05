import React, { Component } from "react";
import { Portfolios } from "./data";
import { Heading } from "../../components/Heading/Heading";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PortfolioCard } from "../../components/Portfolio/PortfolioCard";
import { SimpleRowData } from "../../components/Rows/SimpleRowData";
import NotFoundPage from "../Errors/NotFoundPage";

export default class PortfolioDetailPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			portfolio: this.getPortfolioData(this.props.match.params.slug)
		};

		// Set up the page title
		document.title = `Portfolio - ${this.state.portfolio.name}`;
	}

	getPortfolioData = (slug) => {
		for (let portfolio of Portfolios) {
			if (portfolio.slug === slug) {
				return portfolio;
			}
		}

		return null;
	};

	render() {
		return (
			<div>
				{
					this.state.portfolio === null ? (
						<NotFoundPage />
					) : (
						<div>
						<div className="container-body">
							<div>
								<Link to="/portfolio">
									<IoMdArrowRoundBack/> Go back
								</Link>
							</div>

							<Heading title={this.state.portfolio.name} align="center"/>

							<div className="flex flex-wrap">
								<div className="w-full md:w-1/2 flex justify-center portfolios-center">
									<PortfolioCard name={this.state.portfolio.name}
												   description={this.state.portfolio.shortDescription}
												   image={this.state.portfolio.coverImage}/>
								</div>

								<div className="w-full md:w-1/2">
									<SimpleRowData label="project">
										{this.state.portfolio.name}
									</SimpleRowData>

									<SimpleRowData label="project url">
										{this.state.portfolio.url === null ? "-" : (
											<a href={this.state.portfolio.url}>{this.state.portfolio.url}</a>
										)}
									</SimpleRowData>

									<SimpleRowData label="description">
										{this.state.portfolio.longDescription}
									</SimpleRowData>

									<SimpleRowData label="workplace">
										{this.state.portfolio.workplace}
									</SimpleRowData>

									<SimpleRowData label="project role">
										{this.state.portfolio.projectRole}
									</SimpleRowData>

									<SimpleRowData label="role description">
										{this.state.portfolio.roleDescription.map((line, index) => (
											<div key={index}>{line}</div>
										))}
									</SimpleRowData>

									<SimpleRowData label="team members">
										{this.state.portfolio.members.map((member, index) => (
											<div key={index}>{member}</div>
										))}
									</SimpleRowData>
								</div>
							</div>
						</div>

						<div className="w-full bg-black py-10">
							<div className="container-body">
								<Heading title="Screenshots" align="center" className="text-white"/>

								<div className="portfolio-screenshots">
									{
										this.state.portfolio.screenshots.map((image, index) => (
											<img
												key={index}
												src={image}
												alt="screenshot"
											/>
										))
									}
								</div>
							</div>
						</div>
					</div>
					)
				}
			</div>
		);
	}
}