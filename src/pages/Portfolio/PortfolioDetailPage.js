import React, { Component } from "react";
import { Portfolio } from "./data";
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
			item: this.getPortfolioData(this.props.match.params.slug)
		};
	}

	getPortfolioData = (slug) => {
		for (let item of Portfolio) {
			if (item.slug === slug) {
				return item;
			}
		}

		return null;
	};

	render() {
		return (
			<div>
				{
					this.state.item === null ? (
						<NotFoundPage />
					) : (
						<div>
						<div className="container-body">
							<div>
								<Link to="/portfolio">
									<IoMdArrowRoundBack/> Go back
								</Link>
							</div>

							<Heading title={this.state.item.name} align="center"/>

							<div className="flex flex-wrap">
								<div className="w-full md:w-1/2 flex justify-center items-center">
									<PortfolioCard name={this.state.item.name}
												   description={this.state.item.shortDescription}
												   image={this.state.item.coverImage}/>
								</div>

								<div className="w-full md:w-1/2">
									<SimpleRowData label="project">
										{this.state.item.name}
									</SimpleRowData>

									<SimpleRowData label="project url">
										{this.state.item.url === null ? "-" : (
											<a href={this.state.item.url}>{this.state.item.url}</a>
										)}
									</SimpleRowData>

									<SimpleRowData label="description">
										{this.state.item.longDescription}
									</SimpleRowData>

									<SimpleRowData label="workplace">
										{this.state.item.workplace}
									</SimpleRowData>

									<SimpleRowData label="project role">
										{this.state.item.projectRole}
									</SimpleRowData>

									<SimpleRowData label="role description">
										{this.state.item.roleDescription.map((line, index) => (
											<div key={index}>{line}</div>
										))}
									</SimpleRowData>

									<SimpleRowData label="team members">
										{this.state.item.members.map((member, index) => (
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
										this.state.item.screenshots.map((image, index) => (
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