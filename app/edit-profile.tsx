import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Screen from "./src/components/Screen";
import { Theme } from "./src/theme/theme";
import { useAuth } from "./src/context/AuthContext";
import { router } from "expo-router";

export default function EditProfile() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // 🔍 Validation
  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", phone: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!email.includes("@")) {
      newErrors.email = "Invalid email";
      valid = false;
    }

    if (phone.length < 10) {
      newErrors.phone = "Invalid phone number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // 💾 Save
  const handleSave = async () => {
    if (!validate()) return;

    await updateUser({
      name,
      email,
      phone,
    });

    Alert.alert("Success", "Profile updated");
    router.back();
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Edit Profile</Text>

          {/* NAME */}
          <InputField
            label="Name"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

          {/* EMAIL */}
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          {/* PHONE */}
          <InputField
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            error={errors.phone}
          />

          {/* SAVE */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

/* 🔹 Input Component */
const InputField = ({
  label,
  value,
  onChangeText,
  error,
  keyboardType = "default",
}: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>

    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, error && { borderColor: "red" }]}
      keyboardType={keyboardType}
    />

    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.lg,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: Theme.spacing.lg,
  },

  inputContainer: {
    marginBottom: Theme.spacing.md,
  },

  label: {
    fontSize: 12,
    marginBottom: 4,
    color: Theme.colors.textSecondary,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.md,
  },

  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },

  saveBtn: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginTop: Theme.spacing.lg,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});