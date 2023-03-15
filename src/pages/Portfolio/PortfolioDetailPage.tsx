import React, { useEffect, useState } from "react";
import { Portfolios } from "./data";
import { Heading } from "components/Heading/Heading";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PortfolioCard } from "components/Portfolio/PortfolioCard";
import { SimpleRowData } from "components/Rows/SimpleRowData";
import NotFoundPage from "../Errors/NotFoundPage";
import PropTypes, { InferProps } from "prop-types";
import { Portfolio } from "models/portfolio/Portfolio";

export default function PortfolioDetailPage(
  props: InferProps<typeof PortfolioDetailPage.propTypes>
): JSX.Element {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    setPortfolio(getPortfolioData(props.match.params.slug));

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
                  {portfolio.roleDescription.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </SimpleRowData>

                <SimpleRowData label="team members">
                  {portfolio.members.map((member) => (
                    <div key={member}>{member}</div>
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
                    {portfolio.screenshots.map((image) => (
                      <img key={image} src={image} alt="screenshot" />
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

function getPortfolioData(slug: string): Portfolio | null {
  for (const portfolio of Portfolios) {
    if (portfolio.slug === slug) {
      return portfolio;
    }
  }

  return null;
}

PortfolioDetailPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
