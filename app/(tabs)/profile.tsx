import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  
  ScrollView,
  Image,
  Alert,
} from "react-native";
import Screen from "../src/components/Screen";
import { Theme } from "../src/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../src/context/AuthContext";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";

import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen() {
  const { user, loading, logout, updateUser } = useAuth();

  const [docsCompleted, setDocsCompleted] = useState<boolean | null>(null);

  /* 📄 Check Documents */
  const checkDocuments = async () => {
    const value = await AsyncStorage.getItem("documentsCompleted");
    setDocsCompleted(value === "true");
  };

  useEffect(() => {
    checkDocuments();
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkDocuments();
    }, [])
  );

  if (loading || !user) {
    return (
      <Screen>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        </View>
      </Screen>
    );
  }

  const initials =
    user.name?.split(" ").map((n) => n[0]).join("") || "";

  /* 📸 Pick from Gallery */
  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow gallery access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await updateUser({ avatar: uri });
    }
  };

  /* 📷 Open Camera */
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow camera access");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await updateUser({ avatar: uri });
    }
  };

  /* 🧠 Avatar Click */
  const handleAvatarPress = () => {
    Alert.alert("Upload Photo", "Choose option", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleLogout = async () => {
    await logout();
    await AsyncStorage.removeItem("documentsCompleted");
    router.replace("/");
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 🔵 HERO */}
        <Animated.View entering={FadeInDown.delay(80)} style={styles.hero}>
          
          <TouchableOpacity onPress={handleAvatarPress}>
            <View style={styles.avatar}>
              {user.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  style={styles.avatarImage}
                />
              ) : (
                <Text style={styles.avatarText}>{initials}</Text>
              )}

              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={14} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>
        </Animated.View>

        {/* 🧾 INFO */}
        <Animated.View entering={FadeInDown.delay(120)} style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Info</Text>

          <InfoRow icon="mail-outline" label="Email" value={user.email} />
          <InfoRow icon="call-outline" label="Phone" value={user.phone} />
          <InfoRow icon="id-card-outline" label="User ID" value={user.id} />
        </Animated.View>

        {/* ⚙️ ACTIONS */}
        <Animated.View entering={FadeInDown.delay(160)} style={styles.card}>
          <Text style={styles.sectionTitle}>Actions</Text>

          <ActionRow
            icon="create-outline"
            label="Edit Profile"
            onPress={() => router.push("/edit-profile")}
          />

          {/* 📄 DOCUMENTS (NEW) */}
          <ActionRow
            icon={
              docsCompleted
                ? "checkmark-circle-outline"
                : "alert-circle-outline"
            }
            label={
              docsCompleted
                ? "Documents (Completed)"
                : "Documents (Pending)"
            }
            onPress={() => router.push("/documents")}
          />

          <ActionRow
            icon="settings-outline"
            label="Settings"
            onPress={() => console.log("Settings")}
          />
        </Animated.View>

        {/* 🚪 LOGOUT */}
        <Animated.View entering={FadeInDown.delay(200)}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </Screen>
  );
}

/* 🔹 Info Row */
const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <View style={styles.row}>
    <Ionicons name={icon} size={20} color={Theme.colors.primary} />
    <View style={styles.rowText}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

/* 🔹 Action Row */
const ActionRow = ({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.actionRow} onPress={onPress}>
    <View style={styles.actionLeft}>
      <Ionicons name={icon} size={20} color={Theme.colors.primary} />
      <Text style={styles.actionText}>{label}</Text>
    </View>

    <Ionicons name="chevron-forward" size={16} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  hero: {
    alignItems: "center",
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.xl,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Theme.colors.primary,
    padding: 6,
    borderRadius: 20,
  },

  avatarText: {
    color: Theme.colors.primary,
    fontSize: 28,
    fontWeight: "bold",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  role: {
    fontSize: 14,
    color: "#E0E7FF",
    marginTop: 4,
  },

  card: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    elevation: 2,
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: Theme.spacing.sm,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },

  rowText: {
    marginLeft: 12,
  },

  label: {
    fontSize: 12,
    color: Theme.colors.text,
  },

  value: {
    fontSize: 14,
    fontWeight: "500",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Theme.spacing.sm,
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionText: {
    marginLeft: 12,
    fontSize: 14,
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginTop: Theme.spacing.md,
  },

  logoutText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },
});