import { StyleSheet } from "react-native";

export default StyleSheet.create({
  circuitsList: {
    width: "100%",
  },
  circuitContainer: {
    backgroundColor: "orange",
    marginBottom: 2,
    borderRadius: 10,
    padding: 5,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "700",
  },
  circuitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circuitName: {
    fontWeight: "700",
    fontSize: 20,
  },
  local: {
    fontStyle: "italic",
  },
  country: {
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
