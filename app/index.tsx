import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Screen from "./src/components/Screen";
import { Theme } from "./src/theme/theme";
import { useAuth } from "./src/context/AuthContext";
import { mockUser } from "./src/data/user";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const handleLogin = async () => {
    await login(mockUser, "dummy-token");
    router.replace("/(tabs)/home");
  };

  return (
    <Screen>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.container}>
            {/* Top Brand */}
            <View style={styles.brandWrap}>
              <View style={styles.logoBox}>
                <Ionicons
                  name="flash"
                  size={24}
                  color="#fff"
                />
              </View>

              <Text style={styles.brand}>
                PVprotech
              </Text>

              <Text style={styles.caption}>
                Technician Portal
              </Text>
            </View>

            {/* Card */}
            <View style={styles.card}>
              <Text style={styles.heading}>
                Sign In
              </Text>

              <Text style={styles.subheading}>
                Access your assigned work,
                reports and daily tasks.
              </Text>

              {/* ID */}
              <Text style={styles.label}>
                Technician ID
              </Text>

              <View style={styles.inputWrap}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color="#94A3B8"
                />

                <TextInput
                  placeholder="Enter technician ID"
                  placeholderTextColor="#94A3B8"
                  value={id}
                  onChangeText={setId}
                  style={styles.input}
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <Text style={styles.label}>
                Password
              </Text>

              <View style={styles.inputWrap}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#94A3B8"
                />

                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secure}
                  style={styles.input}
                />

                <TouchableOpacity
                  onPress={() =>
                    setSecure(!secure)
                  }
                >
                  <Ionicons
                    name={
                      secure
                        ? "eye-off-outline"
                        : "eye-outline"
                    }
                    size={18}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot */}
              <TouchableOpacity
                style={styles.forgotWrap}
              >
                <Text style={styles.forgot}>
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* Login */}
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>
                  Login
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* Bottom */}
            <Text style={styles.bottomText}>
              Secure internal access only
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },

  container: {
    padding: 18,
  },

  brandWrap: {
    marginBottom: 26,
  },

  logoBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: Theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  brand: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
  },

  caption: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  subheading: {
    marginTop: 6,
    marginBottom: 22,
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },

  inputWrap: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#0F172A",
  },

  forgotWrap: {
    alignSelf: "flex-end",
    marginBottom: 18,
    marginTop: -4,
  },

  forgot: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.primary,
  },

  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: Theme.colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  bottomText: {
    textAlign: "center",
    marginTop: 22,
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
  },
});