import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../theme/theme';

export default function HeaderCard() {
  const date = new Date().toDateString();
  return (
    <View style={styles.card}>
      <Text style={styles.greet}>Good Morning 👋</Text>
      <Text style={styles.city}>Pune, Maharashtra</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: Theme.colors.primary, padding: 18, borderRadius: 20 },
  greet: { color: '#fff', fontSize: 22, fontWeight: '700' },
  city: { color: '#E0E7FF', marginTop: 6 },
  date: { color: '#E0E7FF', marginTop: 4 }
});