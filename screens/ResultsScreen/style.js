import { StyleSheet } from "react-native";

export default StyleSheet.create({
  resultsContainer: {
    flex: 1,
    backgroundColor: "#ff00ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  raceHeader: {
    width: "100%",
    backgroundColor: "orange",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  raceName: {
    fontWeight: "700",
    fontSize: 32,
  },
  raceDate: {
    fontWeight: "300",
    fontSize: 20,
    fontStyle: "italic",
  },
  raceRound: {
    fontSize: 18,
  },
  raceLocationContainer: {
    maxWidth: "90%",
  },
  raceLocationHeader: {
    fontSize: 20,
    fontWeight: "700",
  },
  raceLocationText: {
    fontSize: 18,
    marginLeft: 10,
  },
  resultsList: {
    width: "100%",
    backgroundColor: "blue",
  },
  resultContainer: {
    backgroundColor: "purple",
    marginBottom: 2,
    borderRadius: 10,
    padding: 5,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultHeaderText: {
    fontWeight: "700",
    fontSize: 18,
  },
  bold: {
    fontWeight: "700",
  },
});
