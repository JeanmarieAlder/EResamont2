import * as React from "react";
import storage from "../utils/storage";
import * as Resources from "../assets/test-pages/Pages";
import * as FileSystem from "expo-file-system";
import { render } from "react-native-testing-library";
import { ToastAndroid, AsyncStorage } from "react-native";

let pagesData = [{ page: "page 1" }, { page: "page 2" }, { page: "page 3" }];

let mockGetInfoAsyncTrue = jest.fn(() => {
  return { exists: true, isDirectory: true };
});
let mockGetInfoAsyncfalse = jest.fn(() => {
  return { exists: false, isDirectory: false };
});
FileSystem.documentDirectory = jest.fn("/some/path/");
FileSystem.writeAsStringAsync = jest.fn();
FileSystem.deleteAsync = jest.fn();

console.error = jest.fn();

describe("storage", () => {
  beforeEach(() => {
    //reset mocks and counters
    jest.clearAllMocks();
  });
  describe("checkStoragePage", () => {
    it("should return true if data is existing locally", async () => {
      FileSystem.getInfoAsync = mockGetInfoAsyncTrue;
      let result = await storage.checkStoragePages();
      expect(result).toBeTruthy();
    });
    it("should return false if data is not existing locally", async () => {
      FileSystem.getInfoAsync = mockGetInfoAsyncfalse;
      let result = await storage.checkStoragePages();
      expect(result).toBeFalsy();
    });
  });
  describe("saveAllStoragePages", () => {
    it("should write as many objects as items in given data", async () => {
      await storage.saveAllStoragePages(pagesData);
      expect(FileSystem.writeAsStringAsync).toHaveBeenCalledTimes(
        pagesData.length
      );
    });
    it("should throw an exception if invalid data", async () => {
      storage.saveAllStoragePages(null);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
  describe("getAllStoragePage", () => {
    it("should read local file and fill array", async () => {
      FileSystem.readAsStringAsync = jest.fn(() => {
        return '{"result": "page"}';
      });
      let result = await storage.getAllStoragePages();
      expect(result.length > 1).toBeTruthy();
    });
    it("should throw an exception if response is not JSON", async () => {
      FileSystem.readAsStringAsync = jest.fn(() => {
        return "non json object";
      });
      let result = await storage.getAllStoragePages();
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
  describe("updateStoragePages", () => {
    it("should not update if data is empty", async () => {
      let result = await storage.updateStoragePages([]);
      expect(result).toBeFalsy();
    });
    it("should update if data exists", async () => {
      let result = await storage.updateStoragePages(pagesData);
      expect(result).toBeTruthy();
    });
    it("should throw an exception if data is not an array", async () => {
      await storage.updateStoragePages({
        title: "test",
        text: "test text"
      });
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
  describe("removeAllStoragePages", () => {
    it("should run deleteAsync multiple times", async () => {
      await storage.removeAllStoragePages();
      expect(FileSystem.deleteAsync).toHaveBeenCalled();
    });
    it("should throw exception ", async () => {
      FileSystem.deleteAsync = jest.fn(() => {
        throw exception;
      });
      await storage.removeAllStoragePages();
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
  describe("getQuizScore", () => {
    it("should return score if quiz exists (id95)", async () => {
      FileSystem.readAsStringAsync = jest.fn(() => {
        return '[{ "score": 1 }, { "score": 2 }]';
      });
      let response = await storage.getQuizScore(95);
      expect(response).toEqual([{ score: 1 }, { score: 2 }]);
    });
    it("should throw exception if data is invalid", async () => {
      FileSystem.readAsStringAsync = jest.fn(() => {
        return [{ score: 1 }, { score: 2 }];
      });
      let response = await storage.getQuizScore(95);
      expect(response).toEqual([]);
    });
  });

  describe("saveQuizScore", () => {
    it("should save score (quiz 100)", async () => {
      storage.getQuizScore = jest.fn(() => {
        return [{ score: 1 }, { score: 2 }];
      });
      await storage.saveQuizScore(100);
      expect(storage.getQuizScore).toHaveBeenCalledTimes(1);
      expect(FileSystem.writeAsStringAsync).toHaveBeenCalledTimes(1);
    });
    it("should handle empty string in currentScores (quiz 100)", async () => {
      storage.getQuizScore = jest.fn(() => {
        return "";
      });
      await storage.saveQuizScore(100);
      expect(storage.getQuizScore).toHaveBeenCalledTimes(1);
      expect(FileSystem.writeAsStringAsync).toHaveBeenCalledTimes(1);
    });
    it("should throw exception if score data is invalid", async () => {
      FileSystem.writeAsStringAsync = jest.fn(() => {
        throw exception;
      });
      await storage.saveQuizScore(100);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
    it("should not execute if statement if currentscore is null", async () => {
      storage.getQuizScore = jest.fn(() => {
        return null;
      });
      await storage.saveQuizScore(100);
      expect(FileSystem.writeAsStringAsync).toHaveBeenCalledTimes(0);
    });
  });

  describe("deleteScoreData", () => {
    it("should delete score (quiz 100)", async () => {
      FileSystem.deleteAsync = jest.fn();
      ToastAndroid.show = jest.fn();
      await storage.deleteScoreData(100);
      expect(FileSystem.deleteAsync).toHaveBeenCalledTimes(1);
      expect(ToastAndroid.show).toHaveBeenCalledTimes(1);
    });
    it("should throw error if data is invalid", async () => {
      FileSystem.deleteAsync = jest.fn(() => {
        throw exception;
      });
      ToastAndroid.show = jest.fn();
      await storage.deleteScoreData(100);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe("getLanguageSetting", () => {
    it("should return stored language", async () => {
      AsyncStorage.getItem = jest.fn(() => "2");
      let result = await storage.getLanguageSetting();
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
      expect(result).toEqual(2);
    });
    it("should throw error if data cannot be retrieved", async () => {
      AsyncStorage.getItem = jest.fn(() => {
        throw exception;
      });
      let result = await storage.getLanguageSetting();
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(result).toEqual(1);
    });
  });

  describe("setLanguageSetting", () => {
    it("should store language locally", async () => {
      AsyncStorage.setItem = jest.fn();
      await storage.setLanguageSetting(1);
      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    });
    it("should throw error if data cannot be saved", async () => {
      AsyncStorage.setItem = jest.fn(() => {
        throw exception;
      });
      await storage.setLanguageSetting(1);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  //Old ones
  /* it("should get all storage page", async () => {
    let response = await storage.getAllStoragePages();
    expect(response).toBeUndefined();
  });
  it("should update storage page", async () => {
    expect(
      await storage.updateStoragePages(Resources.navigationWithChildrenNoText)
    ).toBeUndefined();
  });
  it("should remove all storage page", async () => {
    expect(await storage.removeAllStoragePages()).toBeUndefined();
  }); */
});
