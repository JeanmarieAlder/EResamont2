import { createStackNavigator } from "react-navigation-stack";

import React, { useContext } from "react";
import Header from "../components/Header";
import Home from "../screens/Home";
import SubScreen from "../screens/SubScreen";
import { globalStyles } from "../styles/global";
import utilities from "../utils/utilities";
import EmergencyCalls from "../screens/EmergencyCalls";
import Geolocation from "../screens/Geolocation";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Home" navigation={navigation} />
      };
    }
  },
  SubScreen: {
    screen: SubScreen,
    navigationOptions: ({ navigation }) => {
      let navParams = navigation.state.params;
      return {
        headerTitle: () => (
          <Header title={navParams.pages_lang} navigation={navigation} />
        )
      };
    }
  },
  EmergencyCalls: {
    screen: EmergencyCalls,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title="Emergency calls" navigation={navigation} />
        )
      };
    }
  },
  Geolocation: {
    screen: Geolocation,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="GPS" navigation={navigation} />
      };
    }
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: globalStyles.headerStyle,
    headerTintColor: "black"
  }
});

export default HomeStack;
