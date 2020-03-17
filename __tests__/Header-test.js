import * as React from "react";
import renderer from "react-test-renderer";
import { LanguageContext } from "../shared/LanguageContext";
import Header from "../components/Header";

jest.mock("../routes/Drawer", () => "AppNavigator");

describe("Header", () => {
  const language = 1; //French
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
});
