import * as React from "react";
import storage from "../utils/storage";
import * as Resources from "../assets/test-pages/Pages";

describe("storage", () => {
  it("should check storage page and return true", async () => {
    let response = await storage.checkStoragePages();
    expect(response).toBe(true);
  });
  it("should save all storage page", async () => {
    expect(
      await storage.saveAllStoragePages(Resources.navigationWithChildrenNoText)
    ).toBeUndefined();
  });
  it("should get all storage page", async () => {
    let response = await storage.getAllStoragePages();
    expect(response).toBeUndefined();
  });
  it("should update storage page", async () => {
    expect(
      await storage.updateStoragePages(Resources.navigationWithChildrenNoText)
    ).toBeUndefined();
  });
  it("should remove all storage page", async () => {
    expect(await storage.removeAllStoragePages()).toBeUndefined();
  });
});
