import { setThemeColorMatchNavBar, setThemeColorMeta } from "./PageUtils";

describe("test setThemeColorMeta", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <html lang="en">
        <head>
          <title>Hello</title>
          <meta name="theme-color" content="">
        </head>
      </html>
    `;
  });

  it("should update theme-color meta content", function () {
    const color = "#ffffff";
    setThemeColorMeta(color);

    const meta = document.querySelector("meta[name=theme-color]");
    expect(meta?.getAttribute("content")).toBe(color);
  });
});

describe("test setThemeColorMatchNavBar", () => {
  const navBarColor = "#ffffff";
  const navBarColorRgb = "rgb(255, 255, 255)";

  beforeEach(() => {
    document.body.innerHTML = `
      <html lang="en">
        <head>
          <title>Hello</title>
          <meta name="theme-color" content="">
        </head>
        <body>
          <nav style="background: ${navBarColor}"></nav>
        </body>
      </html>
    `;
  });

  it("should update meta theme color to nav background color", () => {
    setThemeColorMatchNavBar();
    const meta = document.querySelector("meta[name=theme-color]");
    expect(meta?.getAttribute("content")).toBe(navBarColorRgb);
  });

  it("should not update meta theme color when there is no nav", () => {
    document.querySelector("nav")?.remove();

    setThemeColorMatchNavBar();
    const meta = document.querySelector("meta[name=theme-color]");
    expect(meta?.getAttribute("content")).toBe("");
  });
});
