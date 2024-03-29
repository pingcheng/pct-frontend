import React, { useEffect } from "react";
import { FiGithub } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { FaAsterisk, FaRegSmileWink } from "react-icons/fa";
import { setThemeColorMeta } from "utils/PageUtils";
import { profile, urls } from "../../config/profile";

export default function IndexPage(): JSX.Element {
  useEffect(() => {
    document.title = profile.name;
    setThemeColorMeta("rgb(255, 255, 255)");
  });

  return (
    <div
      className="h-screen flex flex-col items-center justify-center mx-auto"
      style={{
        maxWidth: "90%",
        width: "500px",
      }}
    >
      {/* Image */}
      <img
        className="rounded-full mb-10"
        src="https://avatars0.githubusercontent.com/u/8447539?s=460&v=4"
        alt="Ping Cheng"
        width="192"
      />

      {/* Person brief */}
      <div className="font-code text-gray-400">
        <h1 className="mb-8 text-base">
          Hi! It is <span className="text-black">{profile.name}</span> here.
        </h1>
        <p className="mb-8">
          I am a high passionate{" "}
          <span className="text-black">web developer</span>, enjoy the latest
          techs and bring them into reality.
        </p>
        <p className="mb-8">
          Focusing on{" "}
          <span className="text-black">
            Node/TS/JS, Java, PHP, Linux, Server management
          </span>
          , etc...
        </p>
      </div>

      {/* Social links */}
      <div className="flex flex-wrap content-around text-lg justify-center">
        <a className="social-link mr-4 p-2" href={urls.githubUrl}>
          <FiGithub /> Github
        </a>
        {/*<NavLink to="/posts" className="social-link mr-4 p-2">*/}
        {/*  <RiArticleLine /> Posts*/}
        {/*</NavLink>*/}
        <NavLink to="/portfolio" className="social-link mr-4 p-2">
          <FaAsterisk /> Portfolio
        </NavLink>
        <NavLink to="/about" className="social-link p-2">
          <FaRegSmileWink /> About me
        </NavLink>
      </div>
    </div>
  );
}
