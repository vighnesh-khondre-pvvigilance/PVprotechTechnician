// src/components/home/RecentWorkList.tsx

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

import {
  getTodayAllWork,
  getCompletedWork,
} from "../../services/workService";

export default function RecentWorkList() {
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);
  const [monthlyJobs, setMonthlyJobs] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = await getTodayAllWork();
    const completed = await getCompletedWork();

    setTodaySchedule(today);

    // This Month Jobs Count
    const now = new Date();

    const monthJobs = completed.filter((item) => {
      if (!item.completedDate) return false;

      const d = new Date(item.completedDate);

      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    });

    setMonthlyJobs(monthJobs.length);
  };

  const getTimeSlot = (index: number) => {
    const slots = ["09:00", "11:30", "02:00", "04:30", "06:00"];
    return slots[index] || "09:00";
  };

  return (
    <View style={{ marginTop: 20 }}>
      {/* Title */}
      <Text style={styles.heading}>Monthly Performance</Text>

      {/* Performance Card */}
      <View style={styles.performanceCard}>
        <View style={styles.perfBox}>
          <Text style={styles.perfNumber}>{monthlyJobs}</Text>
          <Text style={styles.perfLabel}>Jobs</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.perfBox}>
          <Text style={styles.perfNumber}>4.8⭐</Text>
          <Text style={styles.perfLabel}>Rating</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.perfBox}>
          <Text style={styles.perfNumber}>39m</Text>
          <Text style={styles.perfLabel}>Avg Time</Text>
        </View>
      </View>

      {/* Recent Work */}
      <Text style={[styles.heading, { marginTop: 22 }]}>
        Recent Work
      </Text>

      {todaySchedule.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#94A3B8"
          />
          <Text style={styles.emptyText}>
            No work scheduled today
          </Text>
        </View>
      ) : (
        todaySchedule.map((item, index) => (
          <View key={item.id} style={styles.scheduleCard}>
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>
                {getTimeSlot(index)}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.scheduleTitle}>
                {item.title}
              </Text>

              <Text style={styles.scheduleSub}>
                {item.plantName}
              </Text>
            </View>

            <Ionicons
              name={
                item.status === "Completed"
                  ? "checkmark-circle"
                  : "time"
              }
              size={22}
              color={
                item.status === "Completed"
                  ? "#10B981"
                  : "#F59E0B"
              }
            />
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  performanceCard: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 22,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  perfBox: {
    flex: 1,
    alignItems: "center",
  },

  perfNumber: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },

  perfLabel: {
    color: "#CBD5E1",
    marginTop: 4,
    fontSize: 13,
  },

  divider: {
    width: 1,
    height: 45,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  scheduleCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  timeBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
    marginRight: 12,
  },

  timeText: {
    color: Theme.colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },

  scheduleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  scheduleSub: {
    marginTop: 3,
    fontSize: 12,
    color: "#64748B",
  },

  emptyCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  emptyText: {
    color: "#64748B",
    fontSize: 14,
  },
});