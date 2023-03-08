import React, { useEffect } from "react";
import { Heading } from "../../components/Heading/Heading";
import { SimpleRowData } from "../../components/Rows/SimpleRowData";
import { GrCode } from "react-icons/gr";
import { IoLogoJavascript } from "react-icons/io5";
import { FaCloud } from "react-icons/fa";
import {
  backendStack,
  devOpsStack,
  frontendStack,
  WorkExperience,
  workExperiences,
} from "./data";
import { profile, urls } from "data/profile";

export const PAGE_TITLE = "About me";

export default function AboutPage(): JSX.Element {
  useEffect(() => {
    document.title = PAGE_TITLE;
  });

  return (
    <div className="container-body">
      <Heading title="About me" align="center" />
      <img
        className="rounded-full mb-10 mx-auto"
        src={profile.avatarUrl}
        alt={profile.name}
        width="128"
      />

      <div className="flex flex-col">
        <SimpleRowData label="github">
          <a href={urls.githubUrl}>{urls.githubUrl}</a>
        </SimpleRowData>

        <SimpleRowData label="linkedin">
          <a className="break-all" href={urls.linkedInUrl}>
            {urls.linkedInUrl}
          </a>
        </SimpleRowData>

        <SimpleRowData label="email">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </SimpleRowData>

        <SimpleRowData label="stack about this site">
          <a
            className="break-all"
            href={urls.stackShareUrl}
            target="_blank"
            rel="noreferrer"
          >
            {urls.stackShareUrl}
          </a>
        </SimpleRowData>

        <SimpleRowData label="location">
          {profile.city}, {profile.country}
        </SimpleRowData>

        <SimpleRowData label="bio">
          <p>
            I am a pure Chinese, currently live in Australia with my wife and
            son ;)
          </p>
          <p>
            Enjoy coding and bring ideas into real life. After a few years on
            development and tech works, I might decide to put more my focus on
            DevOps.
          </p>
        </SimpleRowData>

        <SimpleRowData label="skills">
          <div className="mb-2">
            <GrCode /> Backend
            <div className="text-gray-400 text-xs">
              {backendStack.map((text) => (
                <div key={text}>{text}</div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <IoLogoJavascript /> Frontend
            <div className="text-gray-400 text-xs">
              {frontendStack.map((text) => (
                <div key={text}>{text}</div>
              ))}
            </div>
          </div>

          <div>
            <FaCloud /> Cloud & DevOps
            <div className="text-gray-400 text-xs">
              {devOpsStack.map((text) => (
                <div key={text}>{text}</div>
              ))}
            </div>
          </div>
        </SimpleRowData>

        <SimpleRowData label="work">
          {renderWorkExperience(workExperiences)}
        </SimpleRowData>
      </div>
    </div>
  );
}

function renderWorkExperience(experiences: WorkExperience[] = []) {
  return experiences.map((experience) => {
    const endDate = experience.endDate ?? new Date();
    const endDateString =
      experience.endDate === null ? "Present" : formatDate(endDate);
    const keyName = `${experience.company}/${
      experience.position
    }/${experience.startDate.toISOString()}`;

    return (
      <div className="mb-2" key={keyName}>
        <div>{experience.company}</div>
        <div className="text-gray-400 text-xs">
          <span className="text-black">{experience.position}</span> /{" "}
          {formatDate(experience.startDate)} - {endDateString} (
          {calculateWorkingLength(experience.startDate, endDate)})<br />
          {experience.description.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
    );
  });
}

export function formatDate(date: Date): string {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${month[date.getMonth()]} ${date.getFullYear()}`;
}

export function calculateWorkingLength(startDate: Date, endDate: Date): string {
  const startedMonth = startDate.getFullYear() * 12 + startDate.getMonth();
  const endedMonth = endDate.getFullYear() * 12 + endDate.getMonth();
  const monthDiff = endedMonth - startedMonth;

  const years = Math.floor(monthDiff / 12);
  const months = monthDiff % 12;
  const parts = [];

  if (years > 0) {
    let yearString = years + " ";
    yearString += years === 1 ? "year" : "years";
    parts.push(yearString);
  }

  parts.push(`${months} ${months === 1 ? "month" : "months"}`);

  return parts.join(" ");
}
