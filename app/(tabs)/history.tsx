// app/(tabs)/history.tsx

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Screen from "./../src/components/Screen";
import { Theme } from "./../src/theme/theme";

import { Work } from "../src/types/work";

import {
  getCompletedWork,
  getTodayCompletedWork,
} from "../src/services/workService";

type FilterType =
  | "all"
  | "today"
  | "approved"
  | "pending";

export default function History() {
  const [filter, setFilter] =
    useState<FilterType>("all");

  const [data, setData] =
    useState<Work[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const result =
        await getCompletedWork();

      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh =
    async () => {
      setRefreshing(true);
      await loadData();
    };

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const filteredData =
    useMemo(() => {
      let list = [...data];

      if (filter === "today") {
        list = list.filter(
          (item) =>
            item.completedDate ===
            today
        );
      }

      if (
        filter ===
        "approved"
      ) {
        list = list.filter(
          (item) =>
            item.adminApproval ===
            "Approved"
        );
      }

      if (
        filter ===
        "pending"
      ) {
        list = list.filter(
          (item) =>
            !item.adminApproval ||
            item.adminApproval ===
              "Pending"
        );
      }

      if (search.trim()) {
        const q =
          search.toLowerCase();

        list = list.filter(
          (item) =>
            item.title
              ?.toLowerCase()
              .includes(q) ||
            item.clientName
              ?.toLowerCase()
              .includes(q) ||
            item.plantName
              ?.toLowerCase()
              .includes(q) ||
            item.location
              ?.toLowerCase()
              .includes(q)
        );
      }

      return list;
    }, [
      data,
      filter,
      search,
    ]);

  const stats =
    useMemo(() => {
      return {
        total:
          data.length,

        today:
          data.filter(
            (item) =>
              item.completedDate ===
              today
          ).length,

        approved:
          data.filter(
            (item) =>
              item.adminApproval ===
              "Approved"
          ).length,
      };
    }, [data]);

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

  const renderItem = ({
    item,
  }: {
    item: Work;
  }) => {
    const approval =
      item.adminApproval ||
      "Pending";

    const isApproved =
      approval ===
      "Approved";

    return (
      <TouchableOpacity
        activeOpacity={
          0.85
        }
        style={
          styles.card
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
        {/* Top */}
        <View
          style={
            styles.cardTop
          }
        >
          <Text
            style={
              styles.titleText
            }
            numberOfLines={1}
          >
            {item.title}
          </Text>

          <View
            style={
              styles.doneBadge
            }
          >
            <Text
              style={
                styles.doneText
              }
            >
              Done
            </Text>
          </View>
        </View>

        {/* Client */}
        <View
          style={styles.row}
        >
          <Ionicons
            name="business-outline"
            size={14}
            color="#64748B"
          />

          <Text
            style={
              styles.subText
            }
          >
            {item.clientName ||
              item.client}
          </Text>
        </View>

        {/* Plant */}
        <View
          style={styles.row}
        >
          <Ionicons
            name="leaf-outline"
            size={14}
            color="#64748B"
          />

          <Text
            style={
              styles.subText
            }
          >
            {
              item.plantName
            }
          </Text>
        </View>

        {/* Date */}
        <View
          style={styles.row}
        >
          <Ionicons
            name="calendar-outline"
            size={14}
            color="#64748B"
          />

          <Text
            style={
              styles.subText
            }
          >
            {formatDate(
              item.completedDate
            )}
          </Text>
        </View>

        {/* Footer */}
        <View
          style={
            styles.footer
          }
        >
          <View
            style={[
              styles.status,
              isApproved
                ? styles.approved
                : styles.pending,
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
                  : "#F59E0B"
              }
            />

            <Text
              style={[
                styles.statusText,
                {
                  color:
                    isApproved
                      ? "#16A34A"
                      : "#F59E0B",
                },
              ]}
            >
              {approval}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#94A3B8"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      {/* Header */}
      <Text
        style={
          styles.header
        }
      >
        Work History
      </Text>

      {/* Stats */}
      <View
        style={
          styles.statsRow
        }
      >
        <View
          style={
            styles.statCard
          }
        >
          <Text
            style={
              styles.statValue
            }
          >
            {stats.total}
          </Text>
          <Text
            style={
              styles.statLabel
            }
          >
            Total
          </Text>
        </View>

        <View
          style={
            styles.statCard
          }
        >
          <Text
            style={
              styles.statValue
            }
          >
            {stats.today}
          </Text>
          <Text
            style={
              styles.statLabel
            }
          >
            Today
          </Text>
        </View>

        <View
          style={
            styles.statCard
          }
        >
          <Text
            style={
              styles.statValue
            }
          >
            {
              stats.approved
            }
          </Text>
          <Text
            style={
              styles.statLabel
            }
          >
            Approved
          </Text>
        </View>
      </View>

      {/* Search */}
      <View
        style={
          styles.searchBox
        }
      >
        <Ionicons
          name="search"
          size={18}
          color="#94A3B8"
        />

        <TextInput
          style={
            styles.input
          }
          placeholder="Search history..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={
            setSearch
          }
        />
      </View>

      {/* Filters */}
      <View
        style={
          styles.filterRow
        }
      >
        {[
          "all",
          "today",
          "approved",
          "pending",
        ].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.tab,
              filter ===
                item &&
                styles.activeTab,
            ]}
            onPress={() =>
              setFilter(
                item as FilterType
              )
            }
          >
            <Text
              style={[
                styles.tabText,
                filter ===
                  item &&
                  styles.activeText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={
          filteredData
        }
        keyExtractor={(
          item
        ) => item.id}
        renderItem={
          renderItem
        }
        showsVerticalScrollIndicator={
          false
        }
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              onRefresh
            }
          />
        }
        ListEmptyComponent={
          !loading ? (
            <View
              style={
                styles.empty
              }
            >
              <Ionicons
                name="folder-open-outline"
                size={54}
                color="#94A3B8"
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
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      />
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    header: {
      fontSize: 24,
      fontWeight:
        "700",
      marginBottom: 16,
    },

    statsRow: {
      flexDirection:
        "row",
      gap: 10,
      marginBottom: 14,
    },

    statCard: {
      flex: 1,
      backgroundColor:
        "#fff",
      borderRadius: 18,
      padding: 14,
      alignItems:
        "center",
    },

    statValue: {
      fontSize: 22,
      fontWeight:
        "700",
      color:
        Theme.colors.primary,
    },

    statLabel: {
      fontSize: 12,
      color: "#64748B",
      marginTop: 4,
    },

    searchBox: {
      flexDirection:
        "row",
      alignItems:
        "center",
      backgroundColor:
        "#fff",
      borderRadius: 16,
      paddingHorizontal: 14,
      marginBottom: 14,
    },

    input: {
      flex: 1,
      height: 48,
      marginLeft: 8,
    },

    filterRow: {
      flexDirection:
        "row",
      gap: 8,
      flexWrap:
        "wrap",
      marginBottom: 14,
    },

    tab: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 30,
      backgroundColor:
        "#fff",
    },

    activeTab: {
      backgroundColor:
        Theme.colors.primary,
    },

    tabText: {
      color: "#475569",
      fontWeight:
        "600",
      textTransform:
        "capitalize",
      fontSize: 12,
    },

    activeText: {
      color: "#fff",
    },

    card: {
      backgroundColor:
        "#fff",
      padding: 16,
      borderRadius: 18,
      marginBottom: 12,
    },

    cardTop: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginBottom: 8,
    },

    titleText: {
      flex: 1,
      fontSize: 15,
      fontWeight:
        "700",
      marginRight: 8,
    },

    doneBadge: {
      backgroundColor:
        "#DCFCE7",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },

    doneText: {
      fontSize: 11,
      fontWeight:
        "700",
      color: "#16A34A",
    },

    row: {
      flexDirection:
        "row",
      gap: 6,
      marginTop: 6,
      alignItems:
        "center",
    },

    subText: {
      fontSize: 12,
      color: "#64748B",
    },

    footer: {
      marginTop: 14,
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    status: {
      flexDirection:
        "row",
      gap: 6,
      alignItems:
        "center",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
    },

    approved: {
      backgroundColor:
        "#F0FDF4",
    },

    pending: {
      backgroundColor:
        "#FFF7ED",
    },

    statusText: {
      fontSize: 12,
      fontWeight:
        "700",
    },

    empty: {
      alignItems:
        "center",
      marginTop: 80,
    },

    emptyText: {
      marginTop: 10,
      color: "#64748B",
    },
  });