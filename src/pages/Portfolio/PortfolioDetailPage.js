import React, { useEffect, useState } from "react";
import { Portfolios } from "./data";
import { Heading } from "../../components/Heading/Heading";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PortfolioCard } from "../../components/Portfolio/PortfolioCard";
import { SimpleRowData } from "../../components/Rows/SimpleRowData";
import NotFoundPage from "../Errors/NotFoundPage";
import PropTypes from "prop-types";

export default function PortfolioDetailPage(props) {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(async () => {
    await setPortfolio(getPortfolioData(props.match.params.slug));

    if (portfolio !== null) {
      document.title = `Portfolio - ${portfolio.name || "Not Found"}`;
    }
  });

  return (
    <div>
      {portfolio === null ? (
        <NotFoundPage />
      ) : (
        <div>
          <div className="container-body">
            <div>
              <Link to="/portfolio">
                <IoMdArrowRoundBack /> Go back
              </Link>
            </div>

            <Heading title={portfolio.name} align="center" />

            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 flex justify-center portfolios-center">
                <PortfolioCard
                  name={portfolio.name}
                  description={portfolio.shortDescription}
                  image={portfolio.coverImage}
                />
              </div>

              <div className="w-full md:w-1/2">
                <SimpleRowData label="project">{portfolio.name}</SimpleRowData>

                <SimpleRowData label="project url">
                  {portfolio.url === null ? (
                    "-"
                  ) : (
                    <a href={portfolio.url}>{portfolio.url}</a>
                  )}
                </SimpleRowData>

                <SimpleRowData label="description">
                  {portfolio.longDescription}
                </SimpleRowData>

                <SimpleRowData label="workplace">
                  {portfolio.workplace}
                </SimpleRowData>

                <SimpleRowData label="project role">
                  {portfolio.projectRole}
                </SimpleRowData>

                <SimpleRowData label="role description">
                  {portfolio.roleDescription.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </SimpleRowData>

                <SimpleRowData label="team members">
                  {portfolio.members.map((member, index) => (
                    <div key={index}>{member}</div>
                  ))}
                </SimpleRowData>
              </div>
            </div>
          </div>

          {
            // Screenshots section
            portfolio.hasScreenshots ? (
              <div className="w-full bg-black py-10">
                <div className="container-body">
                  <Heading
                    title="Screenshots"
                    align="center"
                    className="text-white"
                  />

                  <div className="portfolio-screenshots">
                    {portfolio.screenshots.map((image, index) => (
                      <img key={index} src={image} alt="screenshot" />
                    ))}
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
      )}
    </div>
  );
}

function getPortfolioData(slug) {
  for (let portfolio of Portfolios) {
    if (portfolio.slug === slug) {
      return portfolio;
    }
  }

  return null;
}

PortfolioDetailPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};
