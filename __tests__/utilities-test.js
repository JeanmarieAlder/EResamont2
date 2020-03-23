import utilities from "../utils/utilities";

let data = [
  { title: "title 1", language: { id: 1 } },
  { title: "title 2", language: { id: 2 } }
];
let language = 2;

describe("utilities", () => {
  describe("findLanguageIndex", () => {
    it("finds correct index", () => {
      let result = utilities.findLanguageIndex(data, language);
      //should find correct index
      expect(result).toEqual(1);
    });

    it("changes -1 to 0 if index is not existent", () => {
      language = 5;
      let result = utilities.findLanguageIndex(data, language);
      //should find correct index
      expect(result).toEqual(0);
    });
  });
});
