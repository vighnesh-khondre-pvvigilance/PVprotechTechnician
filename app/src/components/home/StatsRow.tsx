import { View, Text, StyleSheet } from 'react-native';

export default function StatsRow() {
  const data = [
    { label: 'Pending', value: '3' },
    { label: 'Done', value: '1' },
    { label: 'Visits', value: '4' },
  ];

  return (
    <View style={styles.row}>
      {data.map((item) => (
        <View key={item.label} style={styles.card}>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, marginTop: 16 },
  card: { flex: 1, backgroundColor: '#fff', padding: 14, borderRadius: 16 },
  value: { fontSize: 22, fontWeight: '700' },
  label: { color: '#64748B', marginTop: 4 }
});