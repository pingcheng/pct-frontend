import { render, screen } from "@testing-library/react";
import { Heading } from "./Heading";

describe("test <Heading />", () => {
  const props = {
    title: "Title",
    subTitle: "Sub-title",
  };

  it("should render correctly", () => {
    const { container } = render(<Heading {...props} />);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("should render the title text", () => {
    render(<Heading {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it("should render the sub title text", () => {
    render(<Heading {...props} />);
    expect(screen.getByText(props.subTitle)).toBeInTheDocument();
  });

  it("should apply align when specific align mode", () => {
    render(<Heading {...props} align="right" />);
    expect(screen.getByRole("heading")).toHaveStyle({
      textAlign: "right",
    });
  });

  it("should apply extra class name when specific class name", () => {
    render(<Heading {...props} className="extra-class-name" />);
    expect(screen.getByRole("heading")).toHaveClass("extra-class-name");
  });
});
