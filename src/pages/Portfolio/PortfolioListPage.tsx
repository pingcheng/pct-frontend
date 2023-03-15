import React, { useEffect } from "react";
import { Heading } from "components/Heading/Heading";
import { Portfolios } from "../../config/portfolio";
import { Link } from "react-router-dom";
import { PortfolioCard } from "components/Portfolio/PortfolioCard";

export default function PortfolioListPage(): JSX.Element {
  useEffect(() => {
    document.title = "Portfolio";
  });

  return (
    <div className="container-body">
      <Heading title="Portfolio" align="center" />

      <div className="flex flex-wrap justify-around mt-4">
        {Portfolios.map((item) => (
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
