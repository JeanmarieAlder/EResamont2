import * as React from "react";
import renderer from "react-test-renderer";
import { act } from "react-test-renderer";
import Geolocation from "../screens/Geolocation";
import * as Permissions from "expo-permissions";
import { ToastAndroid } from "react-native";
import { render, fireEvent } from "react-native-testing-library";

jest.mock("expo-permissions");
jest.mock("expo-location");
ToastAndroid.show = jest.fn();

describe("Geolocation screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render correctly", async () => {
    Permissions.askAsync = jest.fn(() => {
      return { status: "granted" };
    });
    let component = render(<Geolocation></Geolocation>);

    expect(component).toMatchSnapshot();
  });
  it("should render correctly when permission denied", async () => {
    Permissions.askAsync = jest.fn(() => {
      return { status: "denied" };
    });
    let component;
    await act(async () => {
      component = renderer.create(<Geolocation></Geolocation>).toJSON();
    });

    expect(ToastAndroid.show).toHaveBeenCalledWith(
      "Permission denied",
      ToastAndroid.SHORT
    );
  });
});
