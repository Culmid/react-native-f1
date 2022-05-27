import { StyleSheet } from "react-native";

export default StyleSheet.create({
  driversList: {
    width: "100%",
  },
  driverContainer: {
    backgroundColor: "orange",
    marginBottom: 2,
    borderRadius: 10,
    padding: 5,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "700",
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
  paginationContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
