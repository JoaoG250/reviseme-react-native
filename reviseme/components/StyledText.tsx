import { Text } from "react-native";

export function MonoText(props: Text["props"]) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}
