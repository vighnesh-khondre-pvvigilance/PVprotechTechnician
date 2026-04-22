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
      icon: "business-outline",
      onPress: () =>
        router.push("/(tabs)/work"),
    },

    {
      label: "Plants",
      value: plants,
      icon: "leaf-outline",
      onPress: () =>
        router.push("/(tabs)/work"),
    },

    {
      label: "Done",
      value: done,
      icon: "checkmark-done-outline",
      onPress: () =>
        router.push("/(tabs)/history"),
    },
  ];

  return (
    <>
      {/* Cards */}
      <View style={styles.row}>
        {stats.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.card}
            activeOpacity={0.85}
            onPress={item.onPress}
          >
            <Ionicons
              name={item.icon as any}
              size={18}
              color={
                Theme.colors.primary
              }
            />

            <Text style={styles.value}>
              {loading
                ? "..."
                : item.value}
            </Text>

            <Text style={styles.label}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* High Priority Alert */}
      {!loading &&
        priorityTask && (
          <TouchableOpacity
            style={styles.alert}
            activeOpacity={0.9}
            onPress={() =>
              router.push(
                "/(tabs)/work"
              )
            }
          >
            <Ionicons
              name="warning"
              size={20}
              color="#fff"
            />

            <View
              style={{
                marginLeft: 10,
                flex: 1,
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
                }
                {" • "}
                {
                  priorityTask.plantName
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
    </>
  );
}

const styles =
  StyleSheet.create({
    row: {
      flexDirection: "row",
      gap: 10,
      marginTop: 16,
    },

    card: {
      flex: 1,
      backgroundColor:
        "#fff",
      paddingVertical: 16,
      borderRadius: 18,
      alignItems: "center",

      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },

    value: {
      fontSize: 24,
      fontWeight: "700",
      color:
        Theme.colors.primary,
      marginTop: 4,
    },

    label: {
      marginTop: 4,
      fontSize: 13,
      color: "#64748B",
    },

    alert: {
      marginTop: 16,
      backgroundColor:
        "#EF4444",
      borderRadius: 18,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
    },

    alertTitle: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 14,
    },

    alertText: {
      color: "#FEE2E2",
      marginTop: 2,
      fontSize: 13,
    },
  });