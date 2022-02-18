import { render, screen, waitFor } from "@testing-library/react";
import { NavigationMenu } from "./NavigationMenu";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("test <NavigationMenu>", () => {
  it("should render correctly", function () {
    const { container } = render(
      <MemoryRouter>
        <NavigationMenu />
      </MemoryRouter>
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("should render mobile view toggle button", function () {
    render(
      <MemoryRouter>
        <NavigationMenu />
      </MemoryRouter>
    );
    expect(screen.getByRole("mobile-toggle")).toBeInTheDocument();
  });

  it("mobile nav menu should be hidden by default", function () {
    render(
      <MemoryRouter>
        <NavigationMenu />
      </MemoryRouter>
    );
    expect(screen.getByRole("mobile-nav-menu")).toHaveClass("hidden");
  });

  it("click mobile nav toggle button to display mobile nav menu", async function () {
    render(
      <MemoryRouter>
        <NavigationMenu />
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole("mobile-toggle"));

    await waitFor(() => {
      expect(screen.getByRole("mobile-nav-menu")).toHaveClass("block");
    });
  });

  it("click mobile nav toggle button again hide mobile nav menu", async function () {
    render(
      <MemoryRouter>
        <NavigationMenu />
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole("mobile-toggle"));
    userEvent.click(screen.getByRole("mobile-toggle"));

    await waitFor(() => {
      expect(screen.getByRole("mobile-nav-menu")).toHaveClass("hidden");
    });
  });

  it.each(["Home", "Posts", "Portfolio", "About me"])(
    "navigation bar should have desktop nav item '%s'",
    (name) => {
      render(
        <MemoryRouter>
          <NavigationMenu />
        </MemoryRouter>
      );
      expect(
        screen.getByText(name, {
          selector: ".desktop-nav-item",
        })
      ).toBeInTheDocument();
    }
  );

  it.each(["Home", "Posts", "Portfolio", "About me"])(
    "navigation bar should have mobile nav item '%s'",
    (name) => {
      render(
        <MemoryRouter>
          <NavigationMenu />
        </MemoryRouter>
      );
      expect(
        screen.getByText(name, {
          selector: ".mobile-nav-item",
        })
      ).toBeInTheDocument();
    }
  );
});
