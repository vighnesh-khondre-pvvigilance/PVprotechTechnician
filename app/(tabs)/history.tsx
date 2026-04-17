import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Screen from "./../src/components/Screen";
import { Theme } from "./../src/theme/theme";

import { Work } from "../src/types/work";
import {
  getCompletedWork,
  getTodayCompletedWork,
} from "../src/services/workService";

type FilterType = "all" | "today";

export default function History() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [data, setData] = useState<Work[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, [filter]);

  const loadData = async () => {
    try {
      setLoading(true);

      const result =
        filter === "today"
          ? await getTodayCompletedWork()
          : await getCompletedWork();

      setData(result);
    } catch (error) {
      console.log("History Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED (timezone safe)
  const formatDate = (date?: string) => {
    if (!date) return "—";

    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Screen>
      {/* 🔷 HEADER */}
      <Text style={styles.title}>Work History</Text>

      {/* 🔘 FILTER */}
      <View style={styles.filterContainer}>
        {(["all", "today"] as FilterType[]).map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterTab,
              filter === item && styles.activeTab,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeText,
              ]}
            >
              {item === "all" ? "All" : "Today"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 📋 LIST */}
      <FlatList<Work>
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="checkmark-done-circle-outline"
                size={50}
                color={Theme.colors.subtext}
              />
              <Text style={styles.emptyText}>
                No completed work yet
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/history/[id]",
                params: { id: item.id },
              })
            }
          >
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                {/* ✅ Completed Badge */}
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>
                    Completed
                  </Text>
                </View>
              </View>

              {/* 📍 Location */}
              <View style={styles.row}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={Theme.colors.subtext}
                />
                <Text style={styles.location}>
                  {item.location}
                </Text>
              </View>

              {/* 📅 Completed Date */}
              <View style={styles.row}>
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color={Theme.colors.subtext}
                />
                <Text style={styles.date}>
                  {formatDate(item.completedDate)}
                </Text>
              </View>
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
    fontSize: 12,
    color: Theme.colors.subtext,
    fontWeight: "500",
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
    elevation: 2,
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

  completedBadge: {
    backgroundColor: "#E8F7EE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  completedText: {
    color: "green",
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

  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyText: {
    marginTop: 10,
    color: Theme.colors.subtext,
  },
});