export default class authMidata {
  static async getFHIRMetadata() {
    let addresses = {
      tokenAddress: "",
      authAddress: ""
    };
    try {
      let response = await fetch("https://test.midata.coop/fhir/metadata", {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
      let responseJson = await response.json();

      addresses.tokenAddress = await responseJson.rest[0].security.extension[0]
        .extension[0].valueUri;
      addresses.authAddress = await responseJson.rest[0].security.extension[0]
        .extension[1].valueUri;
    } catch (error) {
      console.error(error);
    }
    return addresses;
  }
  static async getConfigFile() {
    return {
      issuer: "https://test.midata.coop/fhir/metadata",
      clientId: "eresamont2-test",
      redirectUrl: "http://localhost/callback"
    };
  }
}
