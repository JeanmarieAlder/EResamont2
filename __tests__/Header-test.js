import * as React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "react-native-testing-library";
import { LanguageContext } from "../shared/LanguageContext";
import Header from "../components/Header";
import utilities from "../utils/utilities";

let openDrawerCalled;
let navigation = {
  openDrawer: () => {
    console.log("open drawer");
    openDrawerCalled = true;
  },
  toggleDrawer: () => {
    console.log("toggle Drawer called");
  },
  navigate: () => {
    console.log("navigate called");
  }
};

let titleTab = [{ title: "title 1" }, { title: "title 2" }];

jest.mock("../utils/utilities");
utilities.findLanguageIndex = jest.fn(() => {
  return 1;
});
jest.mock("../routes/Drawer", () => "AppNavigator");

describe("Header", () => {
  const language = 1; //French
  const setLanguage = newLanguage => {
    this.language = newLanguage;
  };
  jest.useFakeTimers();

  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <LanguageContext.Provider value={{ language }}>
          <Header title={"test title"} />
        </LanguageContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("opens menu when icon clicked", () => {
    openDrawerCalled = false;
    const { getByTestId } = render(
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Header title={"test title"} navigation={navigation} />
      </LanguageContext.Provider>
    );
    const element = getByTestId("header-button-menu");
    fireEvent.press(element);
    expect(openDrawerCalled).toBeTruthy();
  });
  it("finds title language if different from home or test title", () => {
    render(
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Header title={titleTab} navigation={navigation} />
      </LanguageContext.Provider>
    );
    expect(utilities.findLanguageIndex).toHaveBeenCalledTimes(1);
  });
});
