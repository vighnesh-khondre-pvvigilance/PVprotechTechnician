import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

import InverterCalc from "../toolbox/InverterCalc";
import CleaningCalc from "../toolbox/CleaningCalc";
import VocCalc from "../toolbox/VocCalc";
import VoltageDrop from "../toolbox/VoltageDrop";
import YieldCalc from "../toolbox/YieldCalc";

type ToolType =
  | "inverter"
  | "cleaning"
  | "voc"
  | "drop"
  | "yield"
  | null;

const tools = [
  {
    key: "inverter",
    title: "Inverter",
    icon: "flash",
  },
  {
    key: "cleaning",
    title: "Cleaning",
    icon: "water",
  },
  {
    key: "voc",
    title: "VOC",
    icon: "thermometer",
  },
  {
    key: "drop",
    title: "V Drop",
    icon: "analytics",
  },
  {
    key: "yield",
    title: "Yield",
    icon: "sunny",
  },
];

export default function QuickSolveGrid() {
  const [selected, setSelected] = useState<ToolType>(null);

  const renderTool = () => {
    switch (selected) {
      case "inverter":
        return <InverterCalc />;
      case "cleaning":
        return <CleaningCalc />;
      case "voc":
        return <VocCalc />;
      case "drop":
        return <VoltageDrop />;
      case "yield":
        return <YieldCalc />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quick Solve</Text>

      <View style={styles.grid}>
        {tools.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.card}
            onPress={() => setSelected(item.key as ToolType)}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={Theme.colors.primary}
            />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={selected !== null} animationType="slide">
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setSelected(null)}>
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Calculator</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {renderTool()}
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3,
  },
  title: {
    marginTop: 8,
    fontWeight: "600",
  },
  modalHeader: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
});