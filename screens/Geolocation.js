import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { globalStyles } from "../styles/global";
import { WebView } from "react-native-webview";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default function Geolocation({ navigation }) {
  let [location, setLocation] = useState(null);
  let [geoPermission, setGeoPermission] = useState(false);
  useEffect(() => {
    getGeolocationAsync();
  }, []);

  let getGeolocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      ToastAndroid.show("Permission denied", ToastAndroid.SHORT);
    } else {
      setGeoPermission(true);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!geoPermission && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center" }}>
            Please turn on location permission
          </Text>
          <Text style={{ textAlign: "center" }}>
            (App info -> Permission -> Location)
          </Text>
        </View>
      )}
      {/* <ButtonView
        value={"Get your location"}
        style={{ ...globalStyles.locationButton }}
        onClick={() => getGeolocationAsync()}
      ></ButtonView> */}
      {location && (
        <View style={localStyles.topContainer}>
          {/* <View style={{ alignSelf: "center" }}>
            <Text style={{ textAlign: "center" }}>
              Latitude: {location.coords.latitude}
            </Text>
            <Text style={{ textAlign: "center" }}>
              Longitude: {location.coords.longitude}
            </Text>
            <Text style={{ textAlign: "center" }}>
              Altitude (estimation): {location.coords.altitude}
            </Text>
          </View> */}
          {/* <View style={globalStyles.topMenuDivider} /> */}
          <View style={globalStyles.mapContainer}>
            <WebView
              source={{
                uri: `https://www.google.com/maps/place/${location.coords.latitude},%20${location.coords.longitude}`
              }}
            ></WebView>
          </View>
        </View>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  topContainer: {
    flex: 1
  }
});
