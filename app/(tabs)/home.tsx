import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

import Screen from "../src/components/Screen";

import HeaderCard from "../src/components/home/HeaderCard";
import StatsRow from "../src/components/home/StatsRow";
import QuickSolveGrid from "../src/components/home/QuickSolveGrid";
import RecentWorkList from "../src/components/home/RecentWorkList";

import InverterCalc from "../src/components/toolbox/InverterCalc";
import CleaningCalc from "../src/components/toolbox/CleaningCalc";
import VocCalc from "../src/components/toolbox/VocCalc";
import VoltageDrop from "../src/components/toolbox/VoltageDrop";
import YieldCalc from "../src/components/toolbox/YieldCalc";

export default function HomeScreen() {
  const [tool, setTool] = useState<string | null>(null);
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["65%"], []);

  const openTool = (name: string) => {
    setTool(name);
    sheetRef.current?.expand();
  };

  const renderTool = () => {
    switch (tool) {
      case "Inverter":
        return <InverterCalc />;
      case "Cleaning":
        return <CleaningCalc />;
      case "VOC":
        return <VocCalc />;
      case "Voltage":
        return <VoltageDrop />;
      case "Yield":
        return <YieldCalc />;
      default:
        return <Text style={{ padding: 20 }}>Select Tool</Text>;
    }
  };

  const todaySchedule = [
    {
      id: "1",
      time: "10:30 AM",
      title: "Inspection - Hinjewadi",
    },
    {
      id: "2",
      time: "1:00 PM",
      title: "Cleaning - Baner",
    },
    {
      id: "3",
      time: "4:00 PM",
      title: "Maintenance - Wakad",
    },
  ];

  return (
    <Screen>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <HeaderCard />

          {/* Stats */}
          <StatsRow />

          {/* Priority Alert */}
          <View style={styles.alertCard}>
            <Ionicons name="warning" size={22} color="#fff" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.alertTitle}>High Priority Work</Text>
              <Text style={styles.alertText}>
                Inverter Fault - ABC Solar Plant
              </Text>
            </View>
          </View>

          {/* Quick Tools */}
         
          <QuickSolveGrid onPress={openTool} />

          {/* Today Schedule */}
          <Text style={styles.sectionTitle}>Today's Schedule</Text>

          {todaySchedule.map((item) => (
            <View key={item.id} style={styles.scheduleCard}>
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              <Text style={styles.scheduleTitle}>{item.title}</Text>
            </View>
          ))}

          {/* Solar Widget */}
          <Text style={styles.sectionTitle}>Solar Conditions</Text>

          <View style={styles.weatherCard}>
            <View style={styles.weatherBox}>
              <MaterialCommunityIcons
                name="weather-sunny"
                size={24}
                color="#f59e0b"
              />
              <Text style={styles.weatherLabel}>Sun Hours</Text>
              <Text style={styles.weatherValue}>6.2h</Text>
            </View>

            <View style={styles.weatherBox}>
              <MaterialCommunityIcons
                name="solar-power"
                size={24}
                color="#10b981"
              />
              <Text style={styles.weatherLabel}>Irradiance</Text>
              <Text style={styles.weatherValue}>High</Text>
            </View>

            <View style={styles.weatherBox}>
              <MaterialCommunityIcons
                name="spray-bottle"
                size={24}
                color="#3b82f6"
              />
              <Text style={styles.weatherLabel}>Clean Time</Text>
              <Text style={styles.weatherValue}>7 AM</Text>
            </View>
          </View>

          {/* Recent Work */}
          
          <RecentWorkList />

          {/* Weekly Performance */}
          <Text style={styles.sectionTitle}>Weekly Performance</Text>

          <View style={styles.performanceCard}>
            <View style={styles.perfBox}>
              <Text style={styles.perfNumber}>28</Text>
              <Text style={styles.perfLabel}>Jobs</Text>
            </View>


            <View style={styles.perfBox}>
              <Text style={styles.perfNumber}>4.8⭐</Text>
              <Text style={styles.perfLabel}>Rating</Text>
            </View>

            <View style={styles.perfBox}>
              <Text style={styles.perfNumber}>39m</Text>
              <Text style={styles.perfLabel}>Avg Time</Text>
            </View>
          </View>

          {/* Recent Activity */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              ✔ Report submitted - Wakad Site
            </Text>
            <Text style={styles.activityText}>
              ✔ Cleaning completed - Baner
            </Text>
            <Text style={styles.activityText}>
              ✔ Photo uploaded - Hinjewadi
            </Text>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
        >
          <View style={styles.sheet}>{renderTool()}</View>
        </BottomSheet>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  content: {
    padding:2
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 12,
    color: "#0f172a",
  },

  alertCard: {
    marginTop: 14,
    backgroundColor: "#ef4444",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  alertTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  alertText: {
    color: "#fff",
    marginTop: 3,
    opacity: 0.95,
  },

  scheduleCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  timeBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  timeText: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: 12,
  },

  scheduleTitle: {
    marginLeft: 12,
    fontWeight: "600",
    color: "#0f172a",
  },

  weatherCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },

  weatherBox: {
    alignItems: "center",
    flex: 1,
  },

  weatherLabel: {
    fontSize: 12,
    marginTop: 6,
    color: "#64748b",
  },

  weatherValue: {
    marginTop: 4,
    fontWeight: "700",
    color: "#0f172a",
  },

  performanceCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },

  perfBox: {
    alignItems: "center",
    flex: 1,
  },

  perfNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: "#10b981",
  },

  perfLabel: {
    marginTop: 4,
    color: "#64748b",
  },

  activityCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    elevation: 2,
  },

  activityText: {
    marginBottom: 10,
    color: "#334155",
    fontWeight: "500",
  },

  sheet: {
    flex: 1,
    padding: 16,
  },
});