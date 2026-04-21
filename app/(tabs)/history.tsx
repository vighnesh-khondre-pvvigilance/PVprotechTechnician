// app/(tabs)/history.tsx

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
  const [filter, setFilter] =
    useState<FilterType>("all");

  const [data, setData] =
    useState<Work[]>([]);

  const [loading, setLoading] =
    useState(true);

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (
    date?: string
  ) => {
    if (!date) return "—";

    return new Date(
      date + "T00:00:00"
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* Dummy approval logic */
  const getApprovalStatus = (
    id: string
  ) => {
    const approvedIds = [
      "1",
      "3",
      "5",
    ];

    return approvedIds.includes(id)
      ? "Approved"
      : "Not Approved";
  };

  return (
    <Screen>
      <Text style={styles.title}>
        Work History
      </Text>

      {/* Filter */}
      <View
        style={
          styles.filterContainer
        }
      >
        {(
          [
            "all",
            "today",
          ] as FilterType[]
        ).map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterTab,
              filter === item &&
                styles.activeTab,
            ]}
            onPress={() =>
              setFilter(item)
            }
          >
            <Text
              style={[
                styles.filterText,
                filter === item &&
                  styles.activeText,
              ]}
            >
              {item === "all"
                ? "All"
                : "Today"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) =>
          item.id
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        ListEmptyComponent={
          !loading ? (
            <View
              style={
                styles.emptyContainer
              }
            >
              <Ionicons
                name="folder-open-outline"
                size={52}
                color={
                  Theme.colors
                    .subtext
                }
              />
              <Text
                style={
                  styles.emptyText
                }
              >
                No history found
              </Text>
            </View>
          ) : null
        }
        renderItem={({
          item,
        }) => {
         const approval =
  item.adminApproval ||
  "Pending";

const isApproved =
  approval === "Approved";

         

          return (
            <TouchableOpacity
              activeOpacity={
                0.85
              }
              onPress={() =>
                router.push({
                  pathname:
                    "/history/[id]",
                  params: {
                    id: item.id,
                  },
                })
              }
            >
              <View
                style={
                  styles.card
                }
              >
                {/* Top */}
                <View
                  style={
                    styles.cardTop
                  }
                >
                  <Text
                    style={
                      styles.cardTitle
                    }
                  >
                    {item.title}
                  </Text>

                  <View
                    style={
                      styles.completedBadge
                    }
                  >
                    <Text
                      style={
                        styles.completedText
                      }
                    >
                      Completed
                    </Text>
                  </View>
                </View>

                {/* Location */}
                <View
                  style={
                    styles.row
                  }
                >
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={
                      Theme
                        .colors
                        .subtext
                    }
                  />

                  <Text
                    style={
                      styles.location
                    }
                  >
                    {
                      item.location
                    }
                  </Text>
                </View>

                {/* Date */}
                <View
                  style={
                    styles.row
                  }
                >
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color={
                      Theme
                        .colors
                        .subtext
                    }
                  />

                  <Text
                    style={
                      styles.date
                    }
                  >
                    {formatDate(
                      item.completedDate
                    )}
                  </Text>
                </View>

                {/* Approval Status */}
                <View
                  style={[
                    styles.statusBox,
                    isApproved
                      ? styles.approvedBox
                      : styles.pendingBox,
                  ]}
                >
                  <Ionicons
                    name={
                      isApproved
                        ? "checkmark-circle"
                        : "time"
                    }
                    size={14}
                    color={
                      isApproved
                        ? "#16A34A"
                        : "#DC2626"
                    }
                  />

                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          isApproved
                            ? "#16A34A"
                            : "#DC2626",
                      },
                    ]}
                  >
                    Admin:{" "}
                    {approval}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    title: {
      fontSize: 22,
      fontWeight: "700",
      marginBottom:
        Theme.spacing.md,
    },

    filterContainer: {
      flexDirection: "row",
      backgroundColor:
        Theme.colors.card,
      borderRadius:
        Theme.radius.lg,
      padding: 4,
      marginBottom:
        Theme.spacing.lg,
    },

    filterTab: {
      flex: 1,
      paddingVertical: 8,
      borderRadius:
        Theme.radius.md,
      alignItems:
        "center",
    },

    activeTab: {
      backgroundColor:
        Theme.colors.primary,
    },

    filterText: {
      fontSize: 12,
      color:
        Theme.colors.subtext,
      fontWeight: "500",
    },

    activeText: {
      color: "#fff",
    },

    card: {
      backgroundColor:
        Theme.colors.card,
      padding:
        Theme.spacing.md,
      borderRadius:
        Theme.radius.lg,
      marginBottom:
        Theme.spacing.md,
      elevation: 2,
    },

    cardTop: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginBottom: 6,
    },

    cardTitle: {
      fontSize: 15,
      fontWeight: "700",
      flex: 1,
      marginRight: 8,
    },

    completedBadge: {
      backgroundColor:
        "#E8F7EE",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },

    completedText: {
      color: "green",
      fontSize: 11,
      fontWeight: "700",
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginTop: 5,
    },

    location: {
      fontSize: 12,
      color:
        Theme.colors.subtext,
    },

    date: {
      fontSize: 12,
      color:
        Theme.colors.subtext,
    },

    statusBox: {
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 10,
    },

    approvedBox: {
      backgroundColor:
        "#F0FDF4",
    },

    pendingBox: {
      backgroundColor:
        "#FEF2F2",
    },

    statusText: {
      fontSize: 12,
      fontWeight: "700",
    },

    emptyContainer: {
      alignItems: "center",
      marginTop: 60,
    },

    emptyText: {
      marginTop: 10,
      color:
        Theme.colors.subtext,
    },
  });