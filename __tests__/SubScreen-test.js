import React, { useState } from "react";
import renderer from "react-test-renderer";

import SubScreen from "../screens/SubScreen";
import { LanguageContext } from "../shared/LanguageContext";
import * as Resources from "../assets/test-pages/Pages";

test("SubScreen - Render no child with plaintext", () => {
  const language = 1; //French
  const tree = renderer
    .create(
      <LanguageContext.Provider value={{ language }}>
        <SubScreen navigation={Resources.navigationNoChildPlainText} />
      </LanguageContext.Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
test("SubScreen - Render no child with text", () => {
  const language = 1; //French
  const tree = renderer
    .create(
      <LanguageContext.Provider value={{ language }}>
        <SubScreen navigation={Resources.navigationNoChildText} />
      </LanguageContext.Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
test("SubScreen - Render with children and text", () => {
  const language = 1; //French
  const tree = renderer
    .create(
      <LanguageContext.Provider value={{ language }}>
        <SubScreen navigation={Resources.navigationWithChildrenAndText} />
      </LanguageContext.Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
test("SubScreen - Render with children and no text", () => {
  const language = 1; //French
  const tree = renderer
    .create(
      <LanguageContext.Provider value={{ language }}>
        <SubScreen navigation={Resources.navigationWithChildrenNoText} />
      </LanguageContext.Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
test("SubScreen - Render no child in English", () => {
  const language = 3; //English
  const tree = renderer
    .create(
      <LanguageContext.Provider value={{ language }}>
        <SubScreen navigation={Resources.navigationNoChildText} />
      </LanguageContext.Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
test("SubScreen - Render no child in Italian", () => {
  const language = 2; //Italian
  const tree = renderer
    .create(
      <LanguageContext.Provider value={{ language }}>
        <SubScreen navigation={Resources.navigationNoChildText} />
      </LanguageContext.Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
test("TODO: SubScreen - Render no child in German", () => {
  const language = 1; //TODO: change to 4 (german)
  const tree = renderer
    .create(
      <LanguageContext.Provider value={{ language }}>
        <SubScreen navigation={Resources.navigationNoChildText} />
      </LanguageContext.Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
