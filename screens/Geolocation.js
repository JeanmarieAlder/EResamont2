import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { WebView } from "react-native-webview";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import ButtonView from "../components/ButtonView";

export default function Geolocation({ navigation }) {
  let [location, setLocation] = useState(null);

  useEffect(() => {
    getGeolocationAsync();
  }, []);

  let getGeolocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return (
    <View style={{ flex: 1 }}>
      <ButtonView
        value={"Get location"}
        style={globalStyles.midataButton}
        onClick={() => getGeolocationAsync()}
      ></ButtonView>
      {location ? (
        <View style={localStyles.topContainer}>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
          <Text>Altitude (estimation): {location.coords.altitude}</Text>
          <View style={globalStyles.topMenuDivider} />
          <View style={globalStyles.mapContainer}>
            <WebView
              source={{
                uri: `https://www.google.com/maps/place/${location.coords.latitude},%20${location.coords.longitude}`
              }}
            ></WebView>
          </View>
        </View>
      ) : (
        <View style={localStyles.loaderViewMain}>
          <Text>
            Allow this app to use your location by clicking on "Get location".
          </Text>
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
