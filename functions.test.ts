const { shuffleArray } = require("./utils");

const testArray = [
  {
    id: 0,
    name: "Robot 1",
  },
  {
    id: 1,
    name: "Robot 2",
  },
  {
    id: 2,
    name: "Robot 3",
  },
  {
    id: 3,
    name: "Robot 4",
  },
  {
    id: 4,
    name: "Robot 5",
  },
  {
    id: 5,
    name: "Robot 6",
  },
  {
    id: 6,
    name: "Robot 7",
  },
];

describe("shuffleArray should", () => {
  // Test 1
  test("Returned array is the same length as the array sent in as an argument", () => {
    expect(shuffleArray(testArray).length).toEqual(testArray.length);
  });

  // Test 2

  let result = shuffleArray(testArray);
  test("All array items from the testArray are in the returned array", () => {
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Robot 1" }),
        expect.objectContaining({ name: "Robot 2" }),
        expect.objectContaining({ name: "Robot 3" }),
        expect.objectContaining({ name: "Robot 4" }),
        expect.objectContaining({ name: "Robot 5" }),
        expect.objectContaining({ name: "Robot 6" }),
        expect.objectContaining({ name: "Robot 7" }),
      ])
    );
  });
});
