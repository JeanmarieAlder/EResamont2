import React from "react";
import renderer from "react-test-renderer";
import { useAuth2, Auth2Provider } from "../shared/LoginMidataContext";
import { Text, View, Button } from "react-native";
import { render, fireEvent } from "react-native-testing-library";
import * as AppAuth from "expo-app-auth";
import * as SecureStore from "expo-secure-store";
import requestGetMidata from "../utils/requestGetMidata";

function DummyLogin() {
  const {
    authState,
    userName,
    signInAsync,
    signOutAsync,
    cacheAuthAsync,
    getCachedAuthAsync,
    checkIfTokenExpired,
    refreshAuthAsync,
    getLoggedUserName,
  } = useAuth2();

  return (
    <View>
      <Button
        title={"test"}
        testID={"signInAsync"}
        onPress={() => signInAsync()}
      ></Button>
      <Button
        title={"test"}
        testID={"signOutAsync"}
        onPress={() => signOutAsync("dummyToken")}
      ></Button>
      <Button
        title={"test"}
        testID={"refreshAuthAsync"}
        onPress={() => refreshAuthAsync("dummyToken")}
      ></Button>
      <Button
        title={"test"}
        testID={"getLoggedUserName"}
        onPress={() => getLoggedUserName()}
      ></Button>
    </View>
  );
}

jest.mock("expo-app-auth");
jest.mock("expo-secure-store");
jest.mock("../utils/requestGetMidata");
AppAuth.authAsync = jest.fn();
AppAuth.revokeAsync = jest.fn();
AppAuth.refreshAsync = jest.fn();
SecureStore.getItemAsync = jest.fn();
SecureStore.deleteItemAsync = jest.fn();
JSON.parse = jest.fn(() => {
  return { test: "object" };
});

describe("LoginMidataContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("signs in correctly", async () => {
    let { getByTestId } = render(
      <Auth2Provider>
        <DummyLogin></DummyLogin>
      </Auth2Provider>
    );
    let button = getByTestId("signInAsync");

    await fireEvent.press(button);
    expect(AppAuth.authAsync).toHaveBeenCalledTimes(1);
    expect(SecureStore.getItemAsync).toHaveBeenCalledTimes(1);
  });

  it("takes else path on getCachedAuth", async () => {
    JSON.parse = jest.fn();
    let { getByTestId } = render(
      <Auth2Provider>
        <DummyLogin></DummyLogin>
      </Auth2Provider>
    );
    let button = getByTestId("signInAsync");

    await fireEvent.press(button);
    expect(AppAuth.authAsync).toHaveBeenCalledTimes(1);
    expect(SecureStore.getItemAsync).toHaveBeenCalledTimes(1);
  });
  it("signs out correctly", async () => {
    let { getByTestId } = render(
      <Auth2Provider>
        <DummyLogin></DummyLogin>
      </Auth2Provider>
    );
    let button = getByTestId("signOutAsync");

    await fireEvent.press(button);
    expect(AppAuth.revokeAsync).toHaveBeenCalledTimes(1);
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledTimes(1);
  });
  it("signs out and throw an exception", async () => {
    AppAuth.revokeAsync = jest.fn(() => {
      throw exception;
    });
    console.error = jest.fn();
    let { getByTestId } = render(
      <Auth2Provider>
        <DummyLogin></DummyLogin>
      </Auth2Provider>
    );
    let button = getByTestId("signOutAsync");

    await fireEvent.press(button);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it("refreshes auth correctly", async () => {
    let { getByTestId } = render(
      <Auth2Provider>
        <DummyLogin></DummyLogin>
      </Auth2Provider>
    );
    let button = getByTestId("refreshAuthAsync");

    await fireEvent.press(button);
    expect(AppAuth.refreshAsync).toHaveBeenCalledTimes(1);
  });
  it("gets logged username correctly", async () => {
    AppAuth.authAsync = jest.fn(() => {
      return { additionalParameters: { patient: "testUser" } };
    });
    let { getByTestId } = render(
      <Auth2Provider>
        <DummyLogin></DummyLogin>
      </Auth2Provider>
    );
    let button1 = getByTestId("signInAsync");
    let button2 = getByTestId("getLoggedUserName");

    await fireEvent.press(button1);
    await fireEvent.press(button2);
    expect(requestGetMidata).toHaveBeenCalledTimes(1);
  });
});
