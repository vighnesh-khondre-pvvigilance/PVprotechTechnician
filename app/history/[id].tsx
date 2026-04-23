import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import Screen from "../src/components/Screen";
import { Theme } from "../src/theme/theme";
import { workData } from "../src/data/work";
import { Work } from "../src/types/work";

export default function WorkDetails() {
  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const work:
    | Work
    | undefined =
    workData.find(
      (item) =>
        item.id === id
    );

  if (!work) {
    return (
      <Screen>
        <View
          style={
            styles.emptyWrap
          }
        >
          <Ionicons
            name="folder-open-outline"
            size={58}
            color="#94A3B8"
          />

          <Text
            style={
              styles.emptyTitle
            }
          >
            Work Not Found
          </Text>

          <Text
            style={
              styles.emptyText
            }
          >
            No details available
          </Text>
        </View>
      </Screen>
    );
  }

  const formatDate = (
    date?: string
  ) => {
    if (!date) return "—";

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.container
        }
      >
        {/* Header */}
        <View
          style={
            styles.headerRow
          }
        >
          <TouchableOpacity
            style={
              styles.backBtn
            }
            onPress={() =>
              router.back()
            }
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color="#111827"
            />
          </TouchableOpacity>

          <Text
            style={
              styles.headerText
            }
          >
            Work Details
          </Text>

          <View
            style={{
              width: 42,
            }}
          />
        </View>

        {/* Hero */}
        <View
          style={
            styles.hero
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

          <Text
            style={
              styles.heroLabel
            }
          >
            Completed Visit
          </Text>

          <Text
            style={
              styles.heroTitle
            }
          >
            {work.title}
          </Text>

          <View
            style={
              styles.heroRow
            }
          >
            <View
              style={
                styles.heroBadge
              }
            >
              <Text
                style={
                  styles.heroBadgeText
                }
              >
                Done
              </Text>
            </View>

            <Text
              style={
                styles.heroDate
              }
            >
              {formatDate(
                work.completedDate
              )}
            </Text>
          </View>
        </View>

        {/* Issue */}
        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Inspection / Issue
          </Text>

          <Text
            style={
              styles.bodyText
            }
          >
            {work.issue ||
              "No details provided"}
          </Text>
        </View>

        {/* Plant Info */}
        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Plant Information
          </Text>

          <InfoRow
            icon="person-outline"
            label="Owner"
            value={
              work.ownerName ||
              "-"
            }
          />

          <InfoRow
            icon="leaf-outline"
            label="Plant"
            value={
              work.plantName ||
              "-"
            }
          />

          <InfoRow
            icon="flash-outline"
            label="Capacity"
            value={
              work.capacity ||
              "-"
            }
          />

          <InfoRow
            icon="location-outline"
            label="Location"
            value={
              work.location ||
              "-"
            }
          />
        </View>

        {/* Photos */}
        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Before Photo
          </Text>

          {work.beforeImage ? (
            <Image
              source={{
                uri: work.beforeImage,
              }}
              style={
                styles.image
              }
            />
          ) : (
            <Text
              style={
                styles.noPhoto
              }
            >
              No image uploaded
            </Text>
          )}
        </View>

        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            After Photo
          </Text>

          {work.afterImage ? (
            <Image
              source={{
                uri: work.afterImage,
              }}
              style={
                styles.image
              }
            />
          ) : (
            <Text
              style={
                styles.noPhoto
              }
            >
              No image uploaded
            </Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: any) {
  return (
    <View
      style={
        styles.infoRow
      }
    >
      <Ionicons
        name={icon}
        size={18}
        color={
          Theme.colors.primary
        }
      />

      <Text
        style={
          styles.infoLabel
        }
      >
        {label}
      </Text>

      <Text
        style={
          styles.infoValue
        }
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      paddingHorizontal: 6,
      paddingTop: 6,
      paddingBottom: 30,
    },

    headerRow: {
      flexDirection:
        "row",
      alignItems:
        "center",
      justifyContent:
        "space-between",
      marginBottom: 14,
    },

    backBtn: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor:
        "#fff",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    headerText: {
      fontSize: 18,
      fontWeight:
        "800",
      color:
        Theme.colors.text,
    },

    hero: {
      backgroundColor:
        Theme.colors.primary,
      borderRadius: 26,
      padding: 18,
      marginBottom: 14,
      overflow:
        "hidden",
    },

    glow1: {
      position:
        "absolute",
      top: -30,
      right: -20,
      width: 110,
      height: 110,
      borderRadius: 60,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    glow2: {
      position:
        "absolute",
      bottom: -30,
      left: -20,
      width: 100,
      height: 100,
      borderRadius: 60,
      backgroundColor:
        "rgba(255,255,255,0.06)",
    },

    heroLabel: {
      color:
        "rgba(255,255,255,0.75)",
      fontSize: 13,
    },

    heroTitle: {
      color: "#fff",
      fontSize: 22,
      fontWeight:
        "800",
      marginTop: 6,
    },

    heroRow: {
      marginTop: 14,
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    heroBadge: {
      backgroundColor:
        "rgba(255,255,255,0.16)",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },

    heroBadgeText: {
      color: "#fff",
      fontSize: 12,
      fontWeight:
        "700",
    },

    heroDate: {
      color:
        "rgba(255,255,255,0.8)",
      fontSize: 12,
    },

    card: {
      backgroundColor:
        "#fff",
      borderRadius: 22,
      padding: 16,
      marginBottom: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 8,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight:
        "800",
      color:
        Theme.colors.text,
      marginBottom: 12,
    },

    bodyText: {
      color:
        Theme.colors.text,
      lineHeight: 21,
      fontSize: 14,
    },

    infoRow: {
      flexDirection:
        "row",
      alignItems:
        "center",
      marginBottom: 12,
    },

    infoLabel: {
      marginLeft: 10,
      width: 70,
      fontSize: 13,
      color: "#64748B",
    },

    infoValue: {
      flex: 1,
      fontSize: 14,
      fontWeight:
        "700",
      color:
        Theme.colors.text,
    },

    image: {
      width: "100%",
      height: 190,
      borderRadius: 16,
    },

    noPhoto: {
      color: "#94A3B8",
      fontSize: 13,
    },

    emptyWrap: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
      marginTop: 100,
    },

    emptyTitle: {
      marginTop: 12,
      fontSize: 18,
      fontWeight:
        "800",
      color:
        Theme.colors.text,
    },

    emptyText: {
      marginTop: 4,
      color:
        Theme.colors.subtext,
    },
  });