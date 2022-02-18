import React from "react";

export type PortfolioCardProps = {
  name: string;
  description: string;
  image: string;
};

export function PortfolioCard({
  name,
  description,
  image,
}: PortfolioCardProps): JSX.Element {
  return (
    <div
      className="portfolio-card"
      role="portfolio-card"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div
        className="absolute bottom-0 p-2 text-gray-200"
        style={{
          zIndex: 10,
        }}
      >
        <div className="text-sm font-bold">{name}</div>
        <div className="text-xs">{description}</div>
      </div>
    </div>
  );
}
