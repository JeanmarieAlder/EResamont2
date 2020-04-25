import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../components/Header";
import MidataSettings from "../screens/MidataSettings";
import MyData from "../screens/MyData";
import { globalStyles } from "../styles/global";

import HeaderLeft from "../components/HeaderLeft";
import HeaderRight from "../components/HeaderRight";
const screens = {
  MidataSettings: {
    screen: MidataSettings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title={"Midata"} navigation={navigation} />,
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight navigation={navigation} />
      };
    }
  },
  MyData: {
    screen: MyData,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title={"My Data"} navigation={navigation} />,
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight navigation={navigation} />
      };
    }
  }
};

const SettingsStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: globalStyles.headerStyle,
    headerTintColor: "black"
  }
});

export default SettingsStack;
