import { View, Text, StyleSheet } from 'react-native';

export default function RecentWorkList() {
  const list = ['Plant A - Pending', 'Plant B - Done', 'Plant C - Scheduled'];

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.heading}>Recent Work</Text>
      {list.map((item) => (
        <View key={item} style={styles.card}>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  heading: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 14, marginBottom: 8 }
});