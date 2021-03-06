import { StyleSheet, Platform } from "react-native";
// const themeColorPrimary = "#3f51b5";
export const themeColorPrimary = "#232323";
export const themeColorSecondary = "#ffffff";
export const globalFont =
  Platform.OS === "ios" ? "EuphemiaUCAS-Bold" : "sans-serif-medium";

const buttonTheme = {
  marginTop: 10,
  padding: 10,
  height: 40,
  backgroundColor: themeColorPrimary,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center"
};
export const globalStyles = StyleSheet.create({
  mountainBackgroundImage: {
    width: "100%",
    height: "100%"
  },
  headerLeftStyle: { marginLeft: 12 },
  headerRightStyle: { flexDirection: "row", marginRight: 12 },
  headerStyle: {
    backgroundColor: themeColorSecondary,
    height: 70
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 17,
    color: themeColorPrimary,
    marginLeft: 5,
    fontFamily: globalFont
  },
  headerIcon: {
    color: themeColorPrimary
  },

  paragraph: {
    marginVertical: 8,
    lineHeight: 20
  },
  container: {
    flex: 1,
    padding: 20
  },
  drawerContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 25,
    paddingTop: 50
  },
  drawerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: themeColorPrimary,
    fontFamily: globalFont
  },
  drawerTop: {
    flex: 1,
    backgroundColor: "rgba(255,255,255, 0.7)",
    padding: 10,
    borderRadius: 5,
    borderColor: themeColorPrimary,
    borderStyle: "solid",
    borderWidth: 0.7
  },
  drawerTopMenu: { marginTop: 25 },
  drawwerTopMenuText: {
    fontFamily: globalFont,
    fontSize: 16,
    textAlign: "left",
    color: themeColorPrimary
  },
  drawwerTopMenuTextBold: {
    fontFamily: globalFont,
    fontSize: 16,
    textAlign: "left",
    color: themeColorPrimary,
    fontWeight: "bold"
  },
  drawerButtons: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "flex-end"
  },
  drawerLanguageButton: {
    ...buttonTheme,
    width: "100%"
  },
  button: {
    ...buttonTheme,
    width: "80%"
  },
  midataButton: {
    ...buttonTheme,
    width: "80%"
  },
  locationButton: {
    ...buttonTheme,
    width: "50%",
    alignSelf: "center"
  },
  text: {
    color: themeColorSecondary,
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: globalFont
  },
  topMenuDivider: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 10
  },
  mapContainer: {
    flexGrow: 1
  }
});
