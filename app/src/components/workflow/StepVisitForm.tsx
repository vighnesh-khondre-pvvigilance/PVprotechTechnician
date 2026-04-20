// src/components/workflow/StepVisitForm.tsx

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Theme } from "../../theme/theme";
import { useEffect } from "react";

type Props = {
  form: any;
  updateForm: (data: any) => void;
  onNext: () => void;
  onBack: () => void;

  /**
   * Pass logged in technician id
   * Example: TECH-1001
   */
  technicianId?: string;
};

export default function StepVisitForm({
  form,
  updateForm,
  onNext,
  onBack,
  technicianId = "TECH-1001",
}: Props) {
  const visitForm = form?.visitForm || {};

  const updateField = (
    key: string,
    value: string
  ) => {
    updateForm({
      visitForm: {
        ...visitForm,
        technicianId,
        [key]: value,
      },
    });
  };
 const today = new Date()
  .toISOString()
  .split("T")[0];

useEffect(() => {
  if (!form.visitForm.visitDate) {
    updateForm({
      visitForm: {
        ...form.visitForm,
        visitDate: today,
      },
    });
  }
}, []);
const visitDateValue =
  form?.visitForm?.visitDate ||
  new Date()
    .toISOString()
    .split("T")[0];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          Visit Details
        </Text>

        {/* Visit Date */}
        <Text style={styles.label}>
          Visit Date
        </Text>
        <TextInput
  placeholder="YYYY-MM-DD"
  style={styles.input}
  value={visitDateValue}
  onChangeText={(text) =>
    updateField(
      "visitDate",
      text
    )
  }
/>

        {/* Technician ID */}
        <Text style={styles.label}>
          Technician ID
        </Text>

        <View style={styles.readonlyBox}>
          <Text style={styles.readonlyText}>
            {technicianId}
          </Text>
        </View>

        {/* Inverter Status */}
        <Text style={styles.label}>
          Inverter Status
        </Text>
        <TextInput
          placeholder="Running / Fault / Off"
          style={styles.input}
          value={
            visitForm.inverterStatus
          }
          onChangeText={(text) =>
            updateField(
              "inverterStatus",
              text
            )
          }
        />

        {/* Inverter Remarks */}
        <Text style={styles.label}>
          Inverter Remarks
        </Text>
        <TextInput
          placeholder="Enter remarks"
          style={styles.input}
          value={
            visitForm.inverterRemarks
          }
          onChangeText={(text) =>
            updateField(
              "inverterRemarks",
              text
            )
          }
        />

        {/* Import */}
        <Text style={styles.label}>
          Import Reading
        </Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter reading"
          style={styles.input}
          value={
            visitForm.importReading
          }
          onChangeText={(text) =>
            updateField(
              "importReading",
              text
            )
          }
        />

        {/* Export */}
        <Text style={styles.label}>
          Export Reading
        </Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter reading"
          style={styles.input}
          value={
            visitForm.exportReading
          }
          onChangeText={(text) =>
            updateField(
              "exportReading",
              text
            )
          }
        />

        {/* Net */}
        <Text style={styles.label}>
          Net Reading
        </Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter reading"
          style={styles.input}
          value={
            visitForm.netReading
          }
          onChangeText={(text) =>
            updateField(
              "netReading",
              text
            )
          }
        />

        {/* Generation */}
        <Text style={styles.label}>
          Generation Reading
        </Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter reading"
          style={styles.input}
          value={
            visitForm.generationReading
          }
          onChangeText={(text) =>
            updateField(
              "generationReading",
              text
            )
          }
        />

        {/* Extra Remarks */}
        <Text style={styles.label}>
          Extra Remarks
        </Text>
        <TextInput
          placeholder="Write remarks..."
          multiline
          style={[
            styles.input,
            styles.textArea,
          ]}
          value={
            visitForm.extraRemarks
          }
          onChangeText={(text) =>
            updateField(
              "extraRemarks",
              text
            )
          }
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
      fontSize: 20,
      fontWeight: "700",
      color:
        Theme.colors.text,
      marginBottom: 16,
    },

    label: {
      fontSize: 13,
      fontWeight: "600",
      marginBottom: 6,
      color:
        Theme.colors.gray,
    },

    input: {
      borderWidth: 1,
      borderColor:
        "#ddd",
      borderRadius: 14,
      padding: 14,
      marginBottom: 12,
      backgroundColor:
        "#fff",
    },

    readonlyBox: {
      borderWidth: 1,
      borderColor:
        "#ddd",
      borderRadius: 14,
      padding: 14,
      marginBottom: 12,
      backgroundColor:
        "#F9FAFB",
    },

    readonlyText: {
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    textArea: {
      height: 110,
      textAlignVertical:
        "top",
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