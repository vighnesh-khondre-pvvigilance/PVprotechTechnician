// src/components/workflow/StepSafety.tsx

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Theme } from "../../theme/theme";

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
  const verified = form?.safety?.verified;
  const image = form?.safety?.image;

  /* ✅ Toggle Safety */
  const toggleSafety = () => {
    updateForm({
      safety: {
        ...form?.safety,
        verified: !verified,
      },
    });
  };

  /* 📸 Pick from Gallery */
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

  /* 📷 Open Camera */
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

  /* 📷 Select Option */
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

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Safety Verification
      </Text>

      {/* PPE Checked */}
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
            verified && { color: "#fff" },
          ]}
        >
          {verified ? "✓ " : ""}PPE Checked
        </Text>
      </TouchableOpacity>

      {/* Upload Button */}
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={chooseImage}
      >
        <Text style={styles.uploadText}>
          Upload Safety Image
        </Text>
      </TouchableOpacity>

      {/* Preview */}
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.preview}
        />
      ) : null}

      {/* Buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={onBack}
        >
          <Text>Back</Text>
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
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: Theme.colors.text,
  },

  checkBox: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    marginBottom: 14,
  },

  activeBox: {
    backgroundColor: Theme.colors.primary,
  },

  checkText: {
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
    fontWeight: "600",
  },

  preview: {
    width: "100%",
    height: 190,
    borderRadius: 14,
    marginBottom: 14,
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

  btn: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});