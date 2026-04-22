// app/client/[id].tsx
// FIXED FOR YOUR CURRENT flat workData STRUCTURE

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";

import {
    useLocalSearchParams,
    router,
} from "expo-router";

import Screen from "../src/components/Screen";
import { Theme } from "../src/theme/theme";
import { workData } from "../src/data/work";

export default function ClientPlants() {
    const { id } =
        useLocalSearchParams();

    const currentTech = "tech001";

    // find all plants under same clientId
    const plants =
        workData.filter(
            (item) =>
                item.clientId === id &&
                item.technicianId ===
                currentTech &&
                item.status === "Pending"
        );

    const clientName =
        plants[0]?.clientName;

    if (plants.length === 0) {
        return (
            <Screen>
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>
                        Client not found
                    </Text>
                </View>
            </Screen>
        );
    }

    return (
        <Screen>
            <Text style={styles.title}>
                {clientName}
            </Text>

            <FlatList
                data={plants}
                keyExtractor={(item, index) =>
                    `${item.id}-${index}`
                }
                showsVerticalScrollIndicator={
                    false
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            router.push(
                                `/work/${item.id}`
                            )
                        }
                    >
                        <Text style={styles.name}>
                            {item.plantName}
                        </Text>

                        <Text style={styles.sub}>
                            {item.location}
                        </Text>

                        <Text style={styles.sub}>
                            {item.capacity}
                        </Text>

                        <View
                            style={
                                styles.bottom
                            }
                        >
                            <View
                                style={[
                                    styles.badge,
                                    {
                                        backgroundColor:
                                            item.priority ===
                                                "High"
                                                ? "#DC2626"
                                                : item.priority ===
                                                    "Medium"
                                                    ? "#F59E0B"
                                                    : "#16A34A",
                                    },
                                ]}
                            >
                                <Text
                                    style={
                                        styles.badgeText
                                    }
                                >
                                    {
                                        item.priority
                                    }
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={
                                    styles.btn
                                }
                                onPress={() =>
                                    router.push(
                                        `/work/${item.id}`
                                    )
                                }
                            >
                                <Text
                                    style={
                                        styles.btnText
                                    }
                                >
                                    Start Visit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </Screen>
    );
}

const styles =
    StyleSheet.create({
        title: {
            fontSize: 22,
            fontWeight: "700",
            marginBottom: 16,
            color:
                Theme.colors.text,
        },

        card: {
            backgroundColor:
                Theme.colors.card,
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
        },

        name: {
            fontSize: 16,
            fontWeight: "700",
            color:
                Theme.colors.text,
        },

        sub: {
            marginTop: 4,
            color:
                Theme.colors.subtext,
            fontSize: 13,
        },

        bottom: {
            marginTop: 14,
            flexDirection:
                "row",
            justifyContent:
                "space-between",
            alignItems:
                "center",
        },

        badge: {
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
        },

        badgeText: {
            color: "#fff",
            fontSize: 11,
            fontWeight: "700",
        },

        btn: {
            backgroundColor:
                Theme.colors.primary,
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 8,
        },

        btnText: {
            color: "#fff",
            fontWeight: "700",
            fontSize: 12,
        },

        empty: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },

        emptyText: {
            color:
                Theme.colors.subtext,
            fontSize: 16,
        },
    });