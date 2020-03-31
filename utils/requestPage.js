import { AsyncStorage } from "react-native";
import NetInfo from "@react-native-community/netinfo";
const eresamontURL = "http://vlheresamont2.hevs.ch/api/v1";

export default class requestPage {
  static async checkConnection() {
    console.log("Checking online connection");
    let info = await NetInfo.fetch();
    if (info) {
      return info;
    }
  }
  static async fetchAllPages() {
    console.log("=====================================");
    console.log("Fetching online data");
    this.checkConnection();
    try {
      let response = await fetch(`${eresamontURL}/pages`, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
      let timestamp = new Date().getTime();
      console.log("Online data fetched at UNIX: " + timestamp);
      await AsyncStorage.setItem("updateTimestamp", timestamp.toString()); //Store timestamp
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  static async fetchUpdatedContent(timestamp) {
    console.log("=====================================");
    console.log("Trying to fetch new online data since last timestamp");
    if (timestamp === null) {
      timestamp = await AsyncStorage.getItem("updateTimestamp");
      console.log("Last timestamp: " + timestamp);
      timestamp = parseInt(timestamp);
    }
    try {
      let response = await fetch(`${eresamontURL}/pages?updated=` + timestamp, {
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

// Page id cheatsheet
// 86 Health Assessment works
// 88 Mountain Meds Consultation works
// 126 Questionnaires some button in Italian
// 87 Toolbox some button in Italian
// 89 About empty button bug
// Medical Guide works

//const convertUnixTime = unixTimestamp => {
//   var date = new Date(unixTimestamp / 1000);
//   console.log(unixTimestamp / 1000);
//   console.log(date.toLocaleString());
//   var minutes = "0" + date.getMinutes();
//   var seconds = "0" + date.getSeconds();
//   var convertedTime =
//     date.getMonth() +
//     "-" +
//     date.getDate() +
//     "-" +
//     date.getFullYear() +
//     " " +
//     date.getHours() +
//     ":" +
//     minutes +
//     ":" +
//     seconds;
//   return convertedTime;
// };

// static async fetchPage(id) {
//   try {
//     let response = await fetch(`${eresamontURL}/pages/` + id, {
//       method: "GET",
//       headers: {
//         Accept: "application/json"
//       }
//     });
//     return await response.json();
//   } catch (e) {
//     console.error(e);
//   }
// }
