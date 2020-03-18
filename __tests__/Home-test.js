import * as React from "react";
import renderer from "react-test-renderer";
import { LanguageContext } from "../shared/LanguageContext";
import { LoadingContext } from "../shared/LoadingContext";
import Home from "../screens/Home";

describe("Home", () => {
  const language = 1; //French
  const loading = true;
  it(`renders correctly without content`, () => {
    const tree = renderer
      .create(
        <LoadingContext.Provider value={{ loading }}>
          <LanguageContext.Provider value={{ language }}>
            <Home />
          </LanguageContext.Provider>
        </LoadingContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
