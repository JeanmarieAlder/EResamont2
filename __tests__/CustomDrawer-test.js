import * as React from "react";
import renderer from "react-test-renderer";
import { LanguageContext } from "../shared/LanguageContext";
import { LoadingContext } from "../shared/LoadingContext";
import CustomDrawer from "../components/CustomDrawer";

describe("CustomDrawer", () => {
  const language = 1; //French
  const loading = true;
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <LoadingContext.Provider value={{ loading }}>
          <LanguageContext.Provider value={{ language }}>
            <CustomDrawer />
          </LanguageContext.Provider>
        </LoadingContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
