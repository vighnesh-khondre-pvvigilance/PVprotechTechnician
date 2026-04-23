// src/components/home/RecentWorkList.tsx

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Theme } from "../../theme/theme";

import {
  getTodayAllWork,
  getCompletedWork,
} from "../../services/workService";

export default function RecentWorkList() {
  const [todaySchedule, setTodaySchedule] =
    useState<any[]>([]);

  const [monthlyJobs, setMonthlyJobs] =
    useState(0);

  const [pendingCount, setPendingCount] =
    useState(0);

  const [completedToday, setCompletedToday] =
    useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = await getTodayAllWork();
    const completed =
      await getCompletedWork();

    setTodaySchedule(today);

    const now = new Date();

    const monthJobs =
      completed.filter((item) => {
        if (!item.completedDate)
          return false;

        const d = new Date(
          item.completedDate +
            "T00:00:00"
        );

        return (
          d.getMonth() ===
            now.getMonth() &&
          d.getFullYear() ===
            now.getFullYear()
        );
      });

    const pending =
      today.filter(
        (item) =>
          item.status === "Pending"
      );

    const doneToday =
      today.filter(
        (item) =>
          item.status ===
          "Completed"
      );

    setMonthlyJobs(
      monthJobs.length
    );

    setPendingCount(
      pending.length
    );

    setCompletedToday(
      doneToday.length
    );
  };

  const getDateBadge = (
    item: any
  ) => {
    const date =
      item.assignedDate ||
      item.completedDate;

    if (!date)
      return {
        day: "--",
        month: "--",
      };

    const d = new Date(
      date + "T00:00:00"
    );

    return {
      day: d.getDate(),
      month:
        d.toLocaleDateString(
          "en-IN",
          {
            month:
              "short",
          }
        ),
    };
  };

  const getPriorityColor = (
    priority: string
  ) => {
    if (
      priority === "High"
    )
      return "#EF4444";

    if (
      priority ===
      "Medium"
    )
      return "#F59E0B";

    return "#10B981";
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      {/* DASHBOARD HEADER */}
      <View
        style={
          styles.topHeader
        }
      >
        <Text
          style={
            styles.heading
          }
        >
          Performance
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push(
              "/(tabs)/history"
            )
          }
        >
          <Text
            style={
              styles.link
            }
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* PREMIUM SUMMARY CARD */}
      <View
        style={
          styles.summaryCard
        }
      >
        <View
          style={
            styles.metricBox
          }
        >
          <Text
            style={
              styles.metricNumber
            }
          >
            {monthlyJobs}
          </Text>
          <Text
            style={
              styles.metricLabel
            }
          >
            This Month
          </Text>
        </View>

        <View
          style={
            styles.divider
          }
        />

        <View
          style={
            styles.metricBox
          }
        >
          <Text
            style={
              styles.metricNumber
            }
          >
            {pendingCount}
          </Text>
          <Text
            style={
              styles.metricLabel
            }
          >
            Pending
          </Text>
        </View>

        <View
          style={
            styles.divider
          }
        />

        <View
          style={
            styles.metricBox
          }
        >
          <Text
            style={
              styles.metricNumber
            }
          >
            {
              completedToday
            }
          </Text>
          <Text
            style={
              styles.metricLabel
            }
          >
            Done Today
          </Text>
        </View>
      </View>

      {/* TODAY TASKS */}
      <View
        style={[
          styles.topHeader,
          {
            marginTop: 24,
          },
        ]}
      >
        <Text
          style={
            styles.heading
          }
        >
          Today Visits
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push(
              "/(tabs)/work"
            )
          }
        >
          <Text
            style={
              styles.link
            }
          >
            Open Work
          </Text>
        </TouchableOpacity>
      </View>

      {todaySchedule.length ===
      0 ? (
        <View
          style={
            styles.emptyCard
          }
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color="#94A3B8"
          />

          <View>
            <Text
              style={
                styles.emptyTitle
              }
            >
              No Work Today
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              You are all clear
              for now.
            </Text>
          </View>
        </View>
      ) : (
        todaySchedule.map(
          (item) => {
            const badge =
              getDateBadge(
                item
              );

            const color =
              getPriorityColor(
                item.priority
              );

            const done =
              item.status ===
              "Completed";

            return (
              <TouchableOpacity
                key={
                  item.id
                }
                activeOpacity={
                  0.85
                }
                style={[
                  styles.taskCard,
                  {
                    borderLeftColor:
                      color,
                  },
                ]}
                onPress={() =>
                  router.push(
                    "/(tabs)/work"
                  )
                }
              >
                {/* Date */}
                <View
                  style={
                    styles.dateBadge
                  }
                >
                  <Text
                    style={
                      styles.day
                    }
                  >
                    {
                      badge.day
                    }
                  </Text>

                  <Text
                    style={
                      styles.month
                    }
                  >
                    {
                      badge.month
                    }
                  </Text>
                </View>

                {/* Content */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      styles.taskTitle
                    }
                  >
                    {
                      item.title
                    }
                  </Text>

                  <Text
                    style={
                      styles.taskSub
                    }
                  >
                    {
                      item.clientName
                    }{" "}
                    •{" "}
                    {
                      item.plantName
                    }
                  </Text>

                  <Text
                    style={
                      styles.location
                    }
                  >
                    {
                      item.location
                    }
                  </Text>

                  <View
                    style={
                      styles.row
                    }
                  >
                    <View
                      style={[
                        styles.priorityTag,
                        {
                          backgroundColor:
                            color,
                        },
                      ]}
                    >
                      <Text
                        style={
                          styles.priorityText
                        }
                      >
                        {
                          item.priority
                        }
                      </Text>
                    </View>

                    <Text
                      style={
                        styles.visitType
                      }
                    >
                      {
                        item.visitType
                      }
                    </Text>
                  </View>
                </View>

                {/* Status */}
                <Ionicons
                  name={
                    done
                      ? "checkmark-circle"
                      : "time"
                  }
                  size={24}
                  color={
                    done
                      ? "#10B981"
                      : "#F59E0B"
                  }
                />
              </TouchableOpacity>
            );
          }
        )
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    topHeader: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginBottom: 12,
    },

    heading: {
      fontSize: 18,
      fontWeight: "800",
      color: "#0F172A",
    },

    link: {
      fontSize: 13,
      fontWeight: "700",
      color:
        Theme.colors.primary,
    },

    summaryCard: {
      backgroundColor:
        Theme.colors.primary,
      borderRadius: 24,
      paddingVertical: 20,
      flexDirection:
        "row",
      alignItems:
        "center",
      elevation: 3,
    },

    metricBox: {
      flex: 1,
      alignItems:
        "center",
    },

    metricNumber: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "800",
    },

    metricLabel: {
      color: "#E2E8F0",
      fontSize: 12,
      marginTop: 4,
    },

    divider: {
      width: 1,
      height: 44,
      backgroundColor:
        "rgba(255,255,255,0.15)",
    },

    emptyCard: {
      backgroundColor:
        "#fff",
      borderRadius: 18,
      padding: 18,
      flexDirection:
        "row",
      gap: 12,
      alignItems:
        "center",
    },

    emptyTitle: {
      fontWeight: "700",
      fontSize: 15,
      color: "#0F172A",
    },

    emptyText: {
      marginTop: 3,
      fontSize: 13,
      color: "#64748B",
    },

    taskCard: {
      backgroundColor:
        "#fff",
      borderRadius: 20,
      padding: 14,
      marginBottom: 12,
      flexDirection:
        "row",
      alignItems:
        "center",
      borderLeftWidth: 5,
      elevation: 2,
    },

    dateBadge: {
      width: 58,
      height: 58,
      borderRadius: 16,
      backgroundColor:
        "#F8FAFC",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginRight: 12,
    },

    day: {
      fontSize: 20,
      fontWeight: "800",
      color: "#0F172A",
      lineHeight: 22,
    },

    month: {
      fontSize: 11,
      color: "#64748B",
      fontWeight: "700",
      textTransform:
        "uppercase",
    },

    taskTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: "#0F172A",
    },

    taskSub: {
      marginTop: 3,
      fontSize: 12,
      color: "#475569",
    },

    location: {
      marginTop: 2,
      fontSize: 12,
      color: "#94A3B8",
    },

    row: {
      flexDirection:
        "row",
      alignItems:
        "center",
      marginTop: 8,
      gap: 8,
    },

    priorityTag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
    },

    priorityText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "800",
    },

    visitType: {
      fontSize: 11,
      color: "#64748B",
      fontWeight: "700",
    },
  });