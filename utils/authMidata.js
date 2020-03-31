import { AsyncStorage } from "react-native";

export default class authMidata {
  config = {
    issuer: "https://test.midata.coop/fhir/metadata",
    clientId: "eresamont2-test",
    serviceConfiguration: {
      authorizationEndpoint: "https://test.midata.coop/authservice",
      tokenEndpoint: "https://test.midata.coop/v1/token"
    }
  };

  StorageKey = "@EResamont2:MidataOAuthKey";

  static async getCachedAuthAsync() {
    let value = await AsyncStorage.getItem(StorageKey);
    let authState = JSON.parse(value);
    console.log("getCachedAuthAsync", authState);
    if (authState) {
      if (checkIfTokenExpired(authState)) {
        return refreshAuthAsync(authState);
      } else {
        return authState;
      }
    }
    return null;
  }

  static checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
  }

  static async refreshAuthAsync({ refreshToken }) {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    console.log("refreshAuth", authState);
    await cacheAuthAsync(authState);
    return authState;
  }

  // static async getFHIRMetadata() {
  //   let addresses = {
  //     tokenAddress: "",
  //     authAddress: ""
  //   };
  //   try {
  //     let response = await fetch("https://test.midata.coop/fhir/metadata", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json"
  //       }
  //     });
  //     let responseJson = await response.json();

  //     addresses.tokenAddress = await responseJson.rest[0].security.extension[0]
  //       .extension[0].valueUri;
  //     addresses.authAddress = await responseJson.rest[0].security.extension[0]
  //       .extension[1].valueUri;
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   return addresses;
  // }
}
