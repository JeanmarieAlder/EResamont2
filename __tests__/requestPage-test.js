import * as React from "react";
import { requestPage } from "../utils/requestPage";

describe("requestPage", () => {
  it("should fetch all pages", async () => {
    let response = await requestPage.fetchAllPages();
    expect(response).not.toBeNull();
  });

  it("should fetch one page by id", async () => {
    let response = await requestPage.fetchPage(88);
    expect(response).not.toBeNull();
  });
  it("should fetch only updated content", async () => {
    let response = await requestPage.fetchUpdatedContent(10000000);
    expect(response).not.toBeNull();
  });
});
