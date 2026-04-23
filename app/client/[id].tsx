// app/client/[id].tsx
// ULTRA PREMIUM CLIENT PLANTS SCREEN + FIXED PADDING + SCROLL

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import Screen from "../src/components/Screen";
import { Theme } from "../src/theme/theme";
import { workData } from "../src/data/work";

export default function ClientPlants() {
  const { id } = useLocalSearchParams();

  const currentTech = "tech001";

  const plants = workData.filter(
    (item) =>
      item.clientId === id &&
      item.technicianId === currentTech &&
      item.status === "Pending"
  );

  const clientName = plants[0]?.clientName || "Client";

  const totalPlants = plants.length;

  const urgentCount = plants.filter(
    (item) => item.priority === "High"
  ).length;

  if (plants.length === 0) {
    return (
      <Screen>
        <View style={styles.container}>
          <View style={styles.emptyWrap}>
            <Ionicons
              name="folder-open-outline"
              size={58}
              color="#94A3B8"
            />

            <Text style={styles.emptyTitle}>
              Client Not Found
            </Text>

            <Text style={styles.emptyText}>
              No pending plants assigned
            </Text>
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => router.back()}
              >
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color="#111827"
                />
              </TouchableOpacity>

              <Text style={styles.headerText}>
                Client Plants
              </Text>

              <View style={{ width: 42 }} />
            </View>

            {/* Hero */}
            <View style={styles.hero}>
              <View style={styles.glow1} />
              <View style={styles.glow2} />

              <Text style={styles.clientLabel}>
                Assigned Client
              </Text>

              <Text style={styles.clientName}>
                {clientName}
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>
                    {totalPlants}
                  </Text>
                  <Text style={styles.statText}>
                    Plants
                  </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.statBox}>
                  <Text
                    style={[
                      styles.statValue,
                      { color: "#FCA5A5" },
                    ]}
                  >
                    {urgentCount}
                  </Text>
                  <Text style={styles.statText}>
                    Urgent
                  </Text>
                </View>
              </View>
            </View>

            {/* Section */}
            <Text style={styles.sectionTitle}>
              Pending Visits
            </Text>
          </>
        }
        renderItem={({ item }) => {
          const priorityColor =
            item.priority === "High"
              ? "#DC2626"
              : item.priority === "Medium"
              ? "#F59E0B"
              : "#16A34A";

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.card}
              onPress={() =>
                router.push(`/work/${item.id}`)
              }
            >
              {/* Top */}
              <View style={styles.topRow}>
                <View style={styles.iconBox}>
                  <Ionicons
                    name="leaf-outline"
                    size={20}
                    color={
                      Theme.colors.primary
                    }
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>
                    {item.plantName}
                  </Text>

                  <Text style={styles.sub}>
                    {item.location}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#94A3B8"
                />
              </View>

              {/* Capacity */}
              <View style={styles.infoRow}>
                <Ionicons
                  name="flash-outline"
                  size={14}
                  color="#64748B"
                />

                <Text style={styles.infoText}>
                  {item.capacity}
                </Text>
              </View>

              {/* Footer */}
              <View style={styles.bottom}>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        priorityColor,
                    },
                  ]}
                >
                  <Text
                    style={
                      styles.badgeText
                    }
                  >
                    {item.priority}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    router.push(
                      `/work/${item.id}`
                    )
                  }
                >
                  <Text
                    style={
                      styles.btnText
                    }
                  >
                    Start Visit
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 30,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    marginBottom: 14,
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    fontSize: 18,
    fontWeight: "800",
    color: Theme.colors.text,
  },

  hero: {
    backgroundColor:
      Theme.colors.primary,
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,
    overflow: "hidden",
  },

  glow1: {
    position: "absolute",
    top: -30,
    right: -20,
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor:
      "rgba(255,255,255,0.08)",
  },

  glow2: {
    position: "absolute",
    bottom: -30,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor:
      "rgba(255,255,255,0.06)",
  },

  clientLabel: {
    color:
      "rgba(255,255,255,0.75)",
    fontSize: 13,
  },

  clientName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 6,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  statBox: {
    flex: 1,
  },

  divider: {
    width: 1,
    height: 38,
    backgroundColor:
      "rgba(255,255,255,0.15)",
  },

  statValue: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
  },

  statText: {
    color:
      "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Theme.colors.text,
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
    color: Theme.colors.text,
  },

  sub: {
    marginTop: 4,
    fontSize: 13,
    color:
      Theme.colors.subtext,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },

  infoText: {
    fontSize: 13,
    color: "#64748B",
  },

  bottom: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  btn: {
    backgroundColor:
      Theme.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
  },

  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "800",
    color: Theme.colors.text,
  },

  emptyText: {
    marginTop: 4,
    color:
      Theme.colors.subtext,
  },
});