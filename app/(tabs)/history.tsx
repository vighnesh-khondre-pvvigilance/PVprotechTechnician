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

    const approved =
      approval ===
      "Approved";

    return (
      <TouchableOpacity
        activeOpacity={
          0.88
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
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={
                styles.title
              }
              numberOfLines={1}
            >
              {item.title}
            </Text>

            <Text
              style={
                styles.client
              }
              numberOfLines={1}
            >
              {item.clientName}
            </Text>
          </View>

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
              DONE
            </Text>
          </View>
        </View>

        {/* Middle */}
        <View
          style={
            styles.metaWrap
          }
        >
          <View
            style={
              styles.metaItem
            }
          >
            <Ionicons
              name="leaf-outline"
              size={14}
              color="#64748B"
            />

            <Text
              style={
                styles.metaText
              }
            >
              {
                item.plantName
              }
            </Text>
          </View>

          <View
            style={
              styles.metaItem
            }
          >
            <Ionicons
              name="calendar-outline"
              size={14}
              color="#64748B"
            />

            <Text
              style={
                styles.metaText
              }
            >
              {formatDate(
                item.completedDate
              )}
            </Text>
          </View>
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
              approved
                ? styles.approved
                : styles.pending,
            ]}
          >
            <Ionicons
              name={
                approved
                  ? "checkmark-circle"
                  : "time"
              }
              size={14}
              color={
                approved
                  ? "#16A34A"
                  : "#F59E0B"
              }
            />

            <Text
              style={[
                styles.statusText,
                {
                  color:
                    approved
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
        ListHeaderComponent={
          <View
            style={
              styles.container
            }
          >
            {/* Header */}
            <View
              style={
                styles.headerRow
              }
            >
              <View>
                <Text
                  style={
                    styles.smallHead
                  }
                >
                  Reports
                </Text>

                <Text
                  style={
                    styles.header
                  }
                >
                  Work History
                </Text>
              </View>

              <View
                style={
                  styles.iconBtn
                }
              >
                <Ionicons
                  name="time-outline"
                  size={18}
                  color="#fff"
                />
              </View>
            </View>

            {/* Stats */}
            <View
              style={
                styles.statsRow
              }
            >
              <StatCard
                value={
                  stats.total
                }
                label="Total"
              />

              <StatCard
                value={
                  stats.today
                }
                label="Today"
              />

              <StatCard
                value={
                  stats.approved
                }
                label="Approved"
              />
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
              ].map(
                (item) => (
                  <TouchableOpacity
                    key={
                      item
                    }
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
                )
              )}
            </View>
          </View>
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
                  styles.emptyTitle
                }
              >
                No History Found
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                Completed jobs will
                appear here
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={{
          paddingBottom: 30,
          paddingHorizontal: 6,
        }}
      />
    </Screen>
  );
}

function StatCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
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
        {value}
      </Text>

      <Text
        style={
          styles.statLabel
        }
      >
        {label}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      paddingTop: 4,
    },

    headerRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginBottom: 18,
    },

    smallHead: {
      fontSize: 13,
      color:
        Theme.colors.subtext,
      fontWeight: "600",
    },

    header: {
      fontSize: 28,
      fontWeight:
        "800",
      color:
        Theme.colors.text,
      marginTop: 2,
    },

    iconBtn: {
      width: 46,
      height: 46,
      borderRadius: 16,
      backgroundColor:
        Theme.colors.primary,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    statsRow: {
      flexDirection:
        "row",
      gap: 10,
      marginBottom: 16,
    },

    statCard: {
      flex: 1,
      backgroundColor:
        "#fff",
      borderRadius: 20,
      padding: 14,
      alignItems:
        "center",
      elevation: 2,
    },

    statValue: {
      fontSize: 24,
      fontWeight:
        "800",
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
      borderRadius: 18,
      paddingHorizontal: 14,
      marginBottom: 14,
      height: 52,
    },

    input: {
      flex: 1,
      marginLeft: 8,
      color: "#111827",
    },

    filterRow: {
      flexDirection:
        "row",
      flexWrap:
        "wrap",
      gap: 8,
      marginBottom: 16,
    },

    tab: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
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
        "700",
      fontSize: 12,
      textTransform:
        "capitalize",
    },

    activeText: {
      color: "#fff",
    },

    card: {
      backgroundColor:
        "#fff",
      borderRadius: 22,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
    },

    cardTop: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "flex-start",
      marginBottom: 10,
    },

    title: {
      fontSize: 15,
      fontWeight:
        "800",
      color:
        Theme.colors.text,
    },

    client: {
      fontSize: 13,
      color: "#64748B",
      marginTop: 4,
    },

    doneBadge: {
      backgroundColor:
        "#DCFCE7",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },

    doneText: {
      fontSize: 10,
      fontWeight:
        "800",
      color: "#16A34A",
    },

    metaWrap: {
      gap: 8,
    },

    metaItem: {
      flexDirection:
        "row",
      alignItems:
        "center",
      gap: 6,
    },

    metaText: {
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
      alignItems:
        "center",
      gap: 6,
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

    emptyTitle: {
      marginTop: 12,
      fontSize: 18,
      fontWeight:
        "700",
      color:
        Theme.colors.text,
    },

    emptyText: {
      marginTop: 4,
      color: "#64748B",
    },
  });