/**
 * Set the theme color meta with a specific color.
 * @param color
 */
export function setThemeColorMeta(color) {
    const colorMeta = document.querySelector("meta[name=theme-color]");
    if (colorMeta === null) {
        return;
    }

    colorMeta.content = color;
}

/**
 * Set the theme color meta by the background color of the navigation bar.
 */
export function setThemeColorMatchNavBar() {
    const navBar = document.querySelector("nav");
    if (navBar === null) {
        return;
    }

    const computedStyle = window.getComputedStyle(navBar);
    if (computedStyle === null) {
        return;
    }

    setThemeColorMeta(computedStyle.backgroundColor);
}