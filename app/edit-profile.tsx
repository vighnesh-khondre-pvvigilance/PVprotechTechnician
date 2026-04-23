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
import { Ionicons } from "@expo/vector-icons";

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

  const validate = () => {
    let valid = true;

    const newErrors = {
      name: "",
      email: "",
      phone: "",
    };

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={Theme.colors.text}
              />
            </TouchableOpacity>

            <Text style={styles.title}>Edit Profile</Text>

            <View style={{ width: 40 }} />
          </View>

          {/* Hero */}
          <View style={styles.heroCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </Text>
            </View>

            <Text style={styles.heroName}>{name || "Technician"}</Text>
            <Text style={styles.heroSub}>Update your account details</Text>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <InputField
              label="Full Name"
              icon="person-outline"
              value={name}
              onChangeText={setName}
              error={errors.name}
            />

            <InputField
              label="Email Address"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
            />

            <InputField
              label="Phone Number"
              icon="call-outline"
              value={phone}
              onChangeText={setPhone}
              error={errors.phone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Save */}
          <TouchableOpacity
            style={styles.saveBtn}
            activeOpacity={0.85}
            onPress={handleSave}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color="#fff"
            />
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

/* Input Component */
const InputField = ({
  label,
  icon,
  value,
  onChangeText,
  error,
  keyboardType = "default",
}: any) => (
  <View style={styles.inputWrap}>
    <Text style={styles.label}>{label}</Text>

    <View
      style={[
        styles.inputBox,
        error ? styles.inputError : null,
      ]}
    >
      <Ionicons
        name={icon}
        size={18}
        color="#94A3B8"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        keyboardType={keyboardType}
        placeholder={label}
        placeholderTextColor="#94A3B8"
      />
    </View>

    {error ? (
      <Text style={styles.error}>{error}</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },

  container: {
    padding: 6,
    paddingTop: 8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: Theme.colors.text,
  },

  heroCard: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 28,
    padding: 22,
    alignItems: "center",
    marginBottom: 18,
  },

  avatar: {
    width: 74,
    height: 74,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  avatarText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
  },

  heroName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  heroSub: {
    color: "rgba(255,255,255,0.75)",
    marginTop: 4,
    fontSize: 13,
  },

  formCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    marginBottom: 18,
  },

  inputWrap: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.text,
    marginBottom: 8,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 54,
  },

  inputError: {
    borderColor: "#EF4444",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: Theme.colors.text,
  },

  error: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },

  saveBtn: {
    height: 56,
    borderRadius: 18,
    backgroundColor: Theme.colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});