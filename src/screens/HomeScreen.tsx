import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const nav = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />

      <View style={styles.content}>
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🐦</Text>
          </View>
          <Text style={styles.brand}>ChirpX</Text>
          <Text style={styles.tagline}>Curate. Share. Discover.</Text>
        </View>

        <View style={styles.pills}>
          {['📚 Curated Topics', '🔗 Link Sharing', '📄 Documents', '⭐ Ratings'].map((pill) => (
            <View key={pill} style={styles.pill}>
              <Text style={styles.pillText}>{pill}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.description}>
          Join communities around topics you love. Share links, documents, and discover great content curated by real people.
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => nav.navigate('Register')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnPrimaryText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => nav.navigate('Login')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnSecondaryText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  content: {
    flex: 1, paddingHorizontal: 28, justifyContent: 'center', alignItems: 'center',
  },
  logoArea: { alignItems: 'center', marginBottom: 36 },
  logoCircle: {
    width: 96, height: 96, borderRadius: 28,
    backgroundColor: '#1e1e35',
    borderWidth: 1.5, borderColor: '#667eea44',
    justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  logoEmoji: { fontSize: 44 },
  brand: {
    fontSize: 42, fontWeight: '800', color: '#fff',
    letterSpacing: -1.5,
  },
  tagline: { fontSize: 16, color: '#667eeacc', marginTop: 6, letterSpacing: 1 },
  pills: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', gap: 10, marginBottom: 28,
  },
  pill: {
    backgroundColor: '#1e1e35',
    borderWidth: 1, borderColor: '#667eea33',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
  },
  pillText: { color: '#9ba4f8', fontSize: 13, fontWeight: '600' },
  description: {
    color: '#8888aa', textAlign: 'center', fontSize: 15,
    lineHeight: 24, marginBottom: 48, maxWidth: width * 0.8,
  },
  buttons: { width: '100%', gap: 14 },
  btnPrimary: {
    backgroundColor: '#667eea',
    paddingVertical: 16, borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#667eea', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45, shadowRadius: 16, elevation: 8,
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  btnSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 16, borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5, borderColor: '#667eea66',
  },
  btnSecondaryText: { color: '#667eea', fontSize: 16, fontWeight: '700' },
});