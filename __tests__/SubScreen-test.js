import React, { useState } from "react";
import renderer from "react-test-renderer";

import SubScreen from "../screens/SubScreen";
import { checkScreenType } from "../screens/SubScreen";
import { LanguageContext } from "../shared/LanguageContext";
import * as Resources from "../assets/test-pages/Pages";
import storage from "../utils/storage";
import { render, fireEvent } from "react-native-testing-library";

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
describe("SubScreen", () => {
  it("generates correct quiz javascript with id 95", () => {
    const language = 2; //Italian
    const tree = renderer
      .create(
        <LanguageContext.Provider value={{ language }}>
          <SubScreen navigation={Resources.navigationId95} />
        </LanguageContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("generates correct quiz javascript with id 100", () => {
    const language = 2; //Italian
    const tree = renderer
      .create(
        <LanguageContext.Provider value={{ language }}>
          <SubScreen navigation={Resources.navigationId100} />
        </LanguageContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("saves quiz score when message is post from webview", () => {
    const language = 2;

    storage.saveQuizScore = jest.fn();

    let { getByTestId } = render(
      <LanguageContext.Provider value={{ language }}>
        <SubScreen navigation={Resources.navigationId95} />
      </LanguageContext.Provider>
    );
    let webview = getByTestId("sub-webview");
    fireEvent(webview, "onMessage", { nativeEvent: { data: "10" } });
    expect(storage.saveQuizScore).toHaveBeenCalledTimes(1);
  });
  it("navigates to next subscreen when clicking on a children title (with text)", () => {
    const language = 2;
    Resources.navigationWithChildrenAndText.push = jest.fn();
    let { getByText } = render(
      <LanguageContext.Provider value={{ language }}>
        <SubScreen navigation={Resources.navigationWithChildrenAndText} />
      </LanguageContext.Provider>
    );
    let childButton = getByText("Sondaggio di soddisfazione");
    fireEvent(childButton, "onPress");
    expect(Resources.navigationWithChildrenAndText.push).toHaveBeenCalledTimes(
      1
    );
  });
  it("navigates to next subscreen when clicking on a children title (no text)", () => {
    const language = 2;
    Resources.navigationWithChildrenNoText.push = jest.fn();
    let { getByText } = render(
      <LanguageContext.Provider value={{ language }}>
        <SubScreen navigation={Resources.navigationWithChildrenNoText} />
      </LanguageContext.Provider>
    );
    let childButton = getByText("Francia");
    fireEvent(childButton, "onPress");
    expect(Resources.navigationWithChildrenNoText.push).toHaveBeenCalledTimes(
      1
    );
  });
});
