// src/components/workflow/StepApproval.tsx

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Theme } from "../../theme/theme";

export default function StepApproval({
  visit,
  onNext,
}: any) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.wrap}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          Job Approval
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {visit?.status || "Pending"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Work Title
          </Text>
          <Text style={styles.value}>
            {visit?.title || "-"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Plant Name
          </Text>
          <Text style={styles.value}>
            {visit?.plantName || "-"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Owner Name
          </Text>
          <Text style={styles.value}>
            {visit?.ownerName || "-"}
          </Text>
        </View>

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>
              Capacity
            </Text>
            <Text style={styles.value}>
              {visit?.capacity || "-"}
            </Text>
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>
              Assigned Date
            </Text>
            <Text style={styles.value}>
              {visit?.assignedDate || "-"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Location
          </Text>
          <Text style={styles.value}>
            {visit?.location || "-"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Issue / Task Notes
          </Text>
          <Text style={styles.value}>
            {visit?.issue || "-"}
          </Text>
        </View>

        {visit?.beforeImage ? (
          <View style={styles.section}>
            <Text style={styles.label}>
              Existing Condition
            </Text>

            <Image
              source={{
                uri: visit.beforeImage,
              }}
              style={styles.image}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.btn}
          onPress={onNext}
        >
          <Text style={styles.btnText}>
            Approve & Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Theme.colors.text,
    marginBottom: 14,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#ECFDF3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 18,
  },

  badgeText: {
    color: "#027A48",
    fontWeight: "700",
    fontSize: 12,
  },

  section: {
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },

  half: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: Theme.colors.gray,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  value: {
    fontSize: 15,
    color: Theme.colors.text,
    fontWeight: "600",
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    marginTop: 8,
  },

  btn: {
    marginTop: 18,
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 14,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
});