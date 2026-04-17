import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "./../src/components/Screen";
import { Theme } from "./../src/theme/theme";
import { workData } from "./../src/data/work";
import { useAuth } from "./../src/context/AuthContext";


export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const totalWork = workData.length;
  const completedWork = 1;
  const nextTask = workData[0];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading || !user) {
    return (
      <Screen>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 🔷 HEADER */}
        <Animated.View entering={FadeInDown.delay(50)} style={styles.header}>
          <View>
            <Text style={styles.location}>📍 Pune</Text>
            <Text style={styles.greeting}>
              {getGreeting()} 👋
            </Text>
            <Text style={styles.username}>{user.name}</Text>
          </View>

          <TouchableOpacity
            style={styles.avatar}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.avatarText}>
              {user.name?.charAt(0)}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* 📊 SUMMARY */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.summaryRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Assigned</Text>
            <Text style={styles.cardValue}>{totalWork}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Completed</Text>
            <Text style={styles.cardValue}>{completedWork}</Text>
          </View>
        </Animated.View>

        {/* 📈 PROGRESS */}
        <Animated.View entering={FadeInDown.delay(150)} style={styles.progressBox}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <Text style={styles.progressText}>
            {completedWork} / {totalWork} Tasks Completed
          </Text>
        </Animated.View>

        {/* ⚡ PERFORMANCE */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.performanceCard}>
          <Text style={styles.sectionTitle}>⚡ Today’s Generation</Text>
          <Text style={styles.performanceValue}>120 kWh</Text>
          <Text style={styles.performanceSub}>Expected: 150 kWh</Text>
        </Animated.View>

        {/* ⭐ NEXT TASK */}
        {nextTask && (
          <Animated.View entering={FadeInDown.delay(250)} style={styles.nextTask}>
            <Text style={styles.sectionTitle}>Next Task</Text>

            <Text style={styles.taskTitle}>{nextTask.title}</Text>
            <Text style={styles.taskLocation}>{nextTask.location}</Text>

            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => router.push(`/work/${nextTask.id}`)}
            >
              <Text style={styles.startText}>Start Work</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* 📋 TASK LIST */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.listSection}>
          <Text style={styles.sectionTitle}>Today’s Tasks</Text>

          {workData.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.taskItem}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskLocation}>{item.location}</Text>
            </View>
          ))}
        </Animated.View>

        {/* ⚡ QUICK ACTIONS */}
        <Animated.View entering={FadeInDown.delay(350)} style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="call-outline" size={18} />
            <Text style={styles.actionText}>Call Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="cloud-upload-outline" size={18} />
            <Text style={styles.actionText}>Upload</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },

  location: {
    fontSize: 12,
    color: Theme.colors.subtext,
  },

  greeting: {
    fontSize: 18,
    fontWeight: "700",
  },

  username: {
    fontSize: 14,
    color: Theme.colors.subtext,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* SUMMARY */
  summaryRow: {
    flexDirection: "row",
    marginBottom: Theme.spacing.md,
  },

  card: {
    flex: 1,
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginRight: Theme.spacing.sm,
  },

  cardLabel: {
    fontSize: 12,
    color: Theme.colors.subtext,
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "700",
  },

  /* PROGRESS */
  progressBox: {
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.md,
  },

  progressText: {
    marginTop: 4,
    color: Theme.colors.subtext,
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 6,
  },

  /* PERFORMANCE */
  performanceCard: {
    backgroundColor: "#ECFEFF",
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.md,
  },

  performanceValue: {
    fontSize: 24,
    fontWeight: "700",
  },

  performanceSub: {
    fontSize: 12,
    color: Theme.colors.subtext,
  },

  /* NEXT TASK */
  nextTask: {
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.md,
  },

  taskTitle: {
    fontWeight: "600",
  },

  taskLocation: {
    color: Theme.colors.subtext,
    marginBottom: 8,
  },

  startBtn: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.sm,
    borderRadius: Theme.radius.sm,
    alignItems: "center",
  },

  startText: {
    fontWeight: "600",
  },

  /* LIST */
  listSection: {
    marginBottom: Theme.spacing.md,
  },

  taskItem: {
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.sm,
    borderRadius: Theme.radius.sm,
    marginBottom: Theme.spacing.sm,
  },

  /* ACTIONS */
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.lg,
  },

  actionBtn: {
    flex: 1,
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginRight: Theme.spacing.sm,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  actionText: {
    fontSize: 12,
  },
});