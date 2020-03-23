import * as React from "react";
import requestPage from "../utils/requestPage";
import { AsyncStorage } from "react-native";
import NetInfo from "@react-native-community/netinfo";

AsyncStorage.setItem = jest.fn();
console.error = jest.fn();

let fetchInvalidMock = jest.fn(() => "wrong data");
let fetchValidMock = jest.fn(() => {
  return { json: () => "response test" };
});

describe("requestPage", () => {
  beforeEach(() => {
    //reset mocks and counters
    jest.clearAllMocks();
  });
  describe("fetchAllPages", () => {
    it("should fetch all pages and current timestamp", async () => {
      fetch = fetchValidMock;
      let response = await requestPage.fetchAllPages();

      expect(response).toEqual("response test");
      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it("should throw exception when data is invalid", async () => {
      fetch = fetchInvalidMock;
      let response = await requestPage.fetchAllPages();

      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe("checkConnection", () => {
    it("should return info if connection exists", async () => {
      NetInfo.fetch = jest.fn(() => {
        return { connected: true };
      });
      let response = await requestPage.checkConnection();
      expect(response).toEqual({ connected: true });
    });
    it("should return nothing if connection does not exist", async () => {
      NetInfo.fetch = jest.fn(() => {
        return null;
      });
      let response = await requestPage.checkConnection();
      expect(response).toBeUndefined();
    });
  });

  describe("fetchUpdatedContent", () => {
    it("should fetch updated content with current date", async () => {
      fetch = fetchValidMock;
      AsyncStorage.getItem = jest.fn(() => 100000);
      let response = await requestPage.fetchUpdatedContent(null);
      expect(response).toEqual("response test");
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    });
    it("should fetch updated content with given date", async () => {
      fetch = fetchValidMock;
      let response = await requestPage.fetchUpdatedContent(100000);
      expect(response).toEqual("response test");
    });
    it("should throw exception when data is invalid", async () => {
      fetch = fetchInvalidMock;
      await requestPage.fetchUpdatedContent(100000);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  // it("should fetch all pages", async () => {
  //   let response = await requestPage.fetchAllPages();
  //   expect(response).not.toBeNull();
  // });

  // it("should fetch one page by id", async () => {
  //   let response = await requestPage.fetchPage(88);
  //   expect(response).not.toBeNull();
  // });
  // it("should fetch only updated content", async () => {
  //   let response = await requestPage.fetchUpdatedContent(10000000);
  //   expect(response).not.toBeNull();
  // });
});
