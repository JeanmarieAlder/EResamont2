export default async function(url, authState, signInAsync) {
  try {
    if (authState) {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Accepts: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.accessToken}`
        }
      });
      let data = await response.json();
      return data;
    }
  } catch (e) {
    console.error(e);
    await signInAsync();
  }
}
