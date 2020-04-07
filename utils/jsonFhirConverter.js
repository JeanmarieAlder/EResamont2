export default class jsonFhirConverter {
  static createLakeLouiseQuestionnaireResponse(responses) {
    let responsesObject = JSON.parse(responses);
    return {
      resourceType: "QuestionnaireResponse",
      status: "completed",
      authored: new Date(),
      sentToServer: false,
      item: [
        {
          linkId: "1",
          text: "Lake Louise Quizz",

          item: [
            {
              linkId: "1.1",
              text: "Headache",
              answer: [
                {
                  valueInteger: responsesObject[0]
                }
              ]
            },
            {
              linkId: "1.2",
              text: "Gastrointestinal symptoms",
              answer: [
                {
                  valueInteger: responsesObject[1]
                }
              ]
            },
            {
              linkId: "1.3",
              text: "Fatigue and or weakness",
              answer: [
                {
                  valueInteger: responsesObject[2]
                }
              ]
            },
            {
              linkId: "1.4",
              text: "Dizziness and or light-headedness",
              answer: [
                {
                  valueInteger: responsesObject[3]
                }
              ]
            },
            {
              linkId: "1.5",
              text: "Difficulty sleeping",
              answer: [
                {
                  valueInteger: responsesObject[4]
                }
              ]
            },
            {
              linkId: "1.6",
              text: "Total score",
              answer: [
                {
                  valueInteger: responsesObject[5]
                }
              ]
            }
          ]
        }
      ]
    };
  }
  static createOxygenQuestionnaireResponse(responses) {
    let responsesObject = JSON.parse(responses);
    return {
      resourceType: "QuestionnaireResponse",
      status: "completed",
      authored: new Date(),
      sentToServer: false,
      item: [
        {
          linkId: "1",
          text: "Oxygen Saturation Algorithm",

          item: [
            {
              linkId: "1.1",
              text: "Altitude (meters)",
              answer: [
                {
                  valueInteger: responsesObject[0]
                }
              ]
            },
            {
              linkId: "1.2",
              text: "Saturation (%)",
              answer: [
                {
                  valueInteger: responsesObject[1]
                }
              ]
            },
            {
              linkId: "1.3",
              text: "Result",
              answer: [
                {
                  valueInteger: responsesObject[2]
                }
              ]
            }
          ]
        }
      ]
    };
  }
  static jsonFhirToStringSimplified(idQuizz, jsonFile) {
    switch (idQuizz) {
      case 95:
        return (
          "Date: " +
          jsonFile.authored +
          "\nScore: " +
          jsonFile.item[0].item[5].answer[0].valueInteger
        );
      case 100:
        return (
          "Date: " +
          jsonFile.authored +
          "\nScore: " +
          jsonFile.item[0].item[2].answer[0].valueInteger
        );
      default:
        return "";
    }
  }
}
