import { StyleSheet } from "react-native";

export default StyleSheet.create({
  circuitsList: {
    width: "100%",
    backgroundColor: "blue",
  },
  circuitContainer: {
    backgroundColor: "green",
    marginBottom: 2,
    borderRadius: 10,
    padding: 5,
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
