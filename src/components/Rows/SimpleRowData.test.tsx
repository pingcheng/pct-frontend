import { render, screen } from "@testing-library/react";
import { SimpleRowData, SimpleRowDataProps } from "./SimpleRowData";

describe("test <SimpleRowData />", () => {
  const props = {
    label: "Label",
  } as const;

  const renderComponent = (props: SimpleRowDataProps) =>
    render(<SimpleRowData {...props} />);

  it("should render correctly", () => {
    const { container } = renderComponent(props);
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("should render label name", () => {
    renderComponent(props);
    expect(screen.getByText("LABEL")).toBeInTheDocument();
  });

  it("should render children content", () => {
    renderComponent({
      ...props,
      children: "Children Text",
    });
    expect(screen.getByText("Children Text")).toBeInTheDocument();
  });
});
