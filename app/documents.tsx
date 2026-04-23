import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Screen from "./src/components/Screen";
import { Theme } from "./src/theme/theme";

/* ================= MAIN ================= */

export default function DocumentsScreen() {
  const [selectedClients, setSelectedClients] =
    useState<string[]>([
      "Ruturaj Deshmukh",
    ]);

  const clients = [
    "Ruturaj Deshmukh",
    "Amit Patil",
    "Sanket Jadhav",
    "Rohan Kale",
  ];

  const historyData = [
    {
      client: "Ruturaj Deshmukh",
      plant: "25kW Rooftop Plant",
      date: "15 Apr 2026",
      status: "Online",
    },
    {
      client: "Amit Patil",
      plant: "15kW Solar Plant",
      date: "10 Apr 2026",
      status: "Maintenance",
    },
  ];

  const addClient = (name: string) => {
    if (!selectedClients.includes(name)) {
      setSelectedClients([
        ...selectedClients,
        name,
      ]);
    }
  };

  const removeClient = (
    name: string
  ) => {
    setSelectedClients(
      selectedClients.filter(
        (c) => c !== name
      )
    );
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.container
        }
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.glow1} />
          <View style={styles.glow2} />

          <Text
            style={styles.heroSmall}
          >
            Technician Panel
          </Text>

          <Text
            style={styles.heroTitle}
          >
            Documents Center
          </Text>

          <Text
            style={styles.heroSub}
          >
            Manage profile,
            certifications and
            client allocation
          </Text>
        </View>

        {/* Upload Section */}
        <Text style={styles.section}>
          Upload Documents
        </Text>

        <UploadBox
          title="Profile Image"
          type="image"
          icon="person-circle-outline"
        />

        <UploadBox
          title="Company ID Card"
          icon="card-outline"
        />

        <UploadBox
          title="Aadhar Card"
          icon="document-text-outline"
        />

        <UploadBox
          title="Medical Certificate"
          icon="medkit-outline"
        />

        <UploadBox
          title="Vertigo Test"
          icon="pulse-outline"
        />

        <UploadBox
          title="Driving License"
          icon="car-outline"
        />

        <UploadBox
          title="Extra Document"
          icon="folder-open-outline"
        />

        {/* Clients */}
        <Text style={styles.section}>
          Assign Clients
        </Text>

        <Text style={styles.hint}>
          Already selected clients
          are disabled
        </Text>

        <View style={styles.clientWrap}>
          {clients.map((item) => {
            const disabled =
              selectedClients.includes(
                item
              );

            return (
              <TouchableOpacity
                key={item}
                disabled={
                  disabled
                }
                onPress={() =>
                  addClient(
                    item
                  )
                }
                style={[
                  styles.clientChip,
                  disabled &&
                    styles.clientDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.clientText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Allocated */}
        <Text style={styles.section}>
          Allocated Clients
        </Text>

        {selectedClients.map(
          (item) => (
            <AllocatedCard
              key={item}
              name={item}
              onRemove={() =>
                removeClient(
                  item
                )
              }
            />
          )
        )}

        {/* History */}
        <Text style={styles.section}>
          Work History
        </Text>

        {historyData.map(
          (item, i) => (
            <HistoryCard
              key={i}
              {...item}
            />
          )
        )}
      </ScrollView>
    </Screen>
  );
}

/* ================= COMPONENTS ================= */

function UploadBox({
  title,
  icon,
  type = "pdf",
}: any) {
  return (
    <View style={styles.card}>
      <View
        style={
          styles.rowBetween
        }
      >
        <View
          style={
            styles.row
          }
        >
          <View
            style={
              styles.iconBox
            }
          >
            <Ionicons
              name={icon}
              size={18}
              color={
                Theme.colors
                  .primary
              }
            />
          </View>

          <View>
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
              Max 10MB •{" "}
              {type ===
              "image"
                ? "Image"
                : "PDF"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={
            styles.uploadBtn
          }
        >
          <Ionicons
            name="cloud-upload-outline"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AllocatedCard({
  name,
  onRemove,
}: any) {
  return (
    <View style={styles.card}>
      <View
        style={
          styles.rowBetween
        }
      >
        <View>
          <Text
            style={
              styles.cardTitle
            }
          >
            {name}
          </Text>

          <Text
            style={
              styles.cardSub
            }
          >
            Assigned • 15 Apr
            2026
          </Text>
        </View>

        <TouchableOpacity
          onPress={
            onRemove
          }
          style={
            styles.removeBtn
          }
        >
          <Text
            style={
              styles.removeText
            }
          >
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HistoryCard({
  client,
  plant,
  date,
  status,
}: any) {
  return (
    <View style={styles.card}>
      <Text
        style={
          styles.cardTitle
        }
      >
        {client}
      </Text>

      <Text
        style={
          styles.cardSub
        }
      >
        {plant}
      </Text>

      <View
        style={[
          styles.rowBetween,
          {
            marginTop: 10,
          },
        ]}
      >
        <Text
          style={
            styles.smallText
          }
        >
          {date}
        </Text>

        <View
          style={
            styles.status
          }
        >
          <Text
            style={
              styles.statusText
            }
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles =
  StyleSheet.create({
    container: {
      paddingHorizontal: 6,
      paddingTop: 6,
      paddingBottom: 40,
    },

    hero: {
      backgroundColor:
        Theme.colors.primary,
      borderRadius: 26,
      padding: 18,
      marginBottom: 18,
      overflow:
        "hidden",
    },

    glow1: {
      position:
        "absolute",
      top: -30,
      right: -20,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    glow2: {
      position:
        "absolute",
      bottom: -30,
      left: -20,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor:
        "rgba(255,255,255,0.05)",
    },

    heroSmall: {
      color:
        "rgba(255,255,255,0.75)",
      fontSize: 13,
    },

    heroTitle: {
      color: "#fff",
      fontSize: 26,
      fontWeight:
        "800",
      marginTop: 6,
    },

    heroSub: {
      color:
        "rgba(255,255,255,0.8)",
      marginTop: 8,
      lineHeight: 20,
    },

    section: {
      fontSize: 18,
      fontWeight:
        "800",
      color:
        Theme.colors.text,
      marginBottom: 12,
      marginTop: 4,
    },

    hint: {
      color: "#64748B",
      fontSize: 12,
      marginBottom: 10,
    },

    card: {
      backgroundColor:
        "#fff",
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 8,
    },

    row: {
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    rowBetween: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    iconBox: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor:
        "#EEF2FF",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginRight: 12,
    },

    cardTitle: {
      fontSize: 15,
      fontWeight:
        "700",
      color:
        Theme.colors.text,
    },

    cardSub: {
      fontSize: 12,
      color: "#64748B",
      marginTop: 4,
    },

    uploadBtn: {
      width: 40,
      height: 40,
      borderRadius: 14,
      backgroundColor:
        Theme.colors.primary,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    clientWrap: {
      flexDirection:
        "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 8,
    },

    clientChip: {
      backgroundColor:
        "#EEF2FF",
      paddingHorizontal: 12,
      paddingVertical: 9,
      borderRadius: 30,
    },

    clientDisabled: {
      opacity: 0.45,
    },

    clientText: {
      color:
        Theme.colors.primary,
      fontWeight:
        "600",
      fontSize: 13,
    },

    removeBtn: {
      backgroundColor:
        "#FEF2F2",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },

    removeText: {
      color: "#DC2626",
      fontSize: 12,
      fontWeight:
        "700",
    },

    smallText: {
      color: "#64748B",
      fontSize: 12,
    },

    status: {
      backgroundColor:
        "#DCFCE7",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },

    statusText: {
      color: "#16A34A",
      fontSize: 12,
      fontWeight:
        "700",
    },
  });