import * as React from "react";
import renderer from "react-test-renderer";
import { LanguageContext } from "../shared/LanguageContext";
import { LoadingContext } from "../shared/LoadingContext";
import Header from "../components/Header";

jest.mock("../routes/Drawer", () => "AppNavigator");

describe("Header", () => {
  const language = 1;
  const loading = true;
  jest.useFakeTimers();

  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <LoadingContext.Provider value={{ loading }}>
          <LanguageContext.Provider value={{ language }}>
            <Header title={"test title"} />
          </LanguageContext.Provider>
        </LoadingContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
