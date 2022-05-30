import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "orange",
    marginBottom: 2,
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "700",
    fontSize: 40,
    textAlign: "center",
  },
  italics: {
    fontStyle: "italic",
    fontSize: 20,
  },
  bold: {
    fontWeight: "700",
    fontSize: 24,
  },
  backButton: {
    flex: 1,
    width: "100%",
  },
});
