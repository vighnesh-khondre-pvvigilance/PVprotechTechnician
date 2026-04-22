// src/components/workflow/StepCleaning.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "../../theme/theme";

const MAX_LIMIT = 20;

export default function StepCleaning({
  form,
  updateForm,
  onBack,
  onSubmit,
}: any) {
  const visitForm = form?.visitForm || {};

  const cleaning = form?.cleaning || {
    required: false,
    done: false,
    before: [],
    after: [],
  };

  /* Toggle Required */
  const toggleRequired = () => {
    updateForm({
      cleaning: {
        ...cleaning,
        required: !cleaning.required,
      },
    });
  };

  /* Toggle Done */
  const toggleDone = () => {
    updateForm({
      cleaning: {
        ...cleaning,
        done: !cleaning.done,
      },
    });
  };

  /* Add Photo */
  const savePhoto = (
    type: "before" | "after",
    uri: string
  ) => {
    updateForm({
      cleaning: {
        ...cleaning,
        [type]: [
          ...cleaning[type],
          uri,
        ],
      },
    });
  };

  const checkLimit = (
    type: "before" | "after"
  ) => {
    if (
      cleaning[type].length >=
      MAX_LIMIT
    ) {
      Alert.alert(
        "Limit Reached",
        `Maximum ${MAX_LIMIT} photos allowed`
      );
      return true;
    }
    return false;
  };

  const pickImage = async (
    type: "before" | "after"
  ) => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow gallery access."
      );
      return;
    }

    if (checkLimit(type)) return;

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

    if (!result.canceled) {
      savePhoto(
        type,
        result.assets[0].uri
      );
    }
  };

  const openCamera = async (
    type: "before" | "after"
  ) => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow camera access."
      );
      return;
    }

    if (checkLimit(type)) return;

    const result =
      await ImagePicker.launchCameraAsync({
        quality: 0.8,
        allowsEditing: true,
      });

    if (!result.canceled) {
      savePhoto(
        type,
        result.assets[0].uri
      );
    }
  };

  const addPhoto = (
    type: "before" | "after"
  ) => {
    Alert.alert(
      "Upload Photo",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: () =>
            openCamera(type),
        },
        {
          text: "Gallery",
          onPress: () =>
            pickImage(type),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const removePhoto = (
    type: "before" | "after",
    index: number
  ) => {
    const updated =
      cleaning[type].filter(
        (_: any, i: number) =>
          i !== index
      );

    updateForm({
      cleaning: {
        ...cleaning,
        [type]: updated,
      },
    });
  };

  const PhotoSection = ({
    title,
    type,
  }: any) => (
    <View style={styles.section}>
      <View style={styles.head}>
        <Text style={styles.sectionTitle}>
          {title}
        </Text>

        <Text style={styles.count}>
          {
            cleaning[type]
              .length
          }
          /20
        </Text>
      </View>

      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() =>
          addPhoto(type)
        }
      >
        <Text style={styles.uploadText}>
          + Add Photo
        </Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
      >
        {cleaning[type].map(
          (
            img: string,
            i: number
          ) => (
            <View
              key={i}
              style={
                styles.photoWrap
              }
            >
              <Image
                source={{
                  uri: img,
                }}
                style={
                  styles.photo
                }
              />

              <TouchableOpacity
                style={
                  styles.removeIcon
                }
                onPress={() =>
                  removePhoto(
                    type,
                    i
                  )
                }
              >
                <Text
                  style={{
                    color:
                      "#fff",
                    fontSize: 10,
                  }}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={
        false
      }
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          Final Review
        </Text>

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.label}>
            Inverter
          </Text>
          <Text style={styles.value}>
            {
              visitForm.inverterStatus
            }
          </Text>

          <Text style={styles.label}>
            Generation
          </Text>
          <Text style={styles.value}>
            {
              visitForm.generationReading
            }
          </Text>

          <Text style={styles.label}>
            Technician
          </Text>
          <Text style={styles.value}>
            {
              visitForm.technicianId
            }
          </Text>
        </View>

        {/* Required */}
        <TouchableOpacity
          style={[
            styles.toggle,
            cleaning.required &&
              styles.activeToggle,
          ]}
          onPress={
            toggleRequired
          }
        >
          <Text
            style={[
              styles.toggleText,
              cleaning.required && {
                color:
                  "#fff",
              },
            ]}
          >
            {cleaning.required
              ? "✓ "
              : ""}
            Cleaning Required
          </Text>
        </TouchableOpacity>

        {cleaning.required && (
          <>
            <PhotoSection
              title="Before Cleaning"
              type="before"
            />

            <PhotoSection
              title="After Cleaning"
              type="after"
            />

            <TouchableOpacity
              style={[
                styles.toggle,
                cleaning.done &&
                  styles.activeToggle,
              ]}
              onPress={
                toggleDone
              }
            >
              <Text
                style={[
                  styles.toggleText,
                  cleaning.done && {
                    color:
                      "#fff",
                  },
                ]}
              >
                {cleaning.done
                  ? "✓ "
                  : ""}
                Cleaning Completed
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Buttons */}
        <View style={styles.row}>
          <TouchableOpacity
            style={
              styles.backBtn
            }
            onPress={onBack}
          >
            <Text
              style={
                styles.backText
              }
            >
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={
              onSubmit
            }
          >
            <LinearGradient
              colors={[
                "#F59E0B",
                "#D97706",
              ]}
              style={
                styles.submitBtn
              }
            >
              <Text
                style={
                  styles.submitText
                }
              >
                Submit Visit
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        "#fff",
      padding: 18,
      borderRadius: 24,
    },

    title: {
      fontSize: 26,
      fontWeight: "800",
      marginBottom: 16,
      color:
        Theme.colors.text,
    },

    summary: {
      backgroundColor:
        "#F8FAFC",
      padding: 16,
      borderRadius: 18,
      marginBottom: 16,
    },

    label: {
      fontSize: 12,
      color:
        Theme.colors.subtext,
      marginTop: 6,
    },

    value: {
      fontSize: 15,
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    toggle: {
      backgroundColor:
        "#EEF2FF",
      padding: 15,
      borderRadius: 16,
      marginBottom: 14,
      alignItems:
        "center",
    },

    activeToggle: {
      backgroundColor:
        Theme.colors.primary,
    },

    toggleText: {
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    section: {
      marginBottom: 16,
    },

    head: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginBottom: 10,
    },

    sectionTitle: {
      fontWeight: "700",
      fontSize: 15,
      color:
        Theme.colors.text,
    },

    count: {
      fontSize: 12,
      color:
        Theme.colors.subtext,
    },

    uploadBtn: {
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      borderStyle:
        "dashed",
      padding: 14,
      borderRadius: 16,
      alignItems:
        "center",
      marginBottom: 12,
      backgroundColor:
        "#fff",
    },

    uploadText: {
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    photoWrap: {
      marginRight: 10,
      position:
        "relative",
    },

    photo: {
      width: 92,
      height: 92,
      borderRadius: 16,
    },

    removeIcon: {
      position:
        "absolute",
      top: 6,
      right: 6,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor:
        "rgba(0,0,0,0.6)",
      alignItems:
        "center",
      justifyContent:
        "center",
    },

    row: {
      flexDirection: "row",
      gap: 12,
      marginTop: 10,
    },

    backBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      borderRadius: 16,
      padding: 15,
      alignItems:
        "center",
      justifyContent:
        "center",
    },

    backText: {
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    submitBtn: {
      padding: 15,
      borderRadius: 16,
      alignItems:
        "center",
    },

    submitText: {
      color: "#fff",
      fontWeight: "800",
    },
  });