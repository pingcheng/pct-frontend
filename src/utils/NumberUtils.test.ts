import { integerOrNull } from "./NumberUtils";

describe("test integerOrNull function", () => {
  const testData: [string | number, number | null][] = [
    [0, 0],
    ["0", 0],
    ["000", 0],
    ["1", 1],
    ["-1", -1],
    [1, 1],
    [-1, -1],
    [10, 10],
    [+1, 1],
    ["+1", null],
    ["01", 1],
    [1.5, null],
    ["1.5", null],
    ["a", null],
    ["1.1.1", null],
    ["1e1", null],
    ["0x10", null],
  ];

  it.each(testData)(
    "when value is `%s`, the expected result is `%d`",
    (value, expected) => {
      expect(integerOrNull(value)).toBe(expected);
    }
  );
});
