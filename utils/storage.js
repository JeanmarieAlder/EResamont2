import React from "react";
import { AsyncStorage } from "react-native";
// import { AsyncStorage } from "react-native";
import * as FileSystem from "expo-file-system";
// const filePath = FileSystem.documentDirectory + "data.txt";
const filePath = FileSystem.documentDirectory;
import { ToastAndroid } from "react-native";
export default class storage {
  static async checkStoragePages() {
    console.log("=====================================");
    console.log("Checking for local data");
    let result = true;
    for (let i = 1; i < 8; i++) {
      let info = await FileSystem.getInfoAsync(filePath + i + ".txt");
      if (info.exists === false && info.isDirectory === false) {
        result = false; // file doesnt exist
        console.log("Item at postion " + i + " does not exist");
      }
    }

    console.log("Local data exists : " + result);
    return result;
  }

  static async saveAllStoragePages(data) {
    console.log("=====================================");
    console.log("Saving data to local storage");
    try {
      data.forEach(item => {
        FileSystem.writeAsStringAsync(
          filePath + item.position + ".txt",
          JSON.stringify(item)
        );
        console.log("Local data item " + item.position + " saved");
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async getAllStoragePages() {
    console.log("=====================================");
    console.log("Fetching local data");
    try {
      let localPages = [];
      for (let i = 1; i < 8; i++) {
        let section = await FileSystem.readAsStringAsync(filePath + i + ".txt");
        localPages.push(JSON.parse(section));
      }
      return await localPages;
    } catch (e) {
      console.error(e);
    }
  }
  static async updateStoragePages(data) {
    console.log("=====================================");
    console.log("Updating local data");
    if (data.length === 0) {
      console.log("Nothing to update");
      return false;
    } else {
      try {
        data.forEach(item => {
          FileSystem.writeAsStringAsync(
            filePath + item.position + ".txt",
            JSON.stringify(item)
          );
          console.log("Local data item " + item.position + " updated");
        });
        console.log("Data updated");
        let timestamp = new Date().getTime();
        console.log("Updated timestamp: " + timestamp);
        await AsyncStorage.setItem("updateTimestamp", timestamp.toString());
        return true;
      } catch (e) {
        console.error(e);
      }
    }
  }
  static async removeAllStoragePages() {
    console.log("=====================================");
    console.log("Clearing local data");
    try {
      for (let i = 1; i < 8; i++) {
        FileSystem.deleteAsync(filePath + i + ".txt", {
          idempotent: true
        });
      }
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

// static async saveAllStoragePages(data) {
//   console.log("Saving data to local storage");
//   try {
//     await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
//     console.log("Local data saved");
//   } catch (e) {
//     console.log(e);
//   }
// }

//   static async getAllStoragePages() {
//   console.log("Fetching local data");
//   try {
//     let localPages = await FileSystem.readAsStringAsync(filePath);
//     return await JSON.parse(localPages);
//   } catch (e) {
//     console.error(e);
//   }
// }
