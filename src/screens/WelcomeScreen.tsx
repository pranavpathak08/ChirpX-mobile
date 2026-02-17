import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function WelcomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />
      <View style={styles.content}>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>🐦 ChirpX</Text>
        </View>

        <Text style={styles.greeting}>Welcome to ChirpX,</Text>
        <Text style={styles.username}>@{user?.username}</Text>

        <Text style={styles.subtext}>
          You're all set! Your reading journey starts here.
        </Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  badge: {
    backgroundColor: '#1e1e35', borderWidth: 1, borderColor: '#667eea44',
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 50, marginBottom: 40,
  },
  badgeText: { color: '#9ba4f8', fontSize: 16, fontWeight: '700' },
  greeting: { fontSize: 28, color: '#aaaacc', fontWeight: '600', textAlign: 'center' },
  username: {
    fontSize: 42, fontWeight: '800', color: '#fff',
    letterSpacing: -1.5, marginTop: 4, textAlign: 'center',
  },
  subtext: { color: '#666688', fontSize: 16, textAlign: 'center', marginTop: 20, lineHeight: 24 },
  logoutBtn: {
    marginTop: 60, borderWidth: 1.5, borderColor: '#667eea66',
    paddingVertical: 14, paddingHorizontal: 40, borderRadius: 12,
  },
  logoutText: { color: '#667eea', fontSize: 15, fontWeight: '700' },
});