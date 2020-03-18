import * as React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "react-native-testing-library";

import { LanguageContext } from "../shared/LanguageContext";
import { requestPage } from "../utils/requestPage";

import CustomDrawer from "../components/CustomDrawer";

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
jest.mock("../utils/requestPage");
describe("CustomDrawer", () => {
  beforeEach(() => {
    setLanguage(1);
  });
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <LanguageContext.Provider value={{ language }}>
          <CustomDrawer />
        </LanguageContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
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
  it("checks for update when pressing button", () => {
    const { getByTestId } = render(
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <CustomDrawer navigation={navigation} />
      </LanguageContext.Provider>
    );
    const element = getByTestId("cd-button-update");
    fireEvent.press(element);
    expect(requestPage.fetchUpdatedContent).toHaveBeenCalledTimes(1);
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
