import { StyleSheet } from "react-native";

export default StyleSheet.create({
  constructorsContainer: {
    flex: 1,
    backgroundColor: "#ff00ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
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
});
