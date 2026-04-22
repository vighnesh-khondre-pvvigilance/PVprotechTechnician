// src/components/workflow/StepUpload.tsx

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

export default function StepUpload({
  form,
  updateForm,
  onNext,
  onBack,
}: any) {
  const uploads = form?.uploads || {};

  /* Gallery */
  const pickImage = async (field: string) => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow gallery access."
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

    if (!result.canceled) {
      updateForm({
        uploads: {
          ...uploads,
          [field]:
            result.assets[0].uri,
        },
      });
    }
  };

  /* Camera */
  const openCamera = async (field: string) => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow camera access."
      );
      return;
    }

    const result =
      await ImagePicker.launchCameraAsync({
        quality: 0.8,
        allowsEditing: true,
      });

    if (!result.canceled) {
      updateForm({
        uploads: {
          ...uploads,
          [field]:
            result.assets[0].uri,
        },
      });
    }
  };

  const uploadFile = (
    field: string
  ) => {
    Alert.alert(
      "Upload Image",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: () =>
            openCamera(field),
        },
        {
          text: "Gallery",
          onPress: () =>
            pickImage(field),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const removeImage = (
    field: string
  ) => {
    updateForm({
      uploads: {
        ...uploads,
        [field]: null,
      },
    });
  };

  const UploadCard = ({
    title,
    field,
  }: any) => {
    const image =
      uploads[field];

    return (
      <View style={styles.card}>
        <View
          style={styles.top}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={
                styles.cardTitle
              }
            >
              {title}
            </Text>

            <Text
              style={
                styles.cardSub
              }
            >
              {image
                ? "Uploaded successfully"
                : "Tap below to upload"}
            </Text>
          </View>

          <View
            style={[
              styles.status,
              image &&
                styles.statusDone,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                image && {
                  color:
                    "#fff",
                },
              ]}
            >
              {image
                ? "✓"
                : "+"}
            </Text>
          </View>
        </View>

        {!image ? (
          <TouchableOpacity
            activeOpacity={
              0.9
            }
            onPress={() =>
              uploadFile(
                field
              )
            }
          >
            <LinearGradient
              colors={[
                "#ffffff",
                "#f8fafc",
              ]}
              style={
                styles.uploadBox
              }
            >
              <Text
                style={
                  styles.uploadIcon
                }
              >
                ⬆
              </Text>

              <Text
                style={
                  styles.uploadText
                }
              >
                Upload Image
              </Text>

              <Text
                style={
                  styles.uploadSub
                }
              >
                Camera or
                Gallery
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <>
            <Image
              source={{
                uri: image,
              }}
              style={
                styles.preview
              }
            />

            <View
              style={
                styles.actionRow
              }
            >
              <TouchableOpacity
                style={
                  styles.lightBtn
                }
                onPress={() =>
                  uploadFile(
                    field
                  )
                }
              >
                <Text
                  style={
                    styles.lightText
                  }
                >
                  Change
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.deleteBtn
                }
                onPress={() =>
                  removeImage(
                    field
                  )
                }
              >
                <Text
                  style={
                    styles.deleteText
                  }
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={
        false
      }
      contentContainerStyle={{
       
        paddingBottom: 28,
      }}
    >
      <View
        style={styles.main}
      >
        <Text
          style={styles.title}
        >
          Upload Documents
        </Text>

        <Text
          style={styles.desc}
        >
          Clean & premium
          upload experience
          for all required
          site images
        </Text>

        <UploadCard
          title="Client Signature"
          field="clientSignature"
        />

        <UploadCard
          title="Extra Photo"
          field="extraPhoto"
        />

        <UploadCard
          title="Inverter Photo"
          field="inverterPhoto"
        />

        <UploadCard
          title="Import Meter"
          field="importPhoto"
        />

        <UploadCard
          title="Export Meter"
          field="exportPhoto"
        />

        <UploadCard
          title="Net Meter"
          field="netPhoto"
        />

        <UploadCard
          title="Generation Meter"
          field="generationPhoto"
        />

        <View
          style={styles.row}
        >
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
            style={
              styles.nextWrap
            }
            onPress={onNext}
          >
            <LinearGradient
              colors={[
                "#F59E0B",
                "#D97706",
              ]}
              style={
                styles.nextBtn
              }
            >
              <Text
                style={
                  styles.nextText
                }
              >
                Continue
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
    main: {
      backgroundColor:
        "#ffffff",
      borderRadius: 26,
      padding: 5,
    },

    title: {
      fontSize: 26,
      fontWeight: "800",
      color:
        Theme.colors.text,
      letterSpacing: 0.3,
    },

    desc: {
      marginTop: 6,
      marginBottom: 18,
      color:
        Theme.colors.subtext,
      lineHeight: 20,
    },

    card: {
      backgroundColor:
        "#ffffff",
      borderRadius: 22,
      padding: 14,
      marginBottom: 14,
      borderWidth: 1,
      borderColor:
        "#EEF2F7",
      shadowColor:
        "#000",
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 3,
    },

    top: {
      flexDirection: "row",
      alignItems:
        "center",
      marginBottom: 12,
      gap: 12,
    },

    cardTitle: {
      fontSize: 15,
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    cardSub: {
      marginTop: 4,
      fontSize: 12,
      color:
        Theme.colors.subtext,
    },

    status: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor:
        "#F1F5F9",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    statusDone: {
      backgroundColor:
        "#16A34A",
    },

    statusText: {
      fontSize: 18,
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    uploadBox: {
      height: 150,
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor:
        "#E2E8F0",
      borderStyle:
        "dashed",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    uploadIcon: {
      fontSize: 30,
    },

    uploadText: {
      marginTop: 8,
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    uploadSub: {
      marginTop: 4,
      fontSize: 12,
      color:
        Theme.colors.subtext,
    },

    preview: {
      width: "100%",
      height: 190,
      borderRadius: 18,
    },

    actionRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 12,
    },

    lightBtn: {
      flex: 1,
      padding: 13,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      alignItems:
        "center",
    },

    lightText: {
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    deleteBtn: {
      flex: 1,
      padding: 13,
      borderRadius: 14,
      backgroundColor:
        "#FEF2F2",
      alignItems:
        "center",
    },

    deleteText: {
      fontWeight: "700",
      color: "#DC2626",
    },

    row: {
      flexDirection: "row",
      gap: 12,
      marginTop: 8,
    },

    backBtn: {
      flex: 1,
      padding: 15,
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
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

    nextWrap: {
      flex: 1,
    },

    nextBtn: {
      padding: 15,
      borderRadius: 16,
      alignItems:
        "center",
    },

    nextText: {
      color: "#fff",
      fontWeight: "800",
      fontSize: 15,
    },
  });