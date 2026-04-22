import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HeaderCard() {
  const now = new Date();
  const hour = now.getHours();

  const getGreeting = () => {
    if (hour < 12) return 'Good Morning 👋';
    if (hour < 17) return 'Good Afternoon ☀️';
    if (hour < 21) return 'Good Evening 🌇';
    return 'Good Night 🌙';
  };

  const userName = 'Vighnesh'; // replace with dynamic user name later
  const date = now.toDateString();

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greet}>{getGreeting()}</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>

        {/* Profile Icon Left Side */}
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <Ionicons name="person-circle-outline" size={38} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Info */}
      <Text style={styles.city}>Pune, Maharashtra</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.primary,
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  greet: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  name: {
    color: '#E0E7FF',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '600',
  },

  city: {
    color: '#E0E7FF',
    marginTop: 12,
    fontSize: 14,
  },

  date: {
    color: '#E0E7FF',
    marginTop: 4,
    fontSize: 13,
  },

  profileBtn: {
    marginLeft: 12,
  },
});