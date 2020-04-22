import React, { useState, useEffect, useContext } from "react";
import { ToastAndroid } from "react-native";
import * as AppAuth from "expo-app-auth";
import * as SecureStore from "expo-secure-store";
import requestGetMidata from "../utils/requestGetMidata";

export const Auth2Context = React.createContext();
export const useAuth2 = () => useContext(Auth2Context);
export const Auth2Provider = ({ children }) => {
  const StorageKey = "EResamont2MidataOAuthKey";
  const config = {
    issuer: "https://test.midata.coop/fhir/metadata",
    clientId: "eresamont2-test",
    serviceConfiguration: {
      authorizationEndpoint: "https://test.midata.coop/authservice",
      tokenEndpoint: "https://test.midata.coop/v1/token",
      revocationEndpoint: "https://test.midata.coop/v1/token"
    },
    redirectUrl: AppAuth.OAuthRedirect + ":/oauthredirect"
  };

  const [authState, setAuthState] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    console.log("LoginMidataContext: useEffect()");
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  const signInAsync = async () => {
    console.log("signInAsync()");
    let authState = await AppAuth.authAsync(config);
    await cacheAuthAsync(authState);
    console.log("signInAsync", authState);
    setAuthState(authState);
    return authState;
  };

  const signOutAsync = async ({ accessToken }) => {
    try {
      await AppAuth.revokeAsync(config, {
        token: accessToken,
        isClientIdProvided: true
      });
      await SecureStore.deleteItemAsync(StorageKey);
      console.log("sign out completed");
      ToastAndroid.show("Sign out completed", ToastAndroid.SHORT);
      setAuthState(null);
      return null;
    } catch (e) {
      console.error(`Failed to revoke token: ${e.message}`);
    }
  };

  const cacheAuthAsync = async authState => {
    return await SecureStore.setItemAsync(
      StorageKey,
      JSON.stringify(authState)
    );
  };

  const getCachedAuthAsync = async () => {
    let value = await SecureStore.getItemAsync(StorageKey);
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
  };

  const checkIfTokenExpired = ({ accessTokenExpirationDate }) => {
    return new Date(accessTokenExpirationDate) < new Date();
  };

  const refreshAuthAsync = async ({ refreshToken }) => {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    console.log("refreshAuth", authState);
    await cacheAuthAsync(authState);
    return authState;
  };

  const getLoggedUserName = async () => {
    if (authState) {
      let response = await requestGetMidata(
        "https://test.midata.coop/fhir/Patient/" +
          authState.additionalParameters.patient,
        authState,
        signInAsync
      );
      if (response) {
        setUserName(response.name[0].given[0]);
        return true;
      }
    }
    return false;
  };

  return (
    <Auth2Context.Provider
      value={{
        authState,
        userName,
        signInAsync,
        signOutAsync,
        cacheAuthAsync,
        getCachedAuthAsync,
        checkIfTokenExpired,
        refreshAuthAsync,
        getLoggedUserName
      }}
    >
      {children}
    </Auth2Context.Provider>
  );
};
