import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import Screen from "../src/components/Screen";
import { Theme } from "../src/theme/theme";
import { workData } from "../src/data/work";
import { Work } from "../src/types/work";

export default function WorkDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const work: Work | undefined = workData.find(
    (item) => item.id === id
  );

  if (!work) {
    return (
      <Screen>
        <Text>Work not found</Text>
      </Screen>
    );
  }

  const formatDate = (date?: string) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔷 TITLE */}
        <Text style={styles.title}>{work.title}</Text>

        {/* 📝 ISSUE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspection / Issue</Text>
          <Text style={styles.text}>
            {work.issue || "No details provided"}
          </Text>
        </View>

        {/* 🏭 PLANT INFO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plant Info</Text>

          <Text style={styles.label}>
            Owner: <Text style={styles.value}>{work.ownerName || "-"}</Text>
          </Text>

          <Text style={styles.label}>
            Plant: <Text style={styles.value}>{work.plantName || "-"}</Text>
          </Text>

          <Text style={styles.label}>
            Capacity: <Text style={styles.value}>{work.capacity || "-"}</Text>
          </Text>

          <Text style={styles.label}>
            Location: <Text style={styles.value}>{work.location}</Text>
          </Text>
        </View>

        {/* 📅 DATE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completion Date</Text>
          <Text style={styles.text}>
            {formatDate(work.completedDate)}
          </Text>
        </View>

        {/* 📸 PHOTOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Before Photo</Text>
          {work.beforeImage ? (
            <Image
              source={{ uri: work.beforeImage }}
              style={styles.image}
            />
          ) : (
            <Text style={styles.empty}>No image</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>After Photo</Text>
          {work.afterImage ? (
            <Image
              source={{ uri: work.afterImage }}
              style={styles.image}
            />
          ) : (
            <Text style={styles.empty}>No image</Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: Theme.spacing.md,
  },

  section: {
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 6,
  },

  text: {
    color: Theme.colors.text,
  },

  label: {
    fontSize: 13,
    marginBottom: 4,
  },

  value: {
    fontWeight: "600",
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: Theme.radius.md,
    marginTop: 8,
  },

  empty: {
    color: Theme.colors.subtext,
    marginTop: 6,
  },
});