import * as React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import renderer from "react-test-renderer";
import storage from "../utils/storage";
import App from "../App";
import { act } from "react-test-renderer";

jest.mock("expo", () => ({
  AppLoading: "AppLoading"
}));

jest.mock("../routes/Drawer", () => "AppNavigator");
storage.getLanguageSetting = jest.fn(() => 1);

describe("App", () => {
  jest.useFakeTimers();

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it(`renders the loading screen`, () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`renders the root without loading screen`, () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("sets language correctly", async () => {
    await act(async () => {
      renderer.create(<App></App>);
    });
    expect(storage.getLanguageSetting).toHaveBeenCalled();
  });
  it("does not update language if setting is not existent", async () => {
    storage.getLanguageSetting = jest.fn(() => null);
    await act(async () => {
      renderer.create(<App></App>);
    });
    expect(storage.getLanguageSetting).toHaveBeenCalled();
  });
});
