import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Theme } from "../../theme/theme";

export default function VocCalc() {
  const [voc, setVoc] = useState("");
  const [alpha, setAlpha] = useState("");
  const [tMin, setTMin] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateVoc = () => {
    const baseVoc = parseFloat(voc);
    const coeff = parseFloat(alpha);
    const minTemp = parseFloat(tMin);

    if (isNaN(baseVoc) || isNaN(coeff) || isNaN(minTemp) || baseVoc <= 0) {
      setResult(null);
      return;
    }

    // alpha entered as %/°C like -0.28 => convert to decimal
    const alphaDecimal = coeff / 100;

    const maxVoc =
      baseVoc * (1 + alphaDecimal * (minTemp - 25));

    setResult(maxVoc);
  };

  const getStatus = () => {
    if (result === null) return "";

    if (result <= 600) return "Safe for 600V System ✅";
    if (result <= 1000) return "Check Inverter Limit ⚠️";
    return "Over Voltage Risk 🚨";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VOC Safety Check</Text>
      <Text style={styles.formula}>
        Vmax = Voc × [1 + (α × (Tmin - 25))]
      </Text>

      <Text style={styles.label}>Panel Voc (V)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 49.5"
        value={voc}
        onChangeText={setVoc}
      />

      <Text style={styles.label}>Temp Coefficient α (%/°C)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: -0.28"
        value={alpha}
        onChangeText={setAlpha}
      />

      <Text style={styles.label}>Minimum Site Temp (°C)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: -5"
        value={tMin}
        onChangeText={setTMin}
      />

      <TouchableOpacity style={styles.button} onPress={calculateVoc}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {result !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>
            Max Voc: {result.toFixed(2)} V
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