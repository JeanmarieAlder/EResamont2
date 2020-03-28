import React, { useState, useEffect, useContext } from "react";
import { AsyncStorage } from "react-native";
import * as AppAuth from "expo-app-auth";

export const Auth2Context = React.createContext();
export const useAuth2 = () => useContext(Auth2Context);
export const Auth2Provider = ({ children }) => {
  const StorageKey = "@EResamont2:MidataOAuthKey";
  const config = {
    issuer: "https://test.midata.coop/fhir/metadata",
    clientId: "eresamont2-test",
    serviceConfiguration: {
      authorizationEndpoint: "https://test.midata.coop/authservice",
      tokenEndpoint: "https://test.midata.coop/v1/token",
      revocationEndpoint: "https://test.midata.coop/v1/token"
    }
  };

  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    console.log("LoginmidataContext: useEffect()");
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
      await AsyncStorage.removeItem(StorageKey);
      console.log("sign out completed");
      setAuthState(null);
      return null;
    } catch (e) {
      console.error(`Failed to revoke token: ${e.message}`);
    }
  };

  const cacheAuthAsync = async authState => {
    return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  };

  const getCachedAuthAsync = async () => {
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

  return (
    <Auth2Context.Provider
      value={{
        authState,
        signInAsync,
        signOutAsync,
        cacheAuthAsync,
        getCachedAuthAsync,
        checkIfTokenExpired,
        refreshAuthAsync
      }}
    >
      {children}
    </Auth2Context.Provider>
  );
};
