import requestPostMidata from "../utils/requestPostMidata";

fetch = jest.fn(() => {
  return { json: () => "le response test" };
});
let fakeAuthState = { accessToken: "leToken" };
let body = "leFakeBody";
let fakeSignInAsync = jest.fn();

describe("requestPostMidata", () => {
  it("fetches correct data with valid arguments", async () => {
    let response = await requestPostMidata(
      "someUrl",
      fakeAuthState,
      null,
      body
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toEqual("le response test");
  });

  it("tries to login if an error occurs", async () => {
    let response = await requestPostMidata(
      "someUrl",
      null,
      fakeSignInAsync,
      body
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fakeSignInAsync).toHaveBeenCalledTimes(1);
  });
});
