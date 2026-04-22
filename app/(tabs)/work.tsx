// app/(tabs)/work.tsx
// FIXED FOR YOUR CURRENT flat workData STRUCTURE

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Screen from "./../src/components/Screen";
import { Theme } from "./../src/theme/theme";
import { workData } from "./../src/data/work";

export default function Work() {
  const currentTech = "tech001";

  // only pending assigned jobs
  const assignedWork = workData.filter(
    (item) =>
      item.technicianId === currentTech &&
      item.status === "Pending"
  );

  // group by client
  const groupedClients = assignedWork.reduce(
    (acc: any[], item) => {
      const existing =
        acc.find(
          (client) =>
            client.clientId === item.clientId
        );

      if (existing) {
        existing.plants.push(item);
      } else {
        acc.push({
          clientId: item.clientId,
          clientName: item.clientName,
          plants: [item],
        });
      }

      return acc;
    },
    []
  );

  return (
    <Screen>
      <Text style={styles.title}>
        Assigned Clients
      </Text>

      {groupedClients.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons
            name="briefcase-outline"
            size={60}
            color={Theme.colors.subtext}
          />

          <Text style={styles.emptyText}>
            No Clients Assigned
          </Text>
        </View>
      ) : (
        <FlatList
          data={groupedClients}
          keyExtractor={(item, index) =>
            `${item.clientId}-${index}`
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push(
                  `/client/${item.clientId}`
                )
              }
            >
              <View>
                <Text style={styles.name}>
                  {item.clientName}
                </Text>

                <Text style={styles.sub}>
                  {item.plants.length} Plants
                  Assigned
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color={
                  Theme.colors.primary
                }
              />
            </TouchableOpacity>
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  card: {
    backgroundColor:
      Theme.colors.card,
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: Theme.colors.text,
  },

  sub: {
    marginTop: 4,
    color:
      Theme.colors.subtext,
    fontSize: 13,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    marginTop: 12,
    color:
      Theme.colors.subtext,
  },
});