// src/components/workflow/StepUpload.tsx

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Theme } from "../../theme/theme";

export default function StepUpload({
  form,
  updateForm,
  onNext,
  onBack,
}: any) {
  const uploads = form?.uploads || {};

  /**
   * Dummy uploader
   * Later replace with image picker / document picker
   */
  const uploadFile = (
    field: string
  ) => {
    updateForm({
      uploads: {
        ...uploads,
        [field]:
          "https://via.placeholder.com/300",
      },
    });
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
    >
      <View>
        <Text style={styles.rowTitle}>
          {title}
        </Text>

        <Text style={styles.rowSub}>
          {uploads[field]
            ? "Uploaded ✓"
            : "Tap to Upload"}
        </Text>
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

    icon: {
      fontSize: 22,
      fontWeight: "700",
      color:
        Theme.colors.primary,
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