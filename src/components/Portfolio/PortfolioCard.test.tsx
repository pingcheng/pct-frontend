import { render, screen } from "@testing-library/react";
import { PortfolioCard } from "./PortfolioCard";

describe("test <PortfolioCard>", () => {
  const props = {
    name: "name",
    description: "description",
    image: "http://sampleUrl",
  };

  it("should render correctly", function () {
    const { container } = render(<PortfolioCard {...props} />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("should render card title", function () {
    render(<PortfolioCard {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
  });

  it("should render card description", function () {
    render(<PortfolioCard {...props} />);
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  it("should render card image", function () {
    render(<PortfolioCard {...props} />);
    expect(screen.getByRole("portfolio-card")).toHaveStyle({
      backgroundImage: `url(${props.image})`,
    });
  });
});
