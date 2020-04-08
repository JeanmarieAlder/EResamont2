import jsonFhirConverter from "../utils/jsonFhirConverter";

let lakeLouiseResultsValid = "[1,2,0,2,1,6]";
let oxygenResultsValid = "[1,2,3]";

let lakeLouiseJson = {
  authored: "someDate",
  item: [
    {
      item: [0, 1, 2, 3, 4, { answer: [{ valueInteger: 10 }] }],
    },
  ],
};
let oxygenJson = {
  authored: "someDate",
  item: [
    {
      item: [0, 1, { answer: [{ valueInteger: 0 }] }],
    },
  ],
};

describe("jsonFhirConverter", () => {
  describe("createLakeLouiseQuestionnaireResponse", () => {
    it("returns correct json fhir object with correct result data", () => {
      let result = jsonFhirConverter.createLakeLouiseQuestionnaireResponse(
        lakeLouiseResultsValid
      );
      expect(result).toBeDefined();
    });
  });
  describe("createOxygenQuestionnaireResponse", () => {
    it("returns correct json fhir object with correct result data", () => {
      let result = jsonFhirConverter.createOxygenQuestionnaireResponse(
        oxygenResultsValid
      );
      expect(result).toBeDefined();
    });
  });
  describe("jsonFhirToStringSimplified", () => {
    it("returns correct string for lake louise (id 95)", () => {
      let result = jsonFhirConverter.jsonFhirToStringSimplified(
        95,
        lakeLouiseJson
      );
      expect(result).toBeDefined();
      expect(result).toEqual("Date: someDate" + "\nScore: 10");
    });
    it("returns correct string for oxygen (id 100)", () => {
      let result = jsonFhirConverter.jsonFhirToStringSimplified(
        100,
        oxygenJson
      );
      expect(result).toBeDefined();
      expect(result).toEqual("Date: someDate" + "\nScore: 0");
    });
    it("returns empty string by default", () => {
      let result = jsonFhirConverter.jsonFhirToStringSimplified(
        999,
        oxygenJson
      );
      expect(result).toBeDefined();
      expect(result).toEqual("");
    });
  });
});
