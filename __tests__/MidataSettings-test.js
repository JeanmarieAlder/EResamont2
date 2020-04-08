import * as React from "react";
import { render, fireEvent } from "react-native-testing-library";
import renderer from "react-test-renderer";
import { LanguageContext } from "../shared/LanguageContext";
import { Auth2Provider } from "../shared/LoginMidataContext";
import MidataSettings from "../screens/MidataSettings";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import { Auth2Context } from "../shared/LoginMidataContext";
import { ToastAndroid } from "react-native";

let language = 1;
console.log = jest.fn();
ToastAndroid.show = jest.fn();

const fakeNavigation = {
  push: (location) => {
    fakePush(location);
  },
};

let fakePush = jest.fn();

const FakeAuth2ProviderOnline = ({ children }) => {
  return (
    <Auth2Context.Provider
      value={{
        authState: true,
        getLoggedUserName: () => {
          return "testuser";
        },
        signOutAsync: () => {
          fakeSignOutAsync();
        },
      }}
    >
      {children}
    </Auth2Context.Provider>
  );
};
const FakeAuth2ProviderOffline = ({ children }) => {
  return (
    <Auth2Context.Provider
      value={{
        authState: false,
        getLoggedUserName: () => {
          return "testuser";
        },
        signInAsync: () => {
          fakeSignInAsync();
        },
        signOutAsync: () => {
          fakeSignOutAsync();
        },
      }}
    >
      {children}
    </Auth2Context.Provider>
  );
};
let fakeSignOutAsync = jest.fn();
let fakeSignInAsync = jest.fn();

describe("MidataSettings", () => {
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
    //reset mocks and counters
    jest.clearAllMocks();
  });
  it("Renders correctly", () => {
    let component = renderer
      .create(
        <Auth2Provider>
          <LanguageContext.Provider value={{ language }}>
            <MidataSettings />
          </LanguageContext.Provider>
        </Auth2Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  describe("LogInPressed", () => {
    it("says user is allready logged in if so", async () => {
      const { getByTestId } = render(
        <FakeAuth2ProviderOnline>
          <LanguageContext.Provider value={{ language }}>
            <MidataSettings />
          </LanguageContext.Provider>
        </FakeAuth2ProviderOnline>
      );
      const element = getByTestId("button-view-Log in / Sign up");
      await fireEvent.press(element);
      expect(ToastAndroid.show).toHaveBeenCalledTimes(1);
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "Allready logged in",
        ToastAndroid.SHORT
      );
    });
    it("proceeds to login if not logged in", async () => {
      const { getByTestId } = render(
        <FakeAuth2ProviderOffline>
          <LanguageContext.Provider value={{ language }}>
            <MidataSettings />
          </LanguageContext.Provider>
        </FakeAuth2ProviderOffline>
      );
      const element = getByTestId("button-view-Log in / Sign up");
      await fireEvent.press(element);
      expect(fakeSignInAsync).toHaveBeenCalledTimes(1);
    });
  });
  describe("LogOutPressed", () => {
    it("says user is allready logged off if so", async () => {
      const { getByTestId } = render(
        <FakeAuth2ProviderOffline>
          <LanguageContext.Provider value={{ language }}>
            <MidataSettings />
          </LanguageContext.Provider>
        </FakeAuth2ProviderOffline>
      );
      const element = getByTestId("button-view-Sign out");
      await fireEvent.press(element);
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        "Already logged off",
        ToastAndroid.SHORT
      );
      expect(ToastAndroid.show).toHaveBeenCalledTimes(1);
    });

    it("proceeds to logout if logged in", async () => {
      const { getByTestId } = render(
        <FakeAuth2ProviderOnline>
          <LanguageContext.Provider value={{ language }}>
            <MidataSettings />
          </LanguageContext.Provider>
        </FakeAuth2ProviderOnline>
      );
      const element = getByTestId("button-view-Sign out");
      await fireEvent.press(element);
      expect(fakeSignOutAsync).toHaveBeenCalledTimes(1);
    });
  });
  describe("MyData button", () => {
    it("navigates to my data page", async () => {
      const { getByTestId } = render(
        <FakeAuth2ProviderOnline>
          <LanguageContext.Provider value={{ language }}>
            <MidataSettings navigation={fakeNavigation} />
          </LanguageContext.Provider>
        </FakeAuth2ProviderOnline>
      );
      const element = getByTestId("button-view-My data");
      await fireEvent.press(element);
      expect(fakePush).toHaveBeenCalledWith("MyData");
      expect(fakePush).toHaveBeenCalledTimes(1);
    });
  });
});
