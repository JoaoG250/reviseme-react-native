import { StyleSheet } from "react-native";

const baseStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default baseStyle;
