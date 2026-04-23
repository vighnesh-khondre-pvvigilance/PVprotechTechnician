import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "./../src/components/Screen";
import { Theme } from "../src/theme/theme";

import { Contact, Role } from "../src/types/contact";
import { getContacts } from "../src/services/contactService";

const ROLES: (Role | "All")[] = [
  "All",
  "Super Admin",
  "Admin",
  "Technician",
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_WIDTH = (SCREEN_WIDTH - 28) / ROLES.length;

export default function ContactScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] =
    useState<Role | "All">("All");
  const [loading, setLoading] = useState(true);

  const indicatorX =
    useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (
    index: number,
    role: Role | "All"
  ) => {
    setSelectedRole(role);

    Animated.spring(indicatorX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  const filteredContacts = contacts.filter(
    (item) => {
      const matchSearch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.phone.includes(search);

      const matchRole =
        selectedRole === "All" ||
        item.role === selectedRole;

      return matchSearch && matchRole;
    }
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  const getRoleColor = (role: Role) => {
    switch (role) {
      case "Super Admin":
        return "#EF4444";
      case "Admin":
        return "#2563EB";
      case "Technician":
        return "#10B981";
    }
  };

  const handleCall = (phone: string) =>
    Linking.openURL(`tel:${phone}`);

  const handleWhatsApp = (phone: string) =>
    Linking.openURL(
      `https://wa.me/91${phone}`
    );

  const renderItem = ({
    item,
  }: {
    item: Contact;
  }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(item.name)}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.info}>
            {item.email}
          </Text>

          <Text style={styles.info}>
            {item.phone}
          </Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View
          style={[
            styles.roleBadge,
            {
              backgroundColor:
                getRoleColor(item.role),
            },
          ]}
        >
          <Text style={styles.roleText}>
            {item.role}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() =>
              handleCall(item.phone)
            }
          >
            <Ionicons
              name="call"
              size={16}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconBtn,
              {
                backgroundColor:
                  "#22C55E",
              },
            ]}
            onPress={() =>
              handleWhatsApp(
                item.phone
              )
            }
          >
            <Ionicons
              name="logo-whatsapp"
              size={16}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Screen>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.small}>
              Team Directory
            </Text>

            <Text style={styles.title}>
              Contacts
            </Text>
          </View>

          <View style={styles.countBox}>
            <Text style={styles.count}>
              {filteredContacts.length}
            </Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons
            name="search"
            size={18}
            color="#94A3B8"
          />

          <TextInput
            placeholder="Search contacts..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Tabs */}
        <View style={styles.filterContainer}>
          <Animated.View
            style={[
              styles.activeIndicator,
              {
                width: TAB_WIDTH,
                transform: [
                  {
                    translateX:
                      indicatorX,
                  },
                ],
              },
            ]}
          />

          {ROLES.map(
            (role, index) => (
              <TouchableOpacity
                key={role}
                style={
                  styles.segment
                }
                onPress={() =>
                  handleSelect(
                    index,
                    role
                  )
                }
              >
                <Text
                  style={[
                    styles.segmentText,
                    selectedRole ===
                      role &&
                      styles.activeText,
                  ]}
                >
                  {role}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* List */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color={
              Theme.colors.primary
            }
            style={{
              marginTop: 40,
            }}
          />
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={filteredContacts}
            keyExtractor={(item) =>
              item.id
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingBottom: 30,
            }}
            ListEmptyComponent={
              <View
                style={
                  styles.emptyBox
                }
              >
                <Ionicons
                  name="people-outline"
                  size={50}
                  color="#CBD5E1"
                />

                <Text
                  style={
                    styles.emptyTitle
                  }
                >
                  No Contacts Found
                </Text>

                <Text
                  style={
                    styles.emptyText
                  }
                >
                  Try another search
                </Text>
              </View>
            }
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 6,
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  small: {
    fontSize: 13,
    color:
      Theme.colors.subtext,
    fontWeight: "600",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color:
      Theme.colors.text,
    marginTop: 2,
  },

  countBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor:
      Theme.colors.primary,
    justifyContent:
      "center",
    alignItems: "center",
  },

  count: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  searchWrap: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#111827",
  },

  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#EEF2F7",
    borderRadius: 22,
    padding: 4,
    marginBottom: 16,
    overflow: "hidden",
  },

  activeIndicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 4,
    backgroundColor: "#fff",
    borderRadius: 18,
    elevation: 2,
  },

  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 2,
  },

  segmentText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  activeText: {
    color:
      Theme.colors.primary,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor:
      "#EEF2FF",
    justifyContent:
      "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    fontWeight: "800",
    fontSize: 16,
    color:
      Theme.colors.primary,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color:
      Theme.colors.text,
  },

  info: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },

  bottomRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  roleText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  actions: {
    flexDirection: "row",
    gap: 8,
  },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor:
      Theme.colors.primary,
    justifyContent:
      "center",
    alignItems: "center",
  },

  emptyBox: {
    marginTop: 80,
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "700",
    color:
      Theme.colors.text,
  },

  emptyText: {
    marginTop: 4,
    color: "#94A3B8",
  },
});