// src/components/workflow/StepSafety.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Theme } from "../../theme/theme";
import Screen from "../Screen";

type Props = {
  form: any;
  updateForm: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepSafety({
  form,
  updateForm,
  onNext,
  onBack,
}: Props) {
  const verified = form?.safety?.verified || false;
  const image = form?.safety?.image || null;

  /* Toggle PPE Checked */
  const toggleSafety = () => {
    updateForm({
      safety: {
        ...form?.safety,
        verified: !verified,
      },
    });
  };

  /* Pick From Gallery */
  const pickImage = async () => {
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
        quality: 0.7,
        allowsEditing: true,
      });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      updateForm({
        safety: {
          ...form?.safety,
          image: uri,
        },
      });
    }
  };

  /* Open Camera */
  const openCamera = async () => {
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
        quality: 0.7,
        allowsEditing: true,
      });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      updateForm({
        safety: {
          ...form?.safety,
          image: uri,
        },
      });
    }
  };

  /* Camera / Gallery Option */
  const chooseImage = () => {
    Alert.alert(
      "Upload Safety Image",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: openCamera,
        },
        {
          text: "Gallery",
          onPress: pickImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  /* Remove Image */
  const removeImage = () => {
    updateForm({
      safety: {
        ...form?.safety,
        image: null,
      },
    });
  };

  return (
    <Screen>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          Safety Verification
        </Text>

        {/* PPE Checkbox */}
        <TouchableOpacity
          style={[
            styles.checkBox,
            verified && styles.activeBox,
          ]}
          onPress={toggleSafety}
        >
          <Text
            style={[
              styles.checkText,
              verified && {
                color: "#fff",
              },
            ]}
          >
            {verified ? "✓ " : ""}
            PPE Checked
          </Text>
        </TouchableOpacity>

        {/* Upload Button */}
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={chooseImage}
        >
          <Text style={styles.uploadText}>
            {image
              ? "Change Safety Image"
              : "Upload Safety Image"}
          </Text>
        </TouchableOpacity>

        {/* Image Preview */}
        {image && (
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>
              Uploaded Image Preview
            </Text>

            <Image
              source={{ uri: image }}
              style={styles.preview}
            />

            <Text style={styles.successText}>
              ✓ Image Uploaded Successfully
            </Text>

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={removeImage}
            >
              <Text style={styles.removeText}>
                Remove Image
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Buttons */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={onBack}
          >
            <Text style={styles.outlineText}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={onNext}
          >
            <Text style={styles.btnText}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18,
    color: Theme.colors.text,
  },

  checkBox: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    marginBottom: 14,
  },

  activeBox: {
    backgroundColor:
      Theme.colors.primary,
  },

  checkText: {
    fontSize: 15,
    fontWeight: "600",
    color: Theme.colors.text,
  },

  uploadBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },

  uploadText: {
    textAlign: "center",
    fontWeight: "700",
    color: Theme.colors.text,
  },

  previewCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
  },

  previewTitle: {
    fontWeight: "700",
    marginBottom: 10,
    color: Theme.colors.text,
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 14,
  },

  successText: {
    marginTop: 10,
    textAlign: "center",
    color: "green",
    fontWeight: "700",
  },

  removeBtn: {
    marginTop: 12,
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 12,
  },

  removeText: {
    textAlign: "center",
    color: "#DC2626",
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },

  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  outlineText: {
    fontWeight: "600",
    color: Theme.colors.text,
  },

  btn: {
    flex: 1,
    backgroundColor:
      Theme.colors.primary,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});