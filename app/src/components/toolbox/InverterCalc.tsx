import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Theme } from "../../theme/theme";
import Screen from "../Screen";

export default function InverterCalc() {
  const [dcPower, setDcPower] = useState("");
  const [acPower, setAcPower] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateEfficiency = () => {
    const dc = parseFloat(dcPower);
    const ac = parseFloat(acPower);

    if (!dc || !ac || dc <= 0) {
      setResult(null);
      return;
    }

    const efficiency = (ac / dc) * 100;
    setResult(efficiency);
  };

  const getStatus = () => {
    if (result === null) return "";

    if (result >= 95) return "Excellent ✅";
    if (result >= 90) return "Good ⚡";
    if (result >= 85) return "Average ⚠️";
    return "Poor ❌";
  };

  return (
    <Screen>
    <View style={styles.container}>
      <Text style={styles.title}>Inverter Efficiency</Text>
      <Text style={styles.formula}>η = (AC Power / DC Power) × 100</Text>

      <Text style={styles.label}>DC Input Power (W)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter DC power"
        value={dcPower}
        onChangeText={setDcPower}
      />

      <Text style={styles.label}>AC Output Power (W)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter AC power"
        value={acPower}
        onChangeText={setAcPower}
      />

      <TouchableOpacity style={styles.button} onPress={calculateEfficiency}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {result !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>
            Efficiency: {result.toFixed(2)}%
          </Text>
          <Text style={styles.status}>{getStatus()}</Text>
        </View>
      )}
    </View>
    </Screen>
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
    fontSize: 22,
    fontWeight: "700",
    color: Theme.colors.primary,
  },
  status: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
  },
});