// src/components/home/StatsRow.tsx

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

import {
  getAssignedClients,
  getPendingPlants,
  getTodayCompletedWork,
  getHighPriorityTask,
} from "../../services/workService";

export default function StatsRow() {
  const [clients, setClients] =
    useState(0);

  const [plants, setPlants] =
    useState(0);

  const [done, setDone] =
    useState(0);

  const [priorityTask, setPriorityTask] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        clientsData,
        plantsData,
        doneData,
        highTask,
      ] = await Promise.all([
        getAssignedClients(),
        getPendingPlants(),
        getTodayCompletedWork(),
        getHighPriorityTask(),
      ]);

      setClients(
        clientsData?.length || 0
      );

      setPlants(
        plantsData?.length || 0
      );

      setDone(
        doneData?.length || 0
      );

      setPriorityTask(
        highTask || null
      );
    } catch (error) {
      console.log(
        "Stats Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Clients",
      value: clients,
      icon: "business",
      color: "#2563EB",
      onPress: () =>
        router.push("/(tabs)/work"),
    },

    {
      label: "Plants",
      value: plants,
      icon: "leaf",
      color: "#16A34A",
      onPress: () =>
        router.push("/(tabs)/work"),
    },

    {
      label: "Done",
      value: done,
      icon: "checkmark-done",
      color: "#7C3AED",
      onPress: () =>
        router.push("/(tabs)/history"),
    },
  ];

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.topHeader}>
        <Text style={styles.heading}>
          Dashboard
        </Text>

        <TouchableOpacity
          onPress={loadData}
        >
          <Ionicons
            name="refresh"
            size={18}
            color="#64748B"
          />
        </TouchableOpacity>
      </View>

      {/* Premium Summary */}
      <View style={styles.row}>
        {stats.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.card}
            activeOpacity={0.88}
            onPress={item.onPress}
          >
            <View
              style={[
                styles.iconWrap,
                {
                  backgroundColor:
                    item.color,
                },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={18}
                color="#fff"
              />
            </View>

            <Text style={styles.value}>
              {loading
                ? "--"
                : item.value}
            </Text>

            <Text style={styles.label}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Priority Card */}
      {!loading &&
        priorityTask && (
          <TouchableOpacity
            style={styles.alertCard}
            activeOpacity={0.9}
            onPress={() =>
              router.push(
                "/(tabs)/work"
              )
            }
          >
            <View
              style={
                styles.alertIcon
              }
            >
              <Ionicons
                name="warning"
                size={20}
                color="#fff"
              />
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: 12,
              }}
            >
              <Text
                style={
                  styles.alertTitle
                }
              >
                High Priority Visit
              </Text>

              <Text
                style={
                  styles.alertText
                }
                numberOfLines={1}
              >
                {
                  priorityTask.clientName
                }{" "}
                •{" "}
                {
                  priorityTask.plantName
                }
              </Text>

              <Text
                style={
                  styles.alertSub
                }
                numberOfLines={1}
              >
                {
                  priorityTask.location
                }
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        )}

      {/* Empty State */}
      {!loading &&
        !priorityTask && (
          <View
            style={
              styles.safeCard
            }
          >
            <Ionicons
              name="shield-checkmark"
              size={18}
              color="#16A34A"
            />

            <Text
              style={
                styles.safeText
              }
            >
              No high priority
              visits right now
            </Text>
          </View>
        )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrapper: {
      marginTop: 18,
    },

    topHeader: {
      flexDirection: "row",
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

    row: {
      flexDirection: "row",
      gap: 10,
    },

    card: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 22,
      paddingVertical: 18,
      alignItems: "center",
      elevation: 2,
    },

    iconWrap: {
      width: 38,
      height: 38,
      borderRadius: 14,
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 10,
    },

    value: {
      fontSize: 24,
      fontWeight: "800",
      color: "#0F172A",
    },

    label: {
      marginTop: 4,
      fontSize: 12,
      color: "#64748B",
      fontWeight: "700",
    },

    alertCard: {
      marginTop: 16,
      backgroundColor:
        "#EF4444",
      borderRadius: 22,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
    },

    alertIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor:
        "rgba(255,255,255,0.18)",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    alertTitle: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "800",
    },

    alertText: {
      color: "#FEE2E2",
      marginTop: 2,
      fontSize: 13,
      fontWeight: "600",
    },

    alertSub: {
      color: "#FECACA",
      marginTop: 2,
      fontSize: 12,
    },

    safeCard: {
      marginTop: 16,
      backgroundColor:
        "#ECFDF5",
      borderRadius: 18,
      padding: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    safeText: {
      color: "#166534",
      fontWeight: "700",
      fontSize: 13,
    },
  });