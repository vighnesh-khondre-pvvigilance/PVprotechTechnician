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
import Animated, {
  FadeInDown,
} from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";

import {
  useEffect,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen() {
  const {
    user,
    loading,
    logout,
    updateUser,
  } = useAuth();

  const [
    docsCompleted,
    setDocsCompleted,
  ] = useState<boolean | null>(
    null
  );

  const checkDocuments =
    async () => {
      const value =
        await AsyncStorage.getItem(
          "documentsCompleted"
        );

      setDocsCompleted(
        value === "true"
      );
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
        <View
          style={
            styles.loader
          }
        >
          <ActivityIndicator
            size="large"
            color={
              Theme.colors
                .primary
            }
          />
        </View>
      </Screen>
    );
  }

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "";

  const pickImage =
    async () => {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        !permission.granted
      ) {
        Alert.alert(
          "Permission required",
          "Allow gallery access"
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync(
          {
            mediaTypes:
              ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
          }
        );

      if (
        !result.canceled
      ) {
        await updateUser({
          avatar:
            result
              .assets[0]
              .uri,
        });
      }
    };

  const openCamera =
    async () => {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (
        !permission.granted
      ) {
        Alert.alert(
          "Permission required",
          "Allow camera access"
        );
        return;
      }

      const result =
        await ImagePicker.launchCameraAsync(
          {
            quality: 0.7,
          }
        );

      if (
        !result.canceled
      ) {
        await updateUser({
          avatar:
            result
              .assets[0]
              .uri,
        });
      }
    };

  const handleAvatarPress =
    () => {
      Alert.alert(
        "Upload Photo",
        "Choose option",
        [
          {
            text: "Camera",
            onPress:
              openCamera,
          },
          {
            text: "Gallery",
            onPress:
              pickImage,
          },
          {
            text: "Cancel",
            style:
              "cancel",
          },
        ]
      );
    };

  const handleLogout =
    async () => {
      await logout();

      await AsyncStorage.removeItem(
        "documentsCompleted"
      );

      router.replace("/");
    };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={
            styles.container
          }
        >
          {/* HERO */}
          <Animated.View
            entering={FadeInDown.delay(
              80
            )}
            style={
              styles.hero
            }
          >
            <View
              style={
                styles.glow1
              }
            />
            <View
              style={
                styles.glow2
              }
            />

            <TouchableOpacity
              onPress={
                handleAvatarPress
              }
            >
              <View
                style={
                  styles.avatar
                }
              >
                {user.avatar ? (
                  <Image
                    source={{
                      uri: user.avatar,
                    }}
                    style={
                      styles.avatarImage
                    }
                  />
                ) : (
                  <Text
                    style={
                      styles.avatarText
                    }
                  >
                    {
                      initials
                    }
                  </Text>
                )}

                <View
                  style={
                    styles.cameraIcon
                  }
                >
                  <Ionicons
                    name="camera"
                    size={
                      14
                    }
                    color="#fff"
                  />
                </View>
              </View>
            </TouchableOpacity>

            <Text
              style={
                styles.name
              }
            >
              {user.name}
            </Text>

            <Text
              style={
                styles.role
              }
            >
              {user.role}
            </Text>

            <View
              style={
                styles.quickStats
              }
            >
              <StatBox
                label="ID"
                value={
                  user.id
                }
              />
              <StatBox
                label="Docs"
                value={
                  docsCompleted
                    ? "Done"
                    : "Pending"
                }
              />
              <StatBox
                label="Status"
                value="Active"
              />
            </View>
          </Animated.View>

          {/* INFO */}
          <Animated.View
            entering={FadeInDown.delay(
              130
            )}
            style={
              styles.card
            }
          >
            <Text
              style={
                styles.sectionTitle
              }
            >
              Personal Info
            </Text>

            <InfoRow
              icon="mail-outline"
              label="Email"
              value={
                user.email
              }
            />

            <InfoRow
              icon="call-outline"
              label="Phone"
              value={
                user.phone
              }
            />

            <InfoRow
              icon="shield-checkmark-outline"
              label="Role"
              value={
                user.role
              }
            />
          </Animated.View>

          {/* ACTIONS */}
          <Animated.View
            entering={FadeInDown.delay(
              170
            )}
            style={
              styles.card
            }
          >
            <Text
              style={
                styles.sectionTitle
              }
            >
              Quick Actions
            </Text>

            <ActionRow
              icon="create-outline"
              label="Edit Profile"
              onPress={() =>
                router.push(
                  "/edit-profile"
                )
              }
            />

            <ActionRow
              icon={
                docsCompleted
                  ? "checkmark-circle-outline"
                  : "alert-circle-outline"
              }
              label={
                docsCompleted
                  ? "Documents Completed"
                  : "Documents Pending"
              }
              onPress={() =>
                router.push(
                  "/documents"
                )
              }
            />

            <ActionRow
              icon="settings-outline"
              label="Settings"
            />
          </Animated.View>

          {/* LOGOUT */}
          <Animated.View
            entering={FadeInDown.delay(
              210
            )}
          >
            <TouchableOpacity
              style={
                styles.logoutBtn
              }
              onPress={
                handleLogout
              }
            >
              <Ionicons
                name="log-out-outline"
                size={18}
                color="#fff"
              />

              <Text
                style={
                  styles.logoutText
                }
              >
                Logout
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const StatBox = ({
  label,
  value,
}: any) => (
  <View
    style={styles.statBox}
  >
    <Text
      style={
        styles.statValue
      }
    >
      {value}
    </Text>
    <Text
      style={
        styles.statLabel
      }
    >
      {label}
    </Text>
  </View>
);

const InfoRow = ({
  icon,
  label,
  value,
}: any) => (
  <View style={styles.row}>
    <Ionicons
      name={icon}
      size={20}
      color={
        Theme.colors
          .primary
      }
    />

    <View
      style={
        styles.rowText
      }
    >
      <Text
        style={
          styles.label
        }
      >
        {label}
      </Text>

      <Text
        style={
          styles.value
        }
      >
        {value}
      </Text>
    </View>
  </View>
);

const ActionRow = ({
  icon,
  label,
  onPress,
}: any) => (
  <TouchableOpacity
    style={
      styles.actionRow
    }
    onPress={onPress}
  >
    <View
      style={
        styles.actionLeft
      }
    >
      <Ionicons
        name={icon}
        size={20}
        color={
          Theme.colors
            .primary
        }
      />

      <Text
        style={
          styles.actionText
        }
      >
        {label}
      </Text>
    </View>

    <Ionicons
      name="chevron-forward"
      size={16}
      color="#94A3B8"
    />
  </TouchableOpacity>
);

const styles =
  StyleSheet.create({
    container: {
      paddingHorizontal: 6,
      paddingTop: 6,
      paddingBottom: 20,
    },

    loader: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    hero: {
      backgroundColor:
        Theme.colors
          .primary,
      borderRadius: 28,
      padding: 22,
      alignItems:
        "center",
      marginBottom: 14,
      overflow:
        "hidden",
    },

    glow1: {
      position:
        "absolute",
      top: -30,
      right: -20,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    glow2: {
      position:
        "absolute",
      bottom: -20,
      left: -20,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor:
        "rgba(255,255,255,0.06)",
    },

    avatar: {
      width: 105,
      height: 105,
      borderRadius: 52,
      backgroundColor:
        "#fff",
      justifyContent:
        "center",
      alignItems:
        "center",
      overflow:
        "hidden",
      marginBottom: 12,
    },

    avatarImage: {
      width: "100%",
      height: "100%",
    },

    avatarText: {
      fontSize: 28,
      fontWeight: "800",
      color:
        Theme.colors
          .primary,
    },

    cameraIcon: {
      position:
        "absolute",
      bottom: 0,
      right: 0,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor:
        "#111827",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    name: {
      fontSize: 22,
      fontWeight: "800",
      color: "#fff",
    },

    role: {
      color:
        "#DDE7FF",
      marginTop: 4,
      fontSize: 14,
      fontWeight: "600",
    },

    quickStats: {
      flexDirection:
        "row",
      gap: 10,
      marginTop: 18,
    },

    statBox: {
      backgroundColor:
        "rgba(255,255,255,0.12)",
      borderRadius: 18,
      paddingVertical: 10,
      paddingHorizontal: 16,
      alignItems:
        "center",
      minWidth: 90,
    },

    statValue: {
      color: "#fff",
      fontWeight: "800",
      fontSize: 14,
    },

    statLabel: {
      color:
        "#DDE7FF",
      fontSize: 11,
      marginTop: 2,
    },

    card: {
      backgroundColor:
        "#fff",
      borderRadius: 24,
      padding: 16,
      marginBottom: 14,
      elevation: 3,
      shadowColor:
        "#000",
      shadowOpacity: 0.04,
      shadowRadius: 8,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: "800",
      color:
        Theme.colors
          .text,
      marginBottom: 14,
    },

    row: {
      flexDirection:
        "row",
      alignItems:
        "center",
      marginBottom: 14,
    },

    rowText: {
      marginLeft: 12,
    },

    label: {
      fontSize: 12,
      color: "#94A3B8",
    },

    value: {
      fontSize: 14,
      fontWeight: "700",
      color:
        Theme.colors
          .text,
      marginTop: 2,
    },

    actionRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor:
        "#F1F5F9",
    },

    actionLeft: {
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    actionText: {
      marginLeft: 12,
      fontSize: 14,
      fontWeight: "600",
      color:
        Theme.colors
          .text,
    },

    logoutBtn: {
      backgroundColor:
        "#EF4444",
      borderRadius: 20,
      paddingVertical: 15,
      justifyContent:
        "center",
      alignItems:
        "center",
      flexDirection:
        "row",
      marginTop: 4,
    },

    logoutText: {
      color: "#fff",
      marginLeft: 8,
      fontWeight: "800",
      fontSize: 14,
    },
  });