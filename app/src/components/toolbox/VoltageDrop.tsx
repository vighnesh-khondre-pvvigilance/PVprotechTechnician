import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Theme } from "../../theme/theme";

export default function VoltageDrop() {
  const [length, setLength] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateDrop = () => {
    const L = parseFloat(length);
    const I = parseFloat(current);
    const R = parseFloat(resistance);

    if (isNaN(L) || isNaN(I) || isNaN(R) || L <= 0 || I <= 0 || R <= 0) {
      setResult(null);
      return;
    }

    const drop = (2 * L * I * R) / 1000;
    setResult(drop);
  };

  const getStatus = () => {
    if (result === null) return "";

    if (result <= 2) return "Excellent Line Loss ✅";
    if (result <= 5) return "Acceptable Drop ⚡";
    if (result <= 10) return "High Voltage Drop ⚠️";
    return "Critical Loss 🚨";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voltage Drop</Text>
      <Text style={styles.formula}>
        Vdrop = (2 × L × I × R) / 1000
      </Text>

      <Text style={styles.label}>Cable Length (m)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter one-way length"
        value={length}
        onChangeText={setLength}
      />

      <Text style={styles.label}>Current (A)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter current"
        value={current}
        onChangeText={setCurrent}
      />

      <Text style={styles.label}>Resistance (Ω/km)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter cable resistance"
        value={resistance}
        onChangeText={setResistance}
      />

      <TouchableOpacity style={styles.button} onPress={calculateDrop}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {result !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>
            Drop: {result.toFixed(2)} V
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
    fontSize: 22,
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