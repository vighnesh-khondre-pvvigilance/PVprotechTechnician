import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Switch,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Screen from "./../src/components/Screen";
import { Theme } from "./../src/theme/theme";
import { workData } from "./../src/data/work";
import { Work } from "./../src/types/work";

export default function WorkDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const work: Work | undefined = workData.find(
    (item) => item.id === id
  );

  const [step, setStep] = useState(1);

  const [approved, setApproved] = useState(false);
  const [safetyChecked, setSafetyChecked] = useState(false);
  const [cleaningDone, setCleaningDone] = useState(false);

  const [visitDate, setVisitDate] = useState("");
  const [inverterStatus, setInverterStatus] = useState("");
  const [inverterRemarks, setInverterRemarks] = useState("");

  const [importReading, setImportReading] = useState("");
  const [exportReading, setExportReading] = useState("");
  const [netReading, setNetReading] = useState("");
  const [generationReading, setGenerationReading] = useState("");

  const [extraRemarks, setExtraRemarks] = useState("");
  const [techId, setTechId] = useState("");

  const [safetyImage, setSafetyImage] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [extraPhoto, setExtraPhoto] = useState<string | null>(null);

  const [beforeCleaning, setBeforeCleaning] = useState<string[]>([]);
  const [afterCleaning, setAfterCleaning] = useState<string[]>([]);

  if (!work) {
    return (
      <Screen>
        <Text>Work not found</Text>
      </Screen>
    );
  }

  const pickSingleImage = async (
    setter: (uri: string) => void
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  const pickMultipleImages = async (
    current: string[],
    setter: (items: string[]) => void
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      allowsMultipleSelection: true,
      selectionLimit: 20,
    });

    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setter([...current, ...uris].slice(0, 20));
    }
  };

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const handleFinalSubmit = () => {
    Alert.alert(
      "Success",
      "Visit report submitted successfully",
      [
        {
          text: "OK",
          onPress: () =>
            router.replace("/(tabs)/history"),
        },
      ]
    );
  };

  const Progress = () => (
    <View style={styles.progressWrap}>
      <Text style={styles.progressText}>
        Step {step} of 5
      </Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${(step / 5) * 100}%` },
          ]}
        />
      </View>
    </View>
  );

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.title}>{work.plantName || work.title}</Text>
        <Text style={styles.sub}>{work.location}</Text>

        <Progress />

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Plant Information
              </Text>

              <Text style={styles.info}>
                Plant ID: {work.id}
              </Text>
              <Text style={styles.info}>
                Plant Name: {work.plantName || "-"}
              </Text>
              <Text style={styles.info}>
                Client Name: {work.ownerName || "-"}
              </Text>
              <Text style={styles.info}>
                Capacity: {work.capacity || "-"}
              </Text>
              <Text style={styles.info}>
                Contract: Active
              </Text>
              <Text style={styles.info}>
                Year: 3
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Instructions
              </Text>

              <Text style={styles.bullet}>
                • Wear PPE kit
              </Text>
              <Text style={styles.bullet}>
                • Capture clear meter photos
              </Text>
              <Text style={styles.bullet}>
                • Follow safety rules
              </Text>
              <Text style={styles.bullet}>
                • Get client signature
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkRow}
              onPress={() => setApproved(!approved)}
            >
              <Ionicons
                name={
                  approved
                    ? "checkbox"
                    : "square-outline"
                }
                size={22}
                color={Theme.colors.primary}
              />
              <Text style={styles.checkText}>
                I confirm I am following the above
                instructions
              </Text>
            </TouchableOpacity>

            {approved && (
              <TouchableOpacity
                style={styles.btn}
                onPress={next}
              >
                <Text style={styles.btnText}>
                  Start Site Visit
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Safety Verification
              </Text>

              <TouchableOpacity
                style={styles.checkRow}
                onPress={() =>
                  setSafetyChecked(!safetyChecked)
                }
              >
                <Ionicons
                  name={
                    safetyChecked
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={22}
                  color={Theme.colors.primary}
                />
                <Text style={styles.checkText}>
                  Helmet / Gloves / Safe Site
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() =>
                  pickSingleImage((uri) =>
                    setSafetyImage(uri)
                  )
                }
              >
                <Text>Upload Safety Photo</Text>
              </TouchableOpacity>

              {safetyImage && (
                <Image
                  source={{ uri: safetyImage }}
                  style={styles.image}
                />
              )}
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={next}
            >
              <Text style={styles.btnText}>
                Continue
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Visit Form
              </Text>

              <Input
                placeholder="Visit Date"
                value={visitDate}
                onChangeText={setVisitDate}
              />

              <Input
                placeholder="Inverter Status"
                value={inverterStatus}
                onChangeText={setInverterStatus}
              />

              <Input
                placeholder="Inverter Remarks"
                value={inverterRemarks}
                onChangeText={setInverterRemarks}
              />

              <Text style={styles.heading}>
                Meter Reading
              </Text>

              <Input
                placeholder="Import Reading"
                value={importReading}
                onChangeText={setImportReading}
              />

              <Input
                placeholder="Export Reading"
                value={exportReading}
                onChangeText={setExportReading}
              />

              <Input
                placeholder="Net Reading"
                value={netReading}
                onChangeText={setNetReading}
              />

              <Input
                placeholder="Generation Reading"
                value={generationReading}
                onChangeText={setGenerationReading}
              />

              <Input
                placeholder="Extra Remarks"
                value={extraRemarks}
                onChangeText={setExtraRemarks}
              />

              <Input
                placeholder="Technician ID"
                value={techId}
                onChangeText={setTechId}
              />
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={next}
            >
              <Text style={styles.btnText}>
                Save & Continue
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Upload Documents
              </Text>

              <UploadTile
                title="Client Signature"
                onPress={() =>
                  pickSingleImage((uri) =>
                    setSignature(uri)
                  )
                }
              />

              <UploadTile
                title="Extra Photo"
                onPress={() =>
                  pickSingleImage((uri) =>
                    setExtraPhoto(uri)
                  )
                }
              />
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={next}
            >
              <Text style={styles.btnText}>
                Upload & Continue
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <View style={styles.card}>
              <View style={styles.switchRow}>
                <Text style={styles.cardTitle}>
                  Cleaning Done
                </Text>

                <Switch
                  value={cleaningDone}
                  onValueChange={setCleaningDone}
                />
              </View>

              {cleaningDone && (
                <>
                  <UploadTile
                    title="Before Cleaning (20 max)"
                    onPress={() =>
                      pickMultipleImages(
                        beforeCleaning,
                        setBeforeCleaning
                      )
                    }
                  />

                  <Text style={styles.small}>
                    {beforeCleaning.length} images
                  </Text>

                  <UploadTile
                    title="After Cleaning (20 max)"
                    onPress={() =>
                      pickMultipleImages(
                        afterCleaning,
                        setAfterCleaning
                      )
                    }
                  />

                  <Text style={styles.small}>
                    {afterCleaning.length} images
                  </Text>
                </>
              )}
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={handleFinalSubmit}
            >
              <Text style={styles.btnText}>
                Submit Visit Report
              </Text>
            </TouchableOpacity>
          </>
        )}

        {step > 1 && step < 6 && (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={prev}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Screen>
  );
}

function Input(props: any) {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor="#888"
    />
  );
}

function UploadTile({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.uploadBox}
      onPress={onPress}
    >
      <Ionicons name="camera" size={18} />
      <Text style={{ marginLeft: 8 }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  sub: {
    color: Theme.colors.subtext,
    marginTop: 4,
    marginBottom: 12,
  },

  progressWrap: {
    marginBottom: 16,
  },

  progressText: {
    fontSize: 12,
    color: Theme.colors.subtext,
    marginBottom: 6,
  },

  progressBar: {
    height: 8,
    borderRadius: 99,
    backgroundColor: "#ddd",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: Theme.colors.primary,
  },

  card: {
    backgroundColor: Theme.colors.card,
    padding: 14,
    borderRadius: Theme.radius.lg,
    marginBottom: 14,
  },

  cardTitle: {
    fontWeight: "700",
    marginBottom: 10,
    fontSize: 15,
  },

  info: {
    fontSize: 13,
    marginBottom: 5,
  },

  bullet: {
    fontSize: 13,
    marginBottom: 6,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },

  checkText: {
    flex: 1,
    fontSize: 13,
  },

  btn: {
    backgroundColor: Theme.colors.primary,
    padding: 14,
    borderRadius: Theme.radius.lg,
    alignItems: "center",
    marginBottom: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },

  backBtn: {
    padding: 12,
    alignItems: "center",
  },

  backText: {
    color: Theme.colors.subtext,
  },

  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Theme.colors.border,
    padding: 14,
    borderRadius: Theme.radius.md,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.md,
    padding: 12,
    marginBottom: 10,
    color: Theme.colors.text,
  },

  heading: {
    fontWeight: "700",
    marginVertical: 8,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  small: {
    fontSize: 12,
    color: Theme.colors.subtext,
    marginBottom: 10,
  },
});