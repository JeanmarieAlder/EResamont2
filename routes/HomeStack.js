import { createStackNavigator } from "react-navigation-stack";

import React from "react";
import Header from "../components/Header";
import HeaderLeft from "../components/HeaderLeft";
import HeaderRight from "../components/HeaderRight";
import Home from "../screens/Home";
import SubScreen from "../screens/SubScreen";
import { globalStyles } from "../styles/global";
import EmergencyCalls from "../screens/EmergencyCalls";
import Geolocation from "../screens/Geolocation";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header
            title="Home"
            navigation={navigation}
            style={{ alignContent: "right" }}
          />
        ),
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight navigation={navigation} />
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
        ),
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight navigation={navigation} />
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
