// import { getFirstName } from "../utils/utility";

const { getFirstName, isEven, getLength } = require("../utils/utility");

describe("Demo Suite", () => {
  test("Demo test", () => {
    const firstName = getFirstName("Monica Geller");

    expect(firstName).toBe("Monica");
  });

  test("Is the number even - ", () => {
    const result = isEven(10);

    expect(result).toBeTruthy();
  });

  test("should return false when odd number is given", () => {
    const result = isEven(11);

    expect(result).not.toBeTruthy();
  });

  test("should return the length of an array", () => {
    const length = getLength([99, 98, 97, 96]);

    expect(length).toEqual(4);
  });
});
