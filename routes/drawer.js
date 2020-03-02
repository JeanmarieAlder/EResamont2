import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

// stacks
import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack
  },
  Settings: {
    screen: SettingsStack
  }
});

export default createAppContainer(RootDrawerNavigator);
