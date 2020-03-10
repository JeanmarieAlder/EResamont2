const eresamontURL = "http://vlheresamont2.hevs.ch/api/v1";

export class requestPage {
  static async getAllPages() {
    console.log("Fetching online data");
    try {
      let response = await fetch(`${eresamontURL}/pages`, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async getPage(id) {
    try {
      let response = await fetch(`${eresamontURL}/pages/` + id, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
}

export default requestPage;

// Page id cheatsheet
// 86 Health Assessment works
// 88 Mountain Meds Consultation works
// 126 Questionnaires some button in Italian
// 87 Toolbox some button in Italian
// 89 About empty button bug
// Medical Guide works
