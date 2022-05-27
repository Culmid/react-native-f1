import { StyleSheet } from "react-native";

export default StyleSheet.create({
  constructorsList: {
    width: "100%",
    backgroundColor: "blue",
  },
  constructorContainer: {
    backgroundColor: "green",
    marginBottom: 2,
    borderRadius: 10,
    padding: 5,
  },
  constructorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  constructorName: {
    fontWeight: "700",
    fontSize: 20,
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
