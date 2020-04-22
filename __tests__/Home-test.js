import * as React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, cleanup } from "react-native-testing-library";
import { LanguageContext } from "../shared/LanguageContext";
import { LoadingContext } from "../shared/LoadingContext";
import Home from "../screens/Home";
import storage from "../utils/storage";
import requestPage from "../utils/requestPage";
import { act } from "react-test-renderer";
import { ToastAndroid } from "react-native";

ToastAndroid.show = jest.fn();
console.error = jest.fn();
storage.checkStoragePages = jest.fn();
storage.getAllStoragePages = jest.fn();
storage.saveAllStoragePages = jest.fn();

requestPage.fetchAllPages = jest.fn(() => {
  return [{ text: "test" }, { text: "test 2" }];
});
requestPage.checkConnection = jest.fn();
requestPage.fetchUpdatedContent = jest.fn(() => {
  return [];
});

let language;
let loading;

describe("Home", () => {
  beforeEach(() => {
    language = 1; //French
    loading = true;
    //reset mocks and counters
    jest.clearAllMocks();
  });
  afterEach(cleanup);

  it(`renders correctly without content`, async () => {
    let component;
    await act(async () => {
      component = renderer
        .create(
          <LoadingContext.Provider value={{ loading }}>
            <LanguageContext.Provider value={{ language }}>
              <Home />
            </LanguageContext.Provider>
          </LoadingContext.Provider>
        )
        .toJSON();
    });

    expect(component).toMatchSnapshot();
  });
  it(`renders correctly when not loading`, async () => {
    let component;
    loading = false;
    await act(async () => {
      component = renderer
        .create(
          <LoadingContext.Provider value={{ loading }}>
            <LanguageContext.Provider value={{ language }}>
              <Home />
            </LanguageContext.Provider>
          </LoadingContext.Provider>
        )
        .toJSON();
    });

    expect(component).toMatchSnapshot();
  });
  describe("GetAllPages", () => {
    it("has no local data and no connection", async () => {
      requestPage.checkConnection = jest.fn(() => {
        return { isInternetReachable: false };
      });
      storage.checkStoragePages = jest.fn(() => false);

      await act(async () => {
        renderer.create(
          <LoadingContext.Provider value={{ loading }}>
            <LanguageContext.Provider value={{ language }}>
              <Home />
            </LanguageContext.Provider>
          </LoadingContext.Provider>
        );
      });

      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "No local data, no connection",
        ToastAndroid.SHORT
      );
    });
    it("has no local data and connection ok", async () => {
      requestPage.checkConnection = jest.fn(() => {
        return { isInternetReachable: true };
      });
      storage.checkStoragePages = jest.fn(() => false);

      await act(async () => {
        renderer.create(
          <LoadingContext.Provider value={{ loading }}>
            <LanguageContext.Provider value={{ language }}>
              <Home />
            </LanguageContext.Provider>
          </LoadingContext.Provider>
        );
      });

      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "Downloading..",
        ToastAndroid.SHORT
      );
    });
    it("has local data and connection ok", async () => {
      requestPage.checkConnection = jest.fn(() => {
        return { isInternetReachable: true };
      });
      storage.checkStoragePages = jest.fn(() => true);

      await act(async () => {
        renderer.create(
          <LoadingContext.Provider value={{ loading }}>
            <LanguageContext.Provider value={{ language }}>
              <Home />
            </LanguageContext.Provider>
          </LoadingContext.Provider>
        );
      });

      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "Checking for update..",
        ToastAndroid.SHORT
      );
    });
    it("has local data and no connection", async () => {
      requestPage.checkConnection = jest.fn(() => {
        return { isInternetReachable: false };
      });
      storage.checkStoragePages = jest.fn(() => true);

      await act(async () => {
        renderer.create(
          <LoadingContext.Provider value={{ loading }}>
            <LanguageContext.Provider value={{ language }}>
              <Home />
            </LanguageContext.Provider>
          </LoadingContext.Provider>
        );
      });

      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "Local data exists, no connection",
        ToastAndroid.SHORT
      );
      expect(storage.getAllStoragePages).toHaveBeenCalledTimes(1);
    });
  });
  describe("fetchLocalStorageWithUpdateCheck", () => {
    it("has no data fetched and is up to date", async () => {
      requestPage.checkConnection = jest.fn(() => {
        return { isInternetReachable: true };
      });
      storage.checkStoragePages = jest.fn(() => true);

      await act(async () => {
        renderer.create(
          <LoadingContext.Provider value={{ loading }}>
            <LanguageContext.Provider value={{ language }}>
              <Home />
            </LanguageContext.Provider>
          </LoadingContext.Provider>
        );
      });

      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "Checking for update..",
        ToastAndroid.SHORT
      );
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "Local data up to date",
        ToastAndroid.SHORT
      );
    });
    it("has fetched data and updates it", async () => {
      storage.updateStoragePages = jest.fn(() => true);
      requestPage.fetchUpdatedContent = jest.fn(() => {
        return [{ text: "test" }];
      });
      requestPage.checkConnection = jest.fn(() => {
        return { isInternetReachable: true };
      });
      storage.checkStoragePages = jest.fn(() => true);

      await act(async () => {
        renderer.create(
          <LoadingContext.Provider value={{ loading }}>
            <LanguageContext.Provider value={{ language }}>
              <Home />
            </LanguageContext.Provider>
          </LoadingContext.Provider>
        );
      });

      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "Checking for update..",
        ToastAndroid.SHORT
      );
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "New data fetched since last time",
        ToastAndroid.SHORT
      );
    });
    it("has fetched data but update in local has failed", async () => {
      storage.updateStoragePages = jest.fn(() => false);
      requestPage.fetchUpdatedContent = jest.fn(() => {
        return [{ text: "test" }, { text: "test2" }];
      });
      requestPage.checkConnection = jest.fn(() => {
        return { isInternetReachable: true };
      });
      storage.checkStoragePages = jest.fn(() => true);

      let component;
      await act(async () => {
        component = renderer.create(
          <LoadingContext.Provider value={{ loading }}>
            <LanguageContext.Provider value={{ language }}>
              <Home />
            </LanguageContext.Provider>
          </LoadingContext.Provider>
        );
      });
      await act(async () => {
        component.update;
      });

      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "Checking for update..",
        ToastAndroid.SHORT
      );
      expect(ToastAndroid.show).not.toHaveBeenCalledWith(
        "New data fetched since last time",
        ToastAndroid.SHORT
      );
    });
  });
});

/*
await render(
        <LoadingContext.Provider value={{ loading }}>
          <LanguageContext.Provider value={{ language }}>
            <Home />
          </LanguageContext.Provider>
        </LoadingContext.Provider>
      );
      */
