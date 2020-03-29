import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import React from "react";

// stacks
import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";

//custom button component
import CustomDrawer from "../components/CustomDrawer";

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator(
  {
    EResamont: {
      screen: HomeStack
    },
    MidataSettings: {
      screen: SettingsStack
    }
  },
  {
    contentComponent: ({ navigation }) => {
      return <CustomDrawer navigation={navigation} />;
    }
  }
);

export default createAppContainer(RootDrawerNavigator);
