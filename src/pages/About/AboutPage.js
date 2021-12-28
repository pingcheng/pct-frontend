import React, { Component } from "react";
import { Heading } from "../../components/Heading/Heading";
import { SimpleRowData } from "../../components/Rows/SimpleRowData";
import { GrCode } from "react-icons/gr";
import { IoLogoJavascript } from "react-icons/io5";
import { FaCloud } from "react-icons/fa";
import { workExperiences } from "./data";

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
						<a href="https://github.com/pingcheng">https://github.com/pingcheng</a>
					</SimpleRowData>

					<SimpleRowData label="linkedin">
						<a className="break-all" href="https://www.linkedin.com/in/ping-cheng-5a47b484/">https://www.linkedin.com/in/ping-cheng-5a47b484/</a>
					</SimpleRowData>

					<SimpleRowData label="email">
						<a href="mailto:ping.che@hotmail.com">ping.che@hotmail.com</a>
					</SimpleRowData>

					<SimpleRowData label="stack about this site">
						<a className="break-all" href="https://stackshare.io/pingcheng/pct" target="_blank" rel="noreferrer">https://stackshare.io/pingcheng/pct</a>
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
								PHP, Laravel, Moodle<br/>
								Composer package development<br/>
								Message Queue, MVC<br/>
								MySQL, MSSQL, Redis<br/>
								Linux management<br/>
								Unit Testing / TDD<br/>
								Payment Integration<br/>
								Python, ColdFusion, Java
							</div>
						</div>

						<div className="mb-2">
							<IoLogoJavascript /> Frontend
							<div className="text-gray-400 text-xs">
								HTML<br/>
								JavaScript, Vue, React, jQuery<br/>
								CSS, SASS, TailwindCSS, Bootstrap<br/>
								Webpack
							</div>
						</div>

						<div>
							<FaCloud /> Cloud & DevOps
							<div className="text-gray-400 text-xs">
								AWS, Aliyun<br/>
								Infrastructure planning and implementing<br/>
								Horizontal scaling<br/>
								Docker, ECS<br/>
								Cloud data and files managements<br/>
								CI/CD, GitlabCI, CircleCI
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