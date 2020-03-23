import * as React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "react-native-testing-library";

import { LanguageContext } from "../shared/LanguageContext";
import requestPage from "../utils/requestPage";
import { LoadingContext } from "../shared/LoadingContext";
import CustomDrawer from "../components/CustomDrawer";
import { ToastAndroid } from "react-native";
import storage from "../utils/storage";

let language = 1;
let navigateCalled = false;
let setLanguage = newLanguage => {
  language = newLanguage;
};
let navigation = {
  closeDrawer: () => {
    console.log("closed drawer");
  },
  toggleDrawer: () => {
    console.log("toggle Drawer called");
  },
  navigate: () => {
    console.log("navigate called");
    navigateCalled = true;
  }
};

ToastAndroid.show = jest.fn();

jest.mock("../utils/requestPage");
describe("CustomDrawer", () => {

  beforeEach(() => {
    setLanguage(1);
    //reset mocks and counters
    jest.clearAllMocks();
  });
  const loading = true;

  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <LoadingContext.Provider value={{ loading }}>
          <LanguageContext.Provider value={{ language }}>
            <CustomDrawer />
          </LanguageContext.Provider>
        </LoadingContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("checkUpdate", () => {
    it("should say up to date if no updates", async () => {
      requestPage.fetchUpdatedContent = jest.fn(() => {
        return [];
      });
      const { getByTestId } = render(
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <CustomDrawer navigation={navigation} />
        </LanguageContext.Provider>
      );
      const element = getByTestId("cd-button-update");
      await fireEvent.press(element);
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "Data already up to date",
        ToastAndroid.LONG
      );
    });
    it("should update and say updated", async () => {
      requestPage.fetchUpdatedContent = jest.fn(() => {
        return [{ some: "object" }];
      });
      storage.updateStoragePages = jest.fn(() => true);
      const { getByTestId } = render(
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <CustomDrawer navigation={navigation} />
        </LanguageContext.Provider>
      );
      const element = getByTestId("cd-button-update");
      await fireEvent.press(element);
      expect(ToastAndroid.show).toHaveBeenCalledTimes(1);
      expect(storage.updateStoragePages).toHaveBeenCalledTimes(1);
    });
  });

  it("changes language to english", () => {
    const { getByTestId } = render(
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <CustomDrawer navigation={navigation} />
      </LanguageContext.Provider>
    );
    const element = getByTestId("button-view-English");
    fireEvent.press(element);
    expect(language).toEqual(3);
  });
  it("changes language to italian", () => {
    const { getByTestId } = render(
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <CustomDrawer navigation={navigation} />
      </LanguageContext.Provider>
    );
    const element = getByTestId("button-view-Italiano");
    fireEvent.press(element);
    expect(language).toEqual(2);
  });
  it("changes language to french", () => {
    setLanguage(2); //set initial value to non-french
    const { getByTestId } = render(
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <CustomDrawer navigation={navigation} />
      </LanguageContext.Provider>
    );
    const element = getByTestId("button-view-Français");
    fireEvent.press(element);
    expect(language).toEqual(1);
  });

  it("goes to home page after", () => {
    navigateCalled = false;
    const { getByTestId } = render(
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <CustomDrawer navigation={navigation} />
      </LanguageContext.Provider>
    );
    const element = getByTestId("cd-button-home");
    fireEvent.press(element);
    expect(navigateCalled).toBeTruthy();
  });
});
