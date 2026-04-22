import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Screen from "./src/components/Screen";
import { Theme } from "./src/theme/theme";

/* ================= MAIN SCREEN ================= */

export default function DocumentsScreen() {
  const [selectedClients, setSelectedClients] = useState<string[]>([
    "Ruturaj Deshmukh",
  ]);

  const clients = ["Ruturaj Deshmukh", "Amit Patil", "Sanket Jadhav"];

  const historyData = [
    {
      client: "Ruturaj Deshmukh",
      plant: "Solar Plant",
      date: "15/04/2026",
      status: "Online",
    },
  ];

  const addClient = (name: string) => {
    if (!selectedClients.includes(name)) {
      setSelectedClients([...selectedClients, name]);
    }
  };

  const removeClient = (name: string) => {
    setSelectedClients(selectedClients.filter((c) => c !== name));
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Technician Documents</Text>
        <Text style={styles.subtitle}>
          Upload profile image and all verification documents
        </Text>

        {/* Uploads */}
        <UploadBox title="Technician Profile Image" type="image" />
        <UploadBox title="Technician Company ID" />
        <UploadBox title="Technician Aadhar Card" />
        <UploadBox title="Technician Medical Certificate" />
        <UploadBox title="Technician Vertigo Test" />
        <UploadBox title="Technician Driving License" />
        <UploadBox title="Extra Document" />

        {/* Clients */}
        <ClientSelector
          clients={clients}
          selected={selectedClients}
          onSelect={addClient}
        />

        {/* Allocated */}
        <Text style={styles.section}>Allocated Clients</Text>
        {selectedClients.map((c) => (
          <AllocatedClientCard
            key={c}
            name={c}
            date="15 Apr 2026"
            onRemove={() => removeClient(c)}
          />
        ))}

        {/* History */}
        <Text style={styles.section}>Technician Work History</Text>
        {historyData.map((h, i) => (
          <WorkHistoryCard key={i} {...h} />
        ))}
      </ScrollView>
    </Screen>
  );
}

/* ================= COMPONENTS ================= */

function UploadBox({
  title,
  type = "pdf",
}: {
  title: string;
  type?: "image" | "pdf";
}) {
  return (
    <View style={styles.uploadCard}>
      <Text style={styles.uploadTitle}>{title}</Text>
      <Text style={styles.uploadSub}>
        Max size: 10MB | {type === "image" ? "Image" : "PDF only"}
      </Text>

      <TouchableOpacity style={styles.uploadBox}>
        <Ionicons name="cloud-upload-outline" size={26} color="#888" />
        <Text>Click to upload</Text>
        <Text style={styles.drag}>or drag and drop</Text>
      </TouchableOpacity>
    </View>
  );
}

function ClientSelector({
  clients,
  selected,
  onSelect,
}: {
  clients: string[];
  selected: string[];
  onSelect: (name: string) => void;
}) {
  return (
    <View>
      <Text style={styles.section}>Assign Clients</Text>
      <Text style={styles.hint}>
        Already selected clients are disabled
      </Text>

      <View style={styles.clientRow}>
        {clients.map((c) => {
          const disabled = selected.includes(c);
          return (
            <TouchableOpacity
              key={c}
              style={[styles.clientItem, disabled && { opacity: 0.4 }]}
              disabled={disabled}
              onPress={() => onSelect(c)}
            >
              <Text>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function AllocatedClientCard({
  name,
  date,
  onRemove,
}: {
  name: string;
  date: string;
  onRemove: () => void;
}) {
  return (
    <View style={styles.allocCard}>
      <View>
        <Text style={styles.clientName}>{name}</Text>
        <Text style={styles.date}>📅 {date}</Text>
      </View>

      <TouchableOpacity onPress={onRemove}>
        <Text style={styles.remove}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}

function WorkHistoryCard({
  client,
  plant,
  date,
  status,
}: {
  client: string;
  plant: string;
  date: string;
  status: string;
}) {
  return (
    <View style={styles.historyCard}>
      <Text style={styles.historyTitle}>Client: {client}</Text>
      <Text>Plant: {plant}</Text>
      <Text>Visit Date: {date}</Text>
      <Text>Status: {status}</Text>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
   padding:5,
    paddingBottom: 100,
  },

  title: {
    fontSize: 22,
    
    fontWeight: "700",
  },

  subtitle: {
    color: "#777",
    marginBottom: 16,
  },

  section: {
    marginTop: 20,
    fontWeight: "600",
    fontSize: 16,
  },

  /* Upload */
  uploadCard: { marginBottom: 14 },
  uploadTitle: { fontWeight: "600" },
  uploadSub: { fontSize: 12, color: "#777", marginBottom: 6 },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
  },
  drag: { fontSize: 12, color: "#aaa" },

  /* Clients */
  hint: { fontSize: 12, color: "#777", marginBottom: 10 },
  clientRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  clientItem: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 6,
  },

  /* Allocated */
  allocCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  clientName: { fontWeight: "600" },
  date: { fontSize: 12, color: "#777" },
  remove: { color: "red" },

  /* History */
  historyCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  historyTitle: { fontWeight: "700" },
});