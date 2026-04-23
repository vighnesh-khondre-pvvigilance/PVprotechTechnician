import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../../theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function HeaderCard() {
  const { user } = useAuth();

  const now = new Date();
  const hour = now.getHours();

  const getGreeting = () => {
    if (hour < 12) return "Good Morning 👋";
    if (hour < 17) return "Good Afternoon ☀️";
    if (hour < 21) return "Good Evening 🌇";
    return "Good Night 🌙";
  };

  const formatDate = () => {
    return now.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const userName =
    user?.name ||
    user?.fullName ||
    "Technician";

  const city =
    user?.city ||
    "Pune, Maharashtra";

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Decorative Icon */}
        <View style={styles.bgCircleTop} />
        <View style={styles.bgCircleBottom} />

        {/* Top */}
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greet}>
              {getGreeting()}
            </Text>

            <Text
              style={styles.name}
              numberOfLines={1}
            >
              {userName}
            </Text>

            <Text style={styles.role}>
              Solar Technician
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.profileBtn}
            onPress={() =>
              router.push(
                "/(tabs)/profile"
              )
            }
          >
            <Ionicons
              name="person"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Bottom */}
        <View style={styles.bottomRow}>
          <View style={styles.infoChip}>
            <Ionicons
              name="location-outline"
              size={14}
              color="#fff"
            />
            <Text style={styles.infoText}>
              {city}
            </Text>
          </View>

          <View style={styles.infoChip}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color="#fff"
            />
            <Text style={styles.infoText}>
              {formatDate()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },

  card: {
    backgroundColor:
      Theme.colors.primary,
    borderRadius: 26,
    padding: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  bgCircleTop: {
    position: "absolute",
    top: -40,
    right: -30,
    width: 130,
    height: 130,
    borderRadius: 80,
    backgroundColor:
      "rgba(255,255,255,0.08)",
  },

  bgCircleBottom: {
    position: "absolute",
    bottom: -50,
    left: -20,
    width: 110,
    height: 110,
    borderRadius: 80,
    backgroundColor:
      "rgba(255,255,255,0.06)",
  },

  topRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  greet: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.95,
    fontWeight: "600",
  },

  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },

  role: {
    color:
      "rgba(255,255,255,0.75)",
    fontSize: 13,
    marginTop: 5,
    fontWeight: "500",
  },

  profileBtn: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor:
      "rgba(255,255,255,0.14)",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomRow: {
    marginTop: 18,
    gap: 10,
  },

  infoChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:
      "rgba(255,255,255,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
  },

  infoText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "500",
  },
});