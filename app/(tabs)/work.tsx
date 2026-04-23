// app/(tabs)/work.tsx

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  useMemo,
  useState,
} from "react";
import {
  Ionicons,
} from "@expo/vector-icons";
import { router } from "expo-router";

import Screen from "./../src/components/Screen";
import { Theme } from "./../src/theme/theme";
import { workData } from "./../src/data/work";

export default function Work() {
  const currentTech =
    "tech001";

  const [search, setSearch] =
    useState("");

  const assignedWork =
    workData.filter(
      (item) =>
        item.technicianId ===
          currentTech &&
        item.status ===
          "Pending"
    );

  const groupedClients =
    assignedWork.reduce(
      (
        acc: any[],
        item
      ) => {
        const existing =
          acc.find(
            (
              client
            ) =>
              client.clientId ===
              item.clientId
          );

        if (
          existing
        ) {
          existing.plants.push(
            item
          );
        } else {
          acc.push({
            clientId:
              item.clientId,
            clientName:
              item.clientName,
            plants: [
              item,
            ],
          });
        }

        return acc;
      },
      []
    );

  const filteredData =
    useMemo(() => {
      return groupedClients.filter(
        (item) =>
          item.clientName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [
      search,
      groupedClients,
    ]);

  const totalPlants =
    assignedWork.length;

  const urgentCount =
    assignedWork.filter(
      (item) =>
        item.priority ===
        "High"
    ).length;

  return (
    <Screen>
       <View style={styles.container}>
      {/* Header */}
      <View
        style={
          styles.headerRow
        }
      >
        <View>
          <Text
            style={
              styles.smallTitle
            }
          >
            Solar Dashboard
          </Text>

          <Text
            style={
              styles.mainTitle
            }
          >
            Work Panel
          </Text>
        </View>

        <TouchableOpacity
          style={
            styles.profileBtn
          }
          onPress={() =>
            router.push(
              "/(tabs)/profile"
            )
          }
        >
          <Ionicons
            name="person-outline"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Ultra Premium Stats */}
      <View
        style={
          styles.statsCard
        }
      >
        <View
          style={
            styles.glow1
          }
        />
        <View
          style={
            styles.glow2
          }
        />

        <View
          style={
            styles.statRow
          }
        >
          <View>
            <Text
              style={
                styles.statLabel
              }
            >
              Assigned Clients
            </Text>

            <Text
              style={
                styles.statSub
              }
            >
              Total active accounts
            </Text>
          </View>

          <Text
            style={
              styles.statValue
            }
          >
            {
              groupedClients.length
            }
          </Text>
        </View>

        <View
          style={
            styles.line
          }
        />

        <View
          style={
            styles.statRow
          }
        >
          <View>
            <Text
              style={
                styles.statLabel
              }
            >
              Pending Plants
            </Text>

            <Text
              style={
                styles.statSub
              }
            >
              Visits remaining
            </Text>
          </View>

          <Text
            style={
              styles.statValue
            }
          >
            {
              totalPlants
            }
          </Text>
        </View>

        <View
          style={
            styles.line
          }
        />

        <View
          style={
            styles.statRow
          }
        >
          <View>
            <Text
              style={
                styles.statLabel
              }
            >
              Urgent Visits
            </Text>

            <Text
              style={
                styles.statSub
              }
            >
              High priority tasks
            </Text>
          </View>

          <Text
            style={[
              styles.statValue,
              {
                color:
                  "#FCA5A5",
              },
            ]}
          >
            {
              urgentCount
            }
          </Text>
        </View>
      </View>

      {/* Search */}
      <View
        style={
          styles.searchBox
        }
      >
        <Ionicons
          name="search"
          size={18}
          color="#64748B"
        />

        <TextInput
          placeholder="Search client..."
          placeholderTextColor="#94A3B8"
          style={
            styles.input
          }
          value={search}
          onChangeText={
            setSearch
          }
        />
      </View>

      {/* Section */}
      <Text
        style={
          styles.sectionTitle
        }
      >
        Assigned Clients
      </Text>

      {/* List */}
      <FlatList
       style={{ flex: 1 }}
        data={filteredData}
        keyExtractor={(
          item,
          index
        ) =>
          `${item.clientId}-${index}`
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ListEmptyComponent={
          <View
            style={
              styles.emptyWrap
            }
          >
            <Ionicons
              name="briefcase-outline"
              size={48}
              color="#94A3B8"
            />

            <Text
              style={
                styles.emptyTitle
              }
            >
              No Work Found
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              No assigned clients right now
            </Text>
          </View>
        }
        renderItem={({
          item,
        }) => {
          const urgent =
            item.plants.filter(
              (
                p: any
              ) =>
                p.priority ===
                "High"
            ).length;

          return (
            <TouchableOpacity
              activeOpacity={
                0.85
              }
              style={
                styles.card
              }
              onPress={() =>
                router.push(
                  `/client/${item.clientId}`
                )
              }
            >
              {/* Avatar */}
              <View
                style={
                  styles.avatar
                }
              >
                <Text
                  style={
                    styles.avatarText
                  }
                >
                  {item.clientName
                    .charAt(
                      0
                    )
                    .toUpperCase()}
                </Text>
              </View>

              {/* Info */}
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={
                    styles.name
                  }
                >
                  {
                    item.clientName
                  }
                </Text>

                <Text
                  style={
                    styles.sub
                  }
                >
                  {
                    item.plants
                      .length
                  }{" "}
                  Plants Assigned
                </Text>

                {urgent >
                  0 && (
                  <View
                    style={
                      styles.badge
                    }
                  >
                    <Ionicons
                      name="warning"
                      size={
                        12
                      }
                      color="#DC2626"
                    />
                    <Text
                      style={
                        styles.badgeText
                      }
                    >
                      {
                        urgent
                      }{" "}
                      urgent
                    </Text>
                  </View>
                )}
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color={
                  Theme
                    .colors
                    .primary
                }
              />
            </TouchableOpacity>
          );
        }}
      />
      </View>
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
  paddingHorizontal: 6,
  paddingTop: 4,
  paddingBottom: 10,
},
    headerRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginBottom: 18,
    },

    smallTitle: {
      fontSize: 13,
      color:
        Theme.colors.subtext,
      fontWeight: "600",
    },

    mainTitle: {
      fontSize: 28,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginTop: 2,
    },

    profileBtn: {
      width: 46,
      height: 46,
      borderRadius: 16,
      backgroundColor:
        Theme.colors.primary,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    statsCard: {
      backgroundColor:
        Theme.colors.primary,
      borderRadius: 28,
      padding: 18,
      marginBottom: 18,
      overflow:
        "hidden",
    },

    glow1: {
      position:
        "absolute",
      top: -40,
      right: -30,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    glow2: {
      position:
        "absolute",
      bottom: -30,
      left: -30,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor:
        "rgba(255,255,255,0.06)",
    },

    statRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      paddingVertical: 8,
    },

    statLabel: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
    },

    statSub: {
      color:
        "rgba(255,255,255,0.7)",
      fontSize: 12,
      marginTop: 2,
    },

    statValue: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "900",
    },

    line: {
      height: 1,
      backgroundColor:
        "rgba(255,255,255,0.10)",
      marginVertical: 4,
    },

    searchBox: {
      backgroundColor:
        "#fff",
      borderRadius: 18,
      paddingHorizontal: 14,
      paddingVertical: 13,
      flexDirection:
        "row",
      alignItems:
        "center",
      marginBottom: 18,
    },

    input: {
      marginLeft: 10,
      flex: 1,
      color: "#111827",
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 12,
      color:
        Theme.colors.text,
    },

    card: {
      backgroundColor:
        "#fff",
      borderRadius: 22,
      padding: 16,
      marginBottom: 12,
      flexDirection:
        "row",
      alignItems:
        "center",
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 3,
    },

    avatar: {
      width: 50,
      height: 50,
      borderRadius: 18,
      backgroundColor:
        "#EEF2FF",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginRight: 14,
    },

    avatarText: {
      fontSize: 18,
      fontWeight: "800",
      color:
        Theme.colors.primary,
    },

    name: {
      fontSize: 16,
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    sub: {
      fontSize: 13,
      color:
        Theme.colors.subtext,
      marginTop: 4,
    },

    badge: {
      marginTop: 8,
      alignSelf:
        "flex-start",
      flexDirection:
        "row",
      alignItems:
        "center",
      backgroundColor:
        "#FEF2F2",
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 20,
      gap: 4,
    },

    badgeText: {
      color: "#DC2626",
      fontSize: 11,
      fontWeight: "700",
    },

    emptyWrap: {
      alignItems:
        "center",
      marginTop: 70,
    },

    emptyTitle: {
      marginTop: 12,
      fontSize: 18,
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    emptyText: {
      marginTop: 4,
      fontSize: 14,
      color:
        Theme.colors.subtext,
    },
  });