import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Theme } from "../../theme/theme";

export default function YieldCalc() {
  const [pdc, setPdc] = useState("");
  const [psh, setPsh] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateYield = () => {
    const power = parseFloat(pdc);
    const sunHours = parseFloat(psh);
    const eta = parseFloat(efficiency);

    if (
      isNaN(power) ||
      isNaN(sunHours) ||
      isNaN(eta) ||
      power <= 0 ||
      sunHours <= 0 ||
      eta <= 0
    ) {
      setResult(null);
      return;
    }

    const derate = eta / 100;

    const dailyYield = power * sunHours * derate;

    setResult(dailyYield);
  };

  const getStatus = () => {
    if (result === null) return "";

    if (result >= 25) return "Excellent Production ☀️";
    if (result >= 15) return "Good Output ⚡";
    if (result >= 8) return "Average Generation ⚠️";
    return "Low Production 🚨";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Yield Estimate</Text>
      <Text style={styles.formula}>
        E = Pdc × PSH × ηsys
      </Text>

      <Text style={styles.label}>System Size (kW)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 5"
        value={pdc}
        onChangeText={setPdc}
      />

      <Text style={styles.label}>Peak Sun Hours</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 5.5"
        value={psh}
        onChangeText={setPsh}
      />

      <Text style={styles.label}>System Efficiency (%)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 78"
        value={efficiency}
        onChangeText={setEfficiency}
      />

      <TouchableOpacity style={styles.button} onPress={calculateYield}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {result !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>
            {result.toFixed(2)} kWh/day
          </Text>
          <Text style={styles.status}>{getStatus()}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    color: Theme.colors.primary,
  },
  formula: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: Theme.colors.primary,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  resultCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#f5f7ff",
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "700",
    color: Theme.colors.primary,
  },
  status: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
  },
});