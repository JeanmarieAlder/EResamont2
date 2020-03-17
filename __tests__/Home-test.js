import * as React from "react";
import renderer from "react-test-renderer";
import { LanguageContext } from "../shared/LanguageContext";

import Home from "../screens/Home";

describe("Home", () => {
  const language = 1; //French

  it(`renders correctly without content`, () => {
    const tree = renderer
      .create(
        <LanguageContext.Provider value={{ language }}>
          <Home />
        </LanguageContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
