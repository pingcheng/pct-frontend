import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CategoryBlock, { CategoryBlockProps } from "./CategoryBlock";
import { PostApi } from "api/PostApi/PostApi";

jest.mock("api/PostApi/PostApi");

const mockedPostApi = PostApi as jest.Mocked<typeof PostApi>;

const mockCategories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
];

describe("CategoryBlock", () => {
  const defaultProps: CategoryBlockProps = {
    onCategorySelected: jest.fn(),
  };

  beforeEach(() => {
    mockedPostApi.listPostCategories.mockResolvedValue(mockCategories);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component", async () => {
    render(<CategoryBlock {...defaultProps} />);

    await waitFor(() =>
      expect(mockedPostApi.listPostCategories).toHaveBeenCalledTimes(1)
    );

    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });

  it("should select a category when clicked", async () => {
    const onCategorySelected = jest.fn();

    render(
      <CategoryBlock
        {...defaultProps}
        onCategorySelected={onCategorySelected}
      />
    );

    await waitFor(() =>
      expect(mockedPostApi.listPostCategories).toHaveBeenCalledTimes(1)
    );

    fireEvent.click(screen.getByText("Category 1"));

    expect(onCategorySelected).toHaveBeenCalledTimes(1);
    expect(onCategorySelected).toHaveBeenCalledWith(mockCategories[0]);
  });

  it("should select a default category if specified", async () => {
    const onCategorySelected = jest.fn();
    const defaultCategoryId = mockCategories[1].id;

    render(
      <CategoryBlock
        {...defaultProps}
        onCategorySelected={onCategorySelected}
        defaultCategoryId={defaultCategoryId}
      />
    );

    await waitFor(() =>
      expect(mockedPostApi.listPostCategories).toHaveBeenCalledTimes(1)
    );

    expect(onCategorySelected).toHaveBeenCalledTimes(1);
    expect(onCategorySelected).toHaveBeenCalledWith(mockCategories[1]);
  });
});
