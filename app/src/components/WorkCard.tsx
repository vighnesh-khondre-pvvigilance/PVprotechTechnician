import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../theme/theme";

type Props = {
  item: any;
  onPress: () => void;
};

export default function WorkCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>

      <View style={styles.row}>
        <Text style={styles.date}>{item.assignedDate}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.md,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Theme.colors.text,
  },

  location: {
    color: Theme.colors.subtext,
    marginBottom: Theme.spacing.sm,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  date: {
    color: Theme.colors.subtext,
  },

  status: {
    color: Theme.colors.primary,
    fontWeight: "600",
  },
});