import React, { Component } from "react";
import { Heading } from "../../components/Heading/Heading";
import { SimpleRowData } from "../../components/Rows/SimpleRowData";
import { GrCode } from "react-icons/gr";
import { IoLogoJavascript } from "react-icons/io5";
import { FaCloud } from "react-icons/fa";

export default class AboutPage extends Component {

	render() {
		return (
			<div>

				<Heading title="About me" align="center"/>

				<img
					className="rounded-full mb-10 mx-auto"
					src="https://avatars0.githubusercontent.com/u/8447539?s=460&v=4"
					alt="Ping Cheng"
				/>

				<div className="flex flex-col">
					<SimpleRowData label="github">
						<a href="https://github.com/pingcheng">https://github.com/pingcheng</a>
					</SimpleRowData>

					<SimpleRowData label="linkedin">
						<a href="https://www.linkedin.com/in/ping-cheng-5a47b484/">https://www.linkedin.com/in/ping-cheng-5a47b484/</a>
					</SimpleRowData>

					<SimpleRowData label="email">
						<a href="mailto:ping.che@hotmail.com">ping.che@hotmail.com</a>
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
						<div className="mb-2">
							<strong>AroFlo</strong>
							<div className="text-gray-400 text-xs">
								<span className="text-black">Web Developer</span> / Aug 2019 - Present<br/>
								Working as a full stack developer. Delivering new features to AroFlo Platform which is an industry leading product in Australia, my current main involves in the platform include but not limited to project management, quotes, invoices, payment integration areas.
							</div>
						</div>

						<div className="mb-2">
							<strong>PTEPLUS</strong>
							<div className="text-gray-400 text-xs">
								<span className="text-black">Development Lead</span> / Jan 2018 - May 2019<br/>
								Work with the dev team on two main products. Design and implement IT architecture on the clouding computing platforms (AWS and Aliyun). Deliver stable, rapid responsible and reliable web applications to product's users.
							</div>
						</div>

						<div>
							<strong>PTEPLUS</strong>
							<div className="text-gray-400 text-xs">
								<span className="text-black">Full Stack PHP Developer</span> /  Oct 2016 - Jan 2018<br/>
								One of the key contributors to the start-up company, and participated in almost every stage of product design, implement and testing. Took responsibilities on full solutions to the technical side such as coding and servers’ setup.
							</div>
						</div>
					</SimpleRowData>
				</div>
			</div>
		)
	}

}