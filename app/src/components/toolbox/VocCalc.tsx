import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Screen from "../Screen"; // adjust path if needed
import { Theme } from "../../theme/theme";

export default function VocCalc() {
  const [voc, setVoc] = useState("");
  const [alpha, setAlpha] = useState("");
  const [tMin, setTMin] = useState("");
  const [modules, setModules] = useState("");

  const parsed = useMemo(() => {
    const panelVoc = parseFloat(voc);
    const coeff = parseFloat(alpha);
    const minTemp = parseFloat(tMin);
    const count = parseInt(modules || "1");

    const valid =
      !isNaN(panelVoc) &&
      !isNaN(coeff) &&
      !isNaN(minTemp) &&
      !isNaN(count) &&
      panelVoc > 0 &&
      count > 0;

    if (!valid) return null;

    const alphaDecimal = coeff / 100;

    // Voc rises when temp drops
    const correctedVoc =
      panelVoc * (1 + alphaDecimal * (minTemp - 25));

    const stringVoc = correctedVoc * count;

    return {
      panelVoc: correctedVoc,
      stringVoc,
      count,
    };
  }, [voc, alpha, tMin, modules]);

  const getStatus = (value: number) => {
    if (value <= 600)
      return {
        text: "Safe for 600V system",
        color: Theme.colors.success,
      };

    if (value <= 1000)
      return {
        text: "Use 1000V inverter / verify design",
        color: Theme.colors.warning,
      };

    if (value <= 1500)
      return {
        text: "Industrial only / check 1500V limit",
        color: Theme.colors.info,
      };

    return {
      text: "Over voltage risk",
      color: Theme.colors.danger,
    };
  };

  const clearAll = () => {
    setVoc("");
    setAlpha("");
    setTMin("");
    setModules("");
  };

  const status = parsed ? getStatus(parsed.stringVoc) : null;

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerCard}>
            <Text style={styles.title}>VOC Safety Calculator</Text>
            <Text style={styles.subtitle}>
              Calculate cold weather maximum string voltage for solar PV systems.
            </Text>
          </View>

          {/* Inputs */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Input Values</Text>

            <InputField
              label="Panel Voc (STC)"
              unit="V"
              placeholder="Ex: 49.5"
              value={voc}
              onChangeText={setVoc}
            />

            <InputField
              label="Temp Coefficient"
              unit="%/°C"
              placeholder="Ex: -0.28"
              value={alpha}
              onChangeText={setAlpha}
            />

            <InputField
              label="Minimum Site Temp"
              unit="°C"
              placeholder="Ex: -5"
              value={tMin}
              onChangeText={setTMin}
            />

            <InputField
              label="Modules in Series"
              unit="Nos"
              placeholder="Ex: 12"
              value={modules}
              onChangeText={setModules}
            />

            <TouchableOpacity
              style={styles.secondaryBtn}
              activeOpacity={0.85}
              onPress={clearAll}
            >
              <Text style={styles.secondaryBtnText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Result */}
          {parsed && status && (
            <View style={styles.resultCard}>
              <Text style={styles.sectionTitle}>Calculation Result</Text>

              <Metric
                label="Corrected Panel Voc"
                value={`${parsed.panelVoc.toFixed(2)} V`}
              />

              <Metric
                label="String Maximum Voc"
                value={`${parsed.stringVoc.toFixed(2)} V`}
              />

              <Metric
                label="Modules Count"
                value={`${parsed.count}`}
              />

              <View
                style={[
                  styles.badge,
                  { backgroundColor: status.color },
                ]}
              >
                <Text style={styles.badgeText}>{status.text}</Text>
              </View>
            </View>
          )}

          {/* Formula */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Formula Used</Text>
            <Text style={styles.infoText}>
              Vmax = Voc × [1 + (α × (Tmin - 25))]
            </Text>
            <Text style={styles.infoSub}>
              α should be entered in %/°C (example: -0.28)
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function InputField({
  label,
  unit,
  value,
  onChangeText,
  placeholder,
}: any) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>
        {label} <Text style={styles.unit}>{unit}</Text>
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.metricRow}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 1,
    paddingBottom: 40,
    gap: 14,
  },

  headerCard: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 20,
    padding: 18,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },

  subtitle: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    elevation: 2,
  },

  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    elevation: 2,
  },

  infoCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Theme.colors.text,
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: Theme.colors.text,
    marginBottom: 6,
  },

  unit: {
    color: Theme.colors.subtext,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: Theme.colors.text,
  },

  secondaryBtn: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },

  secondaryBtnText: {
    fontWeight: "800",
    color: Theme.colors.text,
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  metricLabel: {
    fontSize: 14,
    color: Theme.colors.subtext,
    fontWeight: "600",
  },

  metricValue: {
    fontSize: 15,
    color: Theme.colors.text,
    fontWeight: "800",
  },

  badge: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 999,
  },

  badgeText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 13,
  },

  infoText: {
    fontSize: 15,
    fontWeight: "800",
    color: Theme.colors.text,
  },

  infoSub: {
    marginTop: 8,
    color: Theme.colors.subtext,
    fontSize: 13,
    lineHeight: 18,
  },
});