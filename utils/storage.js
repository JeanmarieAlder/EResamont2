import React from "react";
// import { AsyncStorage } from "react-native";
import * as FileSystem from "expo-file-system";
const filePath = FileSystem.documentDirectory + "data.txt";
export default class storage {
  static async checkStoragePages() {
    let result = true;
    let info = await FileSystem.getInfoAsync(filePath);
    if (info.exists === false && info.isDirectory === false) {
      result = false; // file doesnt exist
    }
    console.log("Checking for local data");
    console.log("Local data exists : " + result);
    return result;
  }
  static async saveAllStoragePages(data) {
    console.log("Saving data to local storage");
    try {
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
      console.log("Local data saved");
    } catch (e) {
      console.log(e);
    }
  }
  static async getAllStoragePages() {
    console.log("Fetching local data");
    try {
      let localPages = await FileSystem.readAsStringAsync(filePath);
      return await JSON.parse(localPages);
    } catch (e) {
      console.error(e);
    }
  }
  static async removeAllStoragePages() {
    try {
      await FileSystem.deleteAsync(filePath, { idempotent: true });
      console.log("Local data cleared");
    } catch (e) {
      console.log(e);
    }
  }
}

// export default class storage {

//   static async saveAllStoragePages(data) {
//     try {
//       await AsyncStorage.setItem("allPages", JSON.stringify(data));
//       console.log("saving local data");
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   static async getAllStoragePages() {
//     console.log("fetching local");
//     try {
//       const localPages = await AsyncStorage.getItem("allPages");
//       if (localPages !== null) {
//         console.log("returning local data");
//         console.log(JSON.stringify(localPages));
//         return await JSON.stringify(localPages);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   }
//   static async removeAllStoragePages() {
//     try {
//       await AsyncStorage.removeItem("allPages");
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }
