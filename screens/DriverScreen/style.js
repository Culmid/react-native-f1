import { StyleSheet } from "react-native";

export default StyleSheet.create({
  driverContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "orange",
    marginBottom: 2,
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 40,
  },
  driverSubHeaderText: {
    fontSize: 32,
  },
  dob: {
    fontStyle: "italic",
    fontSize: 20,
  },
  nationality: {
    fontWeight: "700",
    fontSize: 24,
  },
  backButton: {
    flex: 1,
    width: "100%",
  },
});
