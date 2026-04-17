import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

import { useAuth } from "./src/context/AuthContext";
import { mockUser } from "./src/data/user";
import { Theme } from "./src/theme/theme";
import Screen from "./src/components/Screen";

export default function Login() {
   const { login } = useAuth();

  const handleLogin = async () => {
    await login(mockUser, "dummy-token");

    // 🚀 ADD THIS
    router.replace("/(tabs)/home");
  };
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>PVprotechTechnician</Text>

        <TextInput
          placeholder="Technician ID"
          style={styles.input}
          value={id}
          onChangeText={setId}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.lg,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.md,
    backgroundColor: Theme.colors.card,
  },

  button: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    alignItems: "center",
  },

  buttonText: {
    color: Theme.colors.text,
    fontWeight: "600",
  },
});