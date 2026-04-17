import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Screen from "./../src/components/Screen";
import { Theme } from "./../src/theme/theme";
import { workData } from "./../src/data/work";

export default function Work() {
  const [filter, setFilter] = useState<"all" | "today">("all");

  const today = new Date().toISOString().split("T")[0];

  // ✅ ONLY PENDING WORK
  const pendingWork = workData.filter(
    (item) => item.status === "Pending"
  );

  const todayWork = pendingWork.filter(
    (item) => item.assignedDate === today
  );

  const filteredData = filter === "today" ? todayWork : pendingWork;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <Screen>
      {/* 🔷 HEADER */}
      <Text style={styles.title}>Assigned Work</Text>

      {/* 📊 SUMMARY */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {pendingWork.length}
          </Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {todayWork.length}
          </Text>
          <Text style={styles.summaryLabel}>Today</Text>
        </View>
      </View>

      {/* 🔘 FILTER */}
      <View style={styles.filterContainer}>
        {["all", "today"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterTab,
              filter === item && styles.activeTab,
            ]}
            onPress={() => setFilter(item as any)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeText,
              ]}
            >
              {item === "all" ? "All Tasks" : "Today"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 📋 LIST */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="checkmark-done-outline"
              size={50}
              color={Theme.colors.subtext}
            />
            <Text style={styles.emptyText}>
              No pending tasks 🎉
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/work/${item.id}`)}
          >
            {/* TOP */}
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>{item.title}</Text>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Pending</Text>
              </View>
            </View>

            {/* LOCATION */}
            <View style={styles.row}>
              <Ionicons
                name="location-outline"
                size={14}
                color={Theme.colors.subtext}
              />
              <Text style={styles.location}>{item.location}</Text>
            </View>

            {/* DATE */}
            <View style={styles.row}>
              <Ionicons
                name="calendar-outline"
                size={14}
                color={Theme.colors.subtext}
              />
              <Text style={styles.date}>
                Assigned: {formatDate(item.assignedDate)}
              </Text>
            </View>

            {/* ACTION BUTTON */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.startBtn}
                onPress={() => router.push(`/work/${item.id}`)}
              >
                <Ionicons name="play" size={14} color="#fff" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: Theme.spacing.md,
  },

  /* SUMMARY */
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: Theme.spacing.lg,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    alignItems: "center",
  },

  summaryNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: Theme.colors.primary,
  },

  summaryLabel: {
    fontSize: 12,
    color: Theme.colors.subtext,
  },

  /* FILTER */
  filterContainer: {
    flexDirection: "row",
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.radius.lg,
    padding: 4,
    marginBottom: Theme.spacing.lg,
  },

  filterTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: Theme.radius.md,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: Theme.colors.primary,
  },

  filterText: {
    fontSize: 13,
    color: Theme.colors.subtext,
    fontWeight: "500",
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* CARD */
  card: {
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  cardTitle: {
    fontWeight: "600",
    fontSize: 15,
    flex: 1,
  },

  statusBadge: {
    backgroundColor: "#FFF4E5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  statusText: {
    color: "#FF9800",
    fontSize: 11,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },

  location: {
    fontSize: 12,
    color: Theme.colors.subtext,
  },

  date: {
    fontSize: 12,
    color: Theme.colors.subtext,
  },

  /* ACTION */
  actionRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  startText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  /* EMPTY */
  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyText: {
    marginTop: 10,
    color: Theme.colors.subtext,
  },
});