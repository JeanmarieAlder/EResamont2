import * as React from "react";
import renderer from "react-test-renderer";

import Header from "../components/Header";

jest.mock("../routes/Drawer", () => "AppNavigator");

describe("Header", () => {
  jest.useFakeTimers();

  it(`renders correctly`, () => {
    const tree = renderer.create(<Header title={"test title"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
