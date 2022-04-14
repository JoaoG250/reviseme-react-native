import { StyleSheet } from "react-native";
import { Colors } from "react-native-paper";

const listStyle = StyleSheet.create({
  noItemsAlert: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderColor: "#ccc",
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: Colors.orangeA100,
  },
});

export default listStyle;
