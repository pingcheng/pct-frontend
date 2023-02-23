import { Portfolio, PortfolioProps } from "./Portfolio";

describe("Portfolio", () => {
  const defaultProps: PortfolioProps = {
    name: "My Portfolio",
    coverImage: "https://example.com/cover.jpg",
    url: "https://example.com",
    shortDescription: "A short description",
    longDescription: "A long description",
    workplace: "My workplace",
    projectRole: "My role",
    roleDescription: ["Description 1", "Description 2"],
    members: ["Member 1", "Member 2"],
    screenshots: [
      "https://example.com/screenshot1.jpg",
      "https://example.com/screenshot2.jpg",
    ],
  };

  it("should create a portfolio instance", () => {
    const portfolio = new Portfolio("my-portfolio", defaultProps);

    expect(portfolio.slug).toBe("my-portfolio");
    expect(portfolio.name).toBe("My Portfolio");
    expect(portfolio.coverImage).toBe("https://example.com/cover.jpg");
    expect(portfolio.url).toBe("https://example.com");
    expect(portfolio.shortDescription).toBe("A short description");
    expect(portfolio.longDescription).toBe("A long description");
    expect(portfolio.workplace).toBe("My workplace");
    expect(portfolio.projectRole).toBe("My role");
    expect(portfolio.roleDescription).toEqual([
      "Description 1",
      "Description 2",
    ]);
    expect(portfolio.members).toEqual(["Member 1", "Member 2"]);
    expect(portfolio.screenshots).toEqual([
      "https://example.com/screenshot1.jpg",
      "https://example.com/screenshot2.jpg",
    ]);
  });

  it("should return true if portfolio has screenshots", () => {
    const portfolioWithScreenshots = new Portfolio("my-portfolio", {
      ...defaultProps,
      screenshots: [
        "https://example.com/screenshot1.jpg",
        "https://example.com/screenshot2.jpg",
      ],
    });

    expect(portfolioWithScreenshots.hasScreenshots).toBe(true);
  });

  it("should return false if portfolio does not have screenshots", () => {
    const portfolioWithoutScreenshots = new Portfolio("my-portfolio", {
      ...defaultProps,
      screenshots: [],
    });

    expect(portfolioWithoutScreenshots.hasScreenshots).toBe(false);
  });
});
