export default async function(url, authState, signInAsync, body) {
  try {
    if (authState) {
      console.log("entered requestpostMidata");
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
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
