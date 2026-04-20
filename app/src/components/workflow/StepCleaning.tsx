// src/components/workflow/StepCleaning.tsx

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Theme } from "../../theme/theme";

export default function StepCleaning({
  form,
  updateForm,
  onBack,
  onSubmit,
}: any) {
  const visitForm =
    form?.visitForm || {};

  const cleaning =
    form?.cleaning || {
      required: false,
      done: false,
      before: [],
      after: [],
    };

  const toggleRequired =
    () => {
      updateForm({
        cleaning: {
          ...cleaning,
          required:
            !cleaning.required,
        },
      });
    };

  const toggleDone =
    () => {
      updateForm({
        cleaning: {
          ...cleaning,
          done:
            !cleaning.done,
        },
      });
    };

  const addBeforePhoto =
    () => {
      updateForm({
        cleaning: {
          ...cleaning,
          before: [
            ...cleaning.before,
            "before.jpg",
          ],
        },
      });
    };

  const addAfterPhoto =
    () => {
      updateForm({
        cleaning: {
          ...cleaning,
          after: [
            ...cleaning.after,
            "after.jpg",
          ],
        },
      });
    };

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
          Final Review
        </Text>

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.text}>
            Inverter Status:{" "}
            {
              visitForm.inverterStatus
            }
          </Text>

          <Text style={styles.text}>
            Generation:{" "}
            {
              visitForm.generationReading
            }
          </Text>

          <Text style={styles.text}>
            Technician:{" "}
            {
              visitForm.technicianId
            }
          </Text>
        </View>

        {/* Cleaning Required */}
        <TouchableOpacity
          style={[
            styles.checkBox,
            cleaning.required &&
              styles.activeCheck,
          ]}
          onPress={
            toggleRequired
          }
        >
          <Text
            style={[
              styles.checkText,
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

        {/* If Cleaning Required */}
        {cleaning.required && (
          <>
            <TouchableOpacity
              style={
                styles.uploadBtn
              }
              onPress={
                addBeforePhoto
              }
            >
              <Text>
                Before Photos (
                {
                  cleaning
                    .before
                    .length
                }
                )
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                styles.uploadBtn
              }
              onPress={
                addAfterPhoto
              }
            >
              <Text>
                After Photos (
                {
                  cleaning.after
                    .length
                }
                )
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.checkBox,
                cleaning.done &&
                  styles.activeCheck,
              ]}
              onPress={
                toggleDone
              }
            >
              <Text
                style={[
                  styles.checkText,
                  cleaning.done && {
                    color:
                      "#fff",
                  },
                ]}
              >
                {cleaning.done
                  ? "✓ "
                  : ""}
                Cleaning
                Completed
              </Text>
            </TouchableOpacity>
          </>
        )}

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
            onPress={
              onSubmit
            }
          >
            <Text
              style={
                styles.btnText
              }
            >
              Submit Visit
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
      marginBottom: 16,
      color:
        Theme.colors.text,
    },

    summary: {
      backgroundColor:
        "#F9FAFB",
      padding: 14,
      borderRadius: 14,
      marginBottom: 16,
    },

    text: {
      marginBottom: 8,
      fontWeight: "500",
    },

    checkBox: {
      backgroundColor:
        "#EEF2FF",
      padding: 15,
      borderRadius: 14,
      marginBottom: 12,
    },

    activeCheck: {
      backgroundColor:
        Theme.colors.primary,
    },

    checkText: {
      fontWeight: "700",
      textAlign:
        "center",
    },

    uploadBtn: {
      borderWidth: 1,
      borderColor:
        "#ddd",
      padding: 14,
      borderRadius: 14,
      marginBottom: 12,
      alignItems:
        "center",
    },

    row: {
      flexDirection: "row",
      gap: 10,
      marginTop: 16,
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