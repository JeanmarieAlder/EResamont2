import * as React from "react";
import renderer from "react-test-renderer";
import { LanguageContext } from "../shared/LanguageContext";

import Home from "../screens/Home";
import storage from "../utils/storage";
import requestPage from "../utils/requestPage";
import { act } from "react-native-testing-library";

storage.checkStoragePages = jest.fn();
storage.getAllStoragePages = jest.fn();
storage.saveAllStoragePages = jest.fn();
requestPage.fetchAllPages = jest.fn();

describe("Home", () => {
  const language = 1; //French

  it(`renders correctly without content`, () => {
    act(() => {
      const tree = renderer
        .create(
          <LanguageContext.Provider value={{ language }}>
            <Home />
          </LanguageContext.Provider>
        )
        .toJSON();
    });

    expect(tree).toMatchSnapshot();
  });
});
