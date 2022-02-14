import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import { useAuth } from "../contexts/auth";
import baseStyle from "../styles/base";

export default function ModalScreen() {
  const { signOut } = useAuth();

  return (
    <View style={baseStyle.container}>
      <Text style={baseStyle.title}>Modal</Text>
      <View style={baseStyle.separator} />
      <Button mode="contained" onPress={signOut}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
