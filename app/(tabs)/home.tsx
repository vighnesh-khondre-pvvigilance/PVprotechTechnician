import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

import Screen from "../src/components/Screen";
import HeaderCard from "../src/components/home/HeaderCard";
import StatsRow from "../src/components/home/StatsRow";
import QuickSolveGrid from "../src/components/home/QuickSolveGrid";
import RecentWorkList from "../src/components/home/RecentWorkList";
import WeatherCard from "../src/components/home/WeatherCard";

import InverterCalc from "../src/components/toolbox/InverterCalc";
import CleaningCalc from "../src/components/toolbox/CleaningCalc";
import VocCalc from "../src/components/toolbox/VocCalc";
import VoltageDrop from "../src/components/toolbox/VoltageDrop";
import YieldCalc from "../src/components/toolbox/YieldCalc";

import { Theme } from "../src/theme/theme";

export default function HomeScreen() {
  const [tool, setTool] = useState<string | null>(null);
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["68%"], []);

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
        return (
          <Text style={styles.emptyText}>
            Select a tool from Quick Solve
          </Text>
        );
    }
  };

  const todaySchedule = [
    {
      id: "1",
      time: "10:30 AM",
      title: "Inspection - Hinjewadi",
      icon: "clipboard-check-outline",
    },
    {
      id: "2",
      time: "1:00 PM",
      title: "Cleaning - Baner",
      icon: "spray-bottle",
    },
    {
      id: "3",
      time: "4:00 PM",
      title: "Maintenance - Wakad",
      icon: "tools",
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

          {/* Quick Tools */}
          
          <QuickSolveGrid onPress={openTool} />

          {/* Today's Work */}
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>

            <TouchableOpacity>
              <Text style={styles.linkText}>View All</Text>
            </TouchableOpacity>
          </View>

          {todaySchedule.map((item) => (
            <TouchableOpacity key={item.id} style={styles.scheduleCard}>
              <View style={styles.leftRow}>
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={22}
                    color={Theme.colors.primary}
                  />
                </View>

                <View>
                  <Text style={styles.scheduleTitle}>{item.title}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={Theme.colors.subtext}
              />
            </TouchableOpacity>
          ))}

          {/* Weather */}
          <Text style={styles.sectionTitle}>Site Weather</Text>
          <WeatherCard />

          {/* Recent Work */}
          
          <RecentWorkList />

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={styles.sheetBg}
          handleIndicatorStyle={styles.sheetHandle}
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
    backgroundColor: Theme.colors.background,
  },

  content: {
   padding:5,
    paddingTop: Theme.spacing.sm,
    paddingBottom: Theme.spacing.xl,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Theme.colors.secondary,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },

  linkText: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.primary,
  },

  scheduleCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: Theme.radius.md,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Theme.spacing.md,
  },

  scheduleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Theme.colors.text,
  },

  timeText: {
    marginTop: 4,
    fontSize: 13,
    color: Theme.colors.subtext,
  },

  sheetBg: {
    backgroundColor: Theme.colors.card,
    borderTopLeftRadius: Theme.radius.xl,
    borderTopRightRadius: Theme.radius.xl,
  },

  sheetHandle: {
    backgroundColor: Theme.colors.border,
    width: 55,
  },

  sheet: {
    flex: 1,
    padding: Theme.spacing.md,
  },

  emptyText: {
    color: Theme.colors.subtext,
    fontSize: 15,
    textAlign: "center",
    marginTop: 30,
  },
});