import { updateSearchQueries } from "./UrlUtils";

describe("test updateSearchQueries function", () => {
  const testData: [
    Record<string, string>,
    Record<string, string | null>,
    Record<string, string>
  ][] = [
    [{ a: "a" }, { a: "b" }, { a: "b" }],
    [{ a: "a" }, { b: "b" }, { a: "a", b: "b" }],
    [{ a: "a", b: "a" }, { b: "b" }, { a: "a", b: "b" }],
    [{}, { a: "a" }, { a: "a" }],
    [{ a: "a" }, { a: null }, {}],
    [{ a: "a", b: "b" }, { a: null }, { b: "b" }],
  ];

  it.each(testData)(
    "when original params are `%s`, the new params are `%s`, the result is `%s`",
    (original, updates, expected) => {
      expect(updateSearchQueries(original, updates)).toStrictEqual(
        new URLSearchParams(expected)
      );
    }
  );
});
