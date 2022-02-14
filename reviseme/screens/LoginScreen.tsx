import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "../contexts/auth";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleLogin() {
    signIn({ email, password });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          label="Email"
          onChangeText={(text) => setEmail(text)}
          autoComplete="email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          label="Password"
          onChangeText={(text) => setPassword(text)}
          autoComplete="password"
          autoCapitalize="none"
          secureTextEntry
        />
        <Button mode="contained" onPress={handleLogin}>
          Login
        </Button>
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
  viewContainer: {
    width: "80%",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    marginBottom: 25,
  },
});
