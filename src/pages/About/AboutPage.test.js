import each from "jest-each"
import {formatDate} from "./AboutPage";

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
    })
});