import React, { Component } from "react";
import { Heading } from "../../components/Heading/Heading";
import { SimpleRowData } from "../../components/Rows/SimpleRowData";
import { GrCode } from "react-icons/gr";
import { IoLogoJavascript } from "react-icons/io5";
import { FaCloud } from "react-icons/fa";
import { backendStack, devOpsStack, frontendStack, workExperiences, profile } from "./data";

export default class AboutPage extends Component {

	componentDidMount() {
		document.title = "About me";
	}

	render() {
		return (
			<div className="container-body">

				<Heading title="About me" align="center"/>

				<img
					className="rounded-full mb-10 mx-auto"
					src="https://avatars0.githubusercontent.com/u/8447539?s=460&v=4"
					alt="Ping Cheng"
					width="128"
				/>

				<div className="flex flex-col">
					<SimpleRowData label="github">
						<a href={ profile.githubUrl }>{ profile.githubUrl }</a>
					</SimpleRowData>

					<SimpleRowData label="linkedin">
						<a className="break-all" href={ profile.linkedInUrl }>{ profile.linkedInUrl }</a>
					</SimpleRowData>

					<SimpleRowData label="email">
						<a href={ `mailto:${profile.email}` }>{ profile.email }</a>
					</SimpleRowData>

					<SimpleRowData label="stack about this site">
						<a className="break-all" href={ profile.stackShareUrl } target="_blank" rel="noreferrer">{ profile.stackShareUrl }</a>
					</SimpleRowData>

					<SimpleRowData label="location">Melbourne, Australia</SimpleRowData>

					<SimpleRowData label="bio">
						<p>I am a pure Chinese, currently live in Australia with my wife and son ;)</p>
						<p>Enjoy coding and bring ideas into real life. After a few years on development and tech works, I might decide to put more my focus on DevOps.</p>
					</SimpleRowData>

					<SimpleRowData label="skills">
						<div className="mb-2">
							<GrCode /> Backend
							<div className="text-gray-400 text-xs">
								{ backendStack.map(text => <div>{ text }</div>) }
							</div>
						</div>

						<div className="mb-2">
							<IoLogoJavascript /> Frontend
							<div className="text-gray-400 text-xs">
								{ frontendStack.map(text => <div>{ text }</div>) }
							</div>
						</div>

						<div>
							<FaCloud /> Cloud & DevOps
							<div className="text-gray-400 text-xs">
								{ devOpsStack.map(text => <div>{ text }</div>) }
							</div>
						</div>
					</SimpleRowData>

					<SimpleRowData label="work">
						{ this.renderWorkExperience(workExperiences) }
					</SimpleRowData>
				</div>
			</div>
		)
	}

	renderWorkExperience(experiences = []) {
		return experiences.map(experience => {

			const endDate = experience.endDate ?? new Date();
			const endDateString = experience.endDate === null ? 'Present' : this.formatDate(endDate);

			return (
				<div className="mb-2">
					<strong>{experience.company}</strong>
					<div className="text-gray-400 text-xs">
						<span className="text-black">{experience.position}</span> / { this.formatDate(experience.startDate) } - { endDateString }<br/>
						{experience.description.map(text => <p>{text}</p>)}
					</div>
				</div>
			);
		});
	}

	formatDate(date) {

		const month = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sept',
			'Oct',
			'Nov',
			'Dev'
		];

		return `${month[date.getMonth()]} ${date.getFullYear()}`;
	}
}