import * as React from "react";
import renderer from "react-test-renderer";
import { LanguageContext } from "../shared/LanguageContext";

import CustomDrawer from "../components/CustomDrawer";

describe("CustomDrawer", () => {
  const language = 1; //French
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
});
