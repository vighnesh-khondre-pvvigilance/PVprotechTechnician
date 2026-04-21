import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import {
  getPendingWork,
  getTodayCompletedWork,
  getTodayAllWork,
} from '../../services/workService';

import { Theme } from '../../theme/theme';

export default function StatsRow() {
  const [pending, setPending] = useState(0);
  const [done, setDone] = useState(0);
  const [visits, setVisits] = useState(0);
  const [priorityTask, setPriorityTask] = useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const pendingData = await getPendingWork();
    const doneData = await getTodayCompletedWork();
    const visitsData = await getTodayAllWork();

    setPending(pendingData.length);
    setDone(doneData.length);
    setVisits(visitsData.length);

    // First pending task = High Priority
    if (pendingData.length > 0) {
      setPriorityTask(pendingData[0]);
    }
  };

  const stats = [
    {
      label: 'Pending',
      value: pending,
      onPress: () => router.push('/(tabs)/work'),
    },
    {
      label: 'Done',
      value: done,
      onPress: () => router.push('/(tabs)/history'),
    },
    {
      label: 'Visits',
      value: visits,
      onPress: () => {},
    },
  ];

  return (
    <>
      {/* Stats Row */}
      <View style={styles.row}>
        {stats.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.card}
            activeOpacity={0.8}
            onPress={item.onPress}
          >
            <Text style={styles.value}>{item.value}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Priority Alert */}
      {priorityTask && (
        <TouchableOpacity
          style={styles.alertCard}
          activeOpacity={0.9}
          onPress={() => router.push('/(tabs)/work')}
        >
          <Ionicons name="warning" size={22} color="#fff" />

          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.alertTitle}>High Priority Work</Text>
            <Text style={styles.alertText}>
              {priorityTask.title} - {priorityTask.plantName}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  value: {
    fontSize: 24,
    fontWeight: '700',
    color: Theme.colors.primary,
  },

  label: {
    color: '#64748B',
    marginTop: 5,
    fontSize: 13,
  },

  alertCard: {
    marginTop: 16,
    backgroundColor: '#EF4444',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  alertTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  alertText: {
    color: '#FEE2E2',
    marginTop: 2,
    fontSize: 13,
  },
});