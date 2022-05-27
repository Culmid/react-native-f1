import { StyleSheet } from "react-native";

export default StyleSheet.create({
  circuitContainer: {
    backgroundColor: "orange",
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
});
