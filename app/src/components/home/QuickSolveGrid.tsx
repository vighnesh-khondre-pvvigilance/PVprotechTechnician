// src/components/home/QuickSolveGrid.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView,
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
    subtitle: "Efficiency",
    icon: "flash",
    color: "#F59E0B",
  },
  {
    key: "cleaning",
    title: "Cleaning",
    subtitle: "Loss %",
    icon: "water",
    color: "#0EA5E9",
  },
  {
    key: "voc",
    title: "VOC",
    subtitle: "Temp Calc",
    icon: "thermometer",
    color: "#EF4444",
  },
  {
    key: "drop",
    title: "V Drop",
    subtitle: "Cable Loss",
    icon: "analytics",
    color: "#8B5CF6",
  },
  {
    key: "yield",
    title: "Yield",
    subtitle: "Daily Power",
    icon: "sunny",
    color: "#10B981",
  },
];

export default function QuickSolveGrid() {
  const [selected, setSelected] =
    useState<ToolType>(null);

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

  const getTitle = () => {
    switch (selected) {
      case "inverter":
        return "Inverter Calculator";

      case "cleaning":
        return "Cleaning Impact";

      case "voc":
        return "VOC Calculator";

      case "drop":
        return "Voltage Drop";

      case "yield":
        return "Yield Calculator";

      default:
        return "Calculator";
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <Text style={styles.heading}>
          Quick Tools
        </Text>

        <Text style={styles.smallText}>
          Technician Utilities
        </Text>
      </View>

      {/* Premium Banner */}
      <View style={styles.banner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>
            Fast Field Calculations
          </Text>

          <Text style={styles.bannerSub}>
            Voltage, Yield, VOC &
            Performance Tools
          </Text>
        </View>

        <Ionicons
          name="construct"
          size={28}
          color="#fff"
        />
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {tools.map((item) => (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.85}
            style={styles.card}
            onPress={() =>
              setSelected(
                item.key as ToolType
              )
            }
          >
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    item.color,
                },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color="#fff"
              />
            </View>

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.subtitle}>
              {item.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal */}
      <Modal
        visible={selected !== null}
        animationType="slide"
      >
        <SafeAreaView
          style={styles.modalWrap}
        >
          {/* Header */}
          <View
            style={styles.modalHeader}
          >
            <TouchableOpacity
              style={
                styles.closeBtn
              }
              onPress={() =>
                setSelected(null)
              }
            >
              <Ionicons
                name="close"
                size={22}
                color="#0F172A"
              />
            </TouchableOpacity>

            <Text
              style={
                styles.modalTitle
              }
            >
              {getTitle()}
            </Text>

            <View
              style={{
                width: 40,
              }}
            />
          </View>

          {/* Content */}
          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.modalBody
            }
          >
            {renderTool()}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 22,
    },

    topHeader: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 12,
    },

    heading: {
      fontSize: 18,
      fontWeight: "800",
      color: "#0F172A",
    },

    smallText: {
      fontSize: 12,
      fontWeight: "700",
      color: "#64748B",
    },

    banner: {
      backgroundColor:
        Theme.colors.primary,
      borderRadius: 22,
      padding: 18,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },

    bannerTitle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "800",
    },

    bannerSub: {
      color: "#CBD5E1",
      marginTop: 5,
      fontSize: 12,
    },

    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent:
        "space-between",
    },

    card: {
      width: "48%",
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
    },

    iconBox: {
      width: 44,
      height: 44,
      borderRadius: 14,
      justifyContent:
        "center",
      alignItems: "center",
      marginBottom: 12,
    },

    title: {
      fontSize: 15,
      fontWeight: "800",
      color: "#0F172A",
    },

    subtitle: {
      marginTop: 4,
      fontSize: 12,
      color: "#64748B",
    },

    modalWrap: {
      flex: 1,
      backgroundColor:
        "#F8FAFC",
    },

    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      paddingHorizontal: 18,
      paddingVertical: 14,
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor:
        "#EEF2F7",
    },

    closeBtn: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor:
        "#F1F5F9",
      justifyContent:
        "center",
      alignItems: "center",
    },

    modalTitle: {
      fontSize: 17,
      fontWeight: "800",
      color: "#0F172A",
    },

    modalBody: {
      padding: 18,
      paddingBottom: 50,
    },
  });