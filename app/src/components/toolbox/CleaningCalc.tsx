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

export default function CleaningCalc() {
  const [beforePower, setBeforePower] = useState("");
  const [afterPower, setAfterPower] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateGain = () => {
    const before = parseFloat(beforePower);
    const after = parseFloat(afterPower);

    if (!before || !after || before <= 0) {
      setResult(null);
      return;
    }

    const gain = ((after - before) / before) * 100;
    setResult(gain);
  };

  const getStatus = () => {
    if (result === null) return "";

    if (result >= 15) return "Excellent Cleaning Impact ✅";
    if (result >= 8) return "Good Improvement ⚡";
    if (result >= 1) return "Minor Gain ⚠️";
    if (result === 0) return "No Change";
    return "Performance Dropped ❌";
  };

  return (
    <Screen>
    <View style={styles.container}>
      <Text style={styles.title}>Cleaning Impact</Text>
      <Text style={styles.formula}>
        Increase = ((After - Before) / Before) × 100
      </Text>

      <Text style={styles.label}>Before Cleaning Power (W)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter before value"
        value={beforePower}
        onChangeText={setBeforePower}
      />

      <Text style={styles.label}>After Cleaning Power (W)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter after value"
        value={afterPower}
        onChangeText={setAfterPower}
      />

      <TouchableOpacity style={styles.button} onPress={calculateGain}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {result !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>
            Gain: {result.toFixed(2)}%
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
    textAlign: "center",
  },
});