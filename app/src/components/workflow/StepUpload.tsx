// src/components/workflow/StepUpload.tsx

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
import { Theme } from "../../theme/theme";

export default function StepUpload({
  form,
  updateForm,
  onNext,
  onBack,
}: any) {
  const uploads = form?.uploads || {};

  /* 📸 Pick From Gallery */
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
        quality: 0.7,
        allowsEditing: true,
      });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      updateForm({
        uploads: {
          ...uploads,
          [field]: uri,
        },
      });
    }
  };

  /* 📷 Open Camera */
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
        quality: 0.7,
        allowsEditing: true,
      });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      updateForm({
        uploads: {
          ...uploads,
          [field]: uri,
        },
      });
    }
  };

  /* 📂 Choose Source */
  const uploadFile = (field: string) => {
    Alert.alert(
      "Upload File",
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

  const Row = ({
    title,
    field,
  }: any) => (
    <TouchableOpacity
      style={styles.uploadRow}
      onPress={() =>
        uploadFile(field)
      }
      activeOpacity={0.8}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>

        <Text style={styles.rowSub}>
          {uploads[field]
            ? "Uploaded ✓"
            : "Tap to Upload"}
        </Text>

        {uploads[field] ? (
          <Image
            source={{
              uri: uploads[field],
            }}
            style={styles.preview}
          />
        ) : null}
      </View>

      <Text style={styles.icon}>
        {uploads[field]
          ? "✓"
          : "+"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={
        false
      }
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          Upload Documents
        </Text>

        <Text style={styles.desc}>
          Upload all required
          documents & photos
        </Text>

        <Row
          title="Client Signature"
          field="clientSignature"
        />

        <Row
          title="Extra Photo"
          field="extraPhoto"
        />

        <Row
          title="Inverter Photo"
          field="inverterPhoto"
        />

        <Row
          title="Import Meter Photo"
          field="importPhoto"
        />

        <Row
          title="Export Meter Photo"
          field="exportPhoto"
        />

        <Row
          title="Net Meter Photo"
          field="netPhoto"
        />

        <Row
          title="Generation Photo"
          field="generationPhoto"
        />

        {/* Buttons */}
        <View style={styles.row}>
          <TouchableOpacity
            style={
              styles.outlineBtn
            }
            onPress={onBack}
          >
            <Text>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={onNext}
          >
            <Text
              style={
                styles.btnText
              }
            >
              Continue
            </Text>
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
      borderRadius: 18,
    },

    title: {
      fontSize: 22,
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    desc: {
      color:
        Theme.colors.gray,
      marginTop: 6,
      marginBottom: 18,
    },

    uploadRow: {
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      borderRadius: 14,
      padding: 14,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    rowTitle: {
      fontSize: 15,
      fontWeight: "600",
      color:
        Theme.colors.text,
    },

    rowSub: {
      marginTop: 4,
      fontSize: 12,
      color:
        Theme.colors.gray,
    },

    preview: {
      width: 70,
      height: 70,
      borderRadius: 10,
      marginTop: 10,
    },

    icon: {
      fontSize: 22,
      fontWeight: "700",
      color:
        Theme.colors.primary,
      marginLeft: 10,
    },

    row: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
    },

    outlineBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor:
        "#ddd",
      padding: 14,
      borderRadius: 14,
      alignItems:
        "center",
    },

    btn: {
      flex: 1,
      backgroundColor:
        Theme.colors.primary,
      padding: 14,
      borderRadius: 14,
      alignItems:
        "center",
    },

    btnText: {
      color: "#fff",
      fontWeight: "700",
    },
  });