import { StyleSheet } from "react-native";

export default StyleSheet.create({
  driversContainer: {
    flex: 1,
    backgroundColor: "#ff00ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  driversList: {
    width: "100%",
    backgroundColor: "blue",
  },
  driverContainer: {
    backgroundColor: "green",
    marginBottom: 2,
    borderRadius: 10,
    padding: 5,
  },
  driverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  driverHeaderDecoration: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverHeaderText: {
    fontWeight: "700",
    fontSize: 20,
  },
  dob: {
    fontStyle: "italic",
  },
  nationality: {
    fontWeight: "300",
    fontSize: 18,
  },
});
