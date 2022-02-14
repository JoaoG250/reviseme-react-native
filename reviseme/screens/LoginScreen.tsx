import { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../contexts/auth";

export default function LoginScreen() {
  const { isAuthenticated, signIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleLogin() {
    signIn({ email, password });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button onPress={handleLogin}>Login</Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
