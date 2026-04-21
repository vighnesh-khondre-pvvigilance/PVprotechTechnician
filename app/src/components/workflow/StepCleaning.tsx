// src/components/workflow/StepCleaning.tsx

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

  /* Pick Image */
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

    if (
      cleaning[type].length >=
      MAX_LIMIT
    ) {
      Alert.alert(
        "Limit Reached",
        `Maximum ${MAX_LIMIT} photos allowed`
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
        cleaning: {
          ...cleaning,
          [type]: [
            ...cleaning[type],
            uri,
          ],
        },
      });
    }
  };

  /* Camera */
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

    if (
      cleaning[type].length >=
      MAX_LIMIT
    ) {
      Alert.alert(
        "Limit Reached",
        `Maximum ${MAX_LIMIT} photos allowed`
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
        cleaning: {
          ...cleaning,
          [type]: [
            ...cleaning[type],
            uri,
          ],
        },
      });
    }
  };

  /* Choose Source */
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

        {/* If Required */}
        {cleaning.required && (
          <>
            {/* Before */}
            <TouchableOpacity
              style={
                styles.uploadBtn
              }
              onPress={() =>
                addPhoto(
                  "before"
                )
              }
            >
              <Text>
                Before Photos (
                {
                  cleaning
                    .before
                    .length
                }
                /20)
              </Text>
            </TouchableOpacity>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              style={{
                marginBottom: 12,
              }}
            >
              {cleaning.before.map(
                (
                  img: string,
                  i: number
                ) => (
                  <Image
                    key={i}
                    source={{
                      uri: img,
                    }}
                    style={
                      styles.photo
                    }
                  />
                )
              )}
            </ScrollView>

            {/* After */}
            <TouchableOpacity
              style={
                styles.uploadBtn
              }
              onPress={() =>
                addPhoto(
                  "after"
                )
              }
            >
              <Text>
                After Photos (
                {
                  cleaning
                    .after
                    .length
                }
                /20)
              </Text>
            </TouchableOpacity>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              style={{
                marginBottom: 12,
              }}
            >
              {cleaning.after.map(
                (
                  img: string,
                  i: number
                ) => (
                  <Image
                    key={i}
                    source={{
                      uri: img,
                    }}
                    style={
                      styles.photo
                    }
                  />
                )
              )}
            </ScrollView>

            {/* Completed */}
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
      marginBottom: 10,
      alignItems:
        "center",
    },

    photo: {
      width: 85,
      height: 85,
      borderRadius: 12,
      marginRight: 8,
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