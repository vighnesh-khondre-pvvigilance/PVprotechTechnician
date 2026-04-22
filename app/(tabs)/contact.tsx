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
import Screen from "./../src/components/Screen";

import { Contact, Role } from "../src/types/contact";
import { getContacts } from "../src/services/contactService";

const ROLES: (Role | "All")[] = [
  "All",
  "Super Admin",
  "Admin",
  "Technician",
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_WIDTH = (SCREEN_WIDTH - 32) / ROLES.length;

export default function ContactScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | "All">("All");
  const [loading, setLoading] = useState(true);

  const indicatorX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      console.log("Error loading contacts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (index: number, role: Role | "All") => {
    setSelectedRole(role);

    Animated.spring(indicatorX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  const filteredContacts = contacts.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search);

    const matchRole =
      selectedRole === "All" || item.role === selectedRole;

    return matchSearch && matchRole;
  });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  const getRoleColor = (role: Role) => {
    switch (role) {
      case "Super Admin":
        return "#FF4D4F";
      case "Admin":
        return "#1677FF";
      case "Technician":
        return "#52C41A";
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsApp = (phone: string) => {
    Linking.openURL(`https://wa.me/91${phone}`);
  };

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(item.name)}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info}>{item.email}</Text>
          <Text style={styles.info}>{item.phone}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View
          style={[
            styles.roleBadge,
            { backgroundColor: getRoleColor(item.role) },
          ]}
        >
          <Text style={styles.roleText}>{item.role}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => handleCall(item.phone)}
          >
            <Text style={styles.btnText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.whatsappBtn}
            onPress={() => handleWhatsApp(item.phone)}
          >
            <Text style={styles.btnText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Screen>
      <View style={styles.container}>
        {/* 🔍 Search */}
        <TextInput
          placeholder="Search contacts..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        {/* 🔥 Animated Filter */}
        <View style={styles.filterContainer}>
          <Animated.View
            style={[
              styles.activeIndicator,
              {
                width: TAB_WIDTH,
                transform: [{ translateX: indicatorX }],
              },
            ]}
          />

          {ROLES.map((role, index) => (
            <TouchableOpacity
              key={role}
              style={styles.segment}
              onPress={() => handleSelect(index, role)}
            >
              <Text
                style={[
                  styles.segmentText,
                  selectedRole === role && styles.activeSegmentText,
                ]}
              >
                {role}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 📦 Content */}
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : filteredContacts.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No contacts found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredContacts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
    paddingTop:10
    
  },

  searchInput: {
    backgroundColor: "#F7F7F7",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },

  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F3F5",
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 16,
  },

  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 2,
  },

  segmentText: {
    fontSize: 13,
    color: "#666",
  },

  activeSegmentText: {
    color: "#1677FF",
    fontWeight: "600",
  },

  activeIndicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 3,
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1677FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "700",
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
  },

  info: {
    fontSize: 13,
    color: "#666",
  },

  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  roleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
  },

  callBtn: {
    backgroundColor: "#1677FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },

  whatsappBtn: {
    backgroundColor: "#25D366",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  emptyBox: {
    marginTop: 50,
    alignItems: "center",
  },

  emptyText: {
    color: "#999",
  },
});