import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  titleDrawer: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333"
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20
  },
  container: {
    flex: 1,
    padding: 20
  },
  containerDrawer: {
    flex: 1,
    flexDirection: "column",
    padding: 25,
    paddingTop: 50
  },
  mapContainer: {
    flex: 1
  },
  drawerTop: {
    flex: 1
  },
  drawerButtons: {
    width: "100%",
    flex: 2,
    flexDirection: "column-reverse",
    alignItems: "flex-end"
  },
  drawerLanguageButton: {
    marginTop: 10,
    height: 40,
    width: "100%",
    padding: 10,
    backgroundColor: "#3f51b5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
