import React from "react";
import each from "jest-each";
import AboutPage, {
  calculateWorkingLength,
  formatDate,
  PAGE_TITLE,
} from "./AboutPage";
import { render, screen } from "@testing-library/react";
import { profile, urls } from "../../data/profile";

describe("test <AboutPage>", () => {
  beforeEach(() => {
    render(<AboutPage />);
  });

  it("Should display page title", () => {
    const titleElement = screen.getByText(PAGE_TITLE);
    expect(titleElement).toBeInTheDocument();
  });

  it("should display my email", function () {
    const emailElement = screen.getByText(profile.email);
    expect(emailElement).toBeInTheDocument();
  });

  it("should display my github", function () {
    const githubUrlElement = screen.getByText(urls.githubUrl);
    expect(githubUrlElement).toBeInTheDocument();
  });
});

describe("formatDate should return correct data", () => {
  each([
    [0, "Jan"],
    [1, "Feb"],
    [2, "Mar"],
    [3, "Apr"],
    [4, "May"],
    [5, "Jun"],
    [6, "Jul"],
    [7, "Aug"],
    [8, "Sept"],
    [9, "Oct"],
    [10, "Nov"],
    [11, "Dec"],
  ]).it("when format date month of '%d'", (month, expected) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(month);
    const dateString = formatDate(date);
    const dateParts = dateString.split(" ");
    expect(dateParts.length).toBe(2);
    expect(dateParts[0]).toBe(expected);
    expect(dateParts[1]).toBe(date.getFullYear().toString());
  });
});

describe("calculateWorkingLength should return correct length", () => {
  each([
    [new Date(2021, 1), new Date(2021, 1), "0 months"],
    [new Date(2021, 1), new Date(2021, 2), "1 month"],
    [new Date(2021, 1), new Date(2021, 10), "9 months"],
    [new Date(2021, 1), new Date(2022, 1), "1 year 0 months"],
    [new Date(2021, 1), new Date(2022, 2), "1 year 1 month"],
    [new Date(2021, 1), new Date(2022, 3), "1 year 2 months"],
    [new Date(2021, 1), new Date(2023, 1), "2 years 0 months"],
    [new Date(2021, 1), new Date(2023, 2), "2 years 1 month"],
    [new Date(2021, 1), new Date(2023, 3), "2 years 2 months"],
  ]).it("The length between %s and %s is '%s'", (start, end, expected) => {
    expect(calculateWorkingLength(start, end)).toBe(expected);
  });
});
