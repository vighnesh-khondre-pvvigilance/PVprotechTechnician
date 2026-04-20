// src/components/workflow/StepSafety.tsx

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
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

  const toggleSafety = () => {
    updateForm({
      safety: {
        verified: !verified,
      },
    });
  };

  const uploadDummyImage = () => {
    updateForm({
      safety: {
        image:
          "https://images.unsplash.com/photo-1509391366360-2e959784a276",
      },
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Safety Verification
      </Text>

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

      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={uploadDummyImage}
      >
        <Text style={styles.uploadText}>
          Upload Safety Image
        </Text>
      </TouchableOpacity>

      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.preview}
        />
      ) : null}

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
    height: 180,
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