import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
  ActivityIndicator, StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
    const nav = useNavigation<Nav>();
    const { login } = useAuth();

    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 6) e.password = 'Min 6 characters';
        setErrors(e);
        return Object.keys(e).length === 0;
    };
    
    const handleSubmit = async () => {
        if (!validate) return;
        setLoading(true);
        setServerError('');

        const result = await login(form);
        setLoading(false);

        if (!result.success) setServerError(result.error || "Login Failed");
    }
    
    const Field = ({ label, field, ...props }: any) => (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, errors[field] ? styles.inputError : null]}
                value={form[field as keyof typeof form]}
                onChangeText={(v) => {
                setForm(p => ({ ...p, [field]: v }));
                if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
                setServerError('');
                }}
                placeholderTextColor="#555570"
                {...props}
            />
            {errors[field] ? <Text style={styles.errorText}>{errors[field]}</Text> : null}
        </View>
    )

    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

                <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>Sign in to your ChirpX account</Text>

                {serverError ? (
                    <View style={styles.serverError}>
                    <Text style={styles.serverErrorText}>{serverError}</Text>
                    </View>
                ) : null}

                <Field label="Email" field="email"
                    placeholder="your@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                />
                <Field label="Password" field="password"
                    placeholder="••••••••"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.btnPrimary} onPress={handleSubmit} disabled={loading} activeOpacity={0.85}>
                    {loading
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.btnText}>Sign In</Text>
                    }
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => nav.navigate('Register')}>
                    <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
  );
}







const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll: { flexGrow: 1, padding: 28, justifyContent: 'center' },
  back: { marginBottom: 32 },
  backText: { color: '#667eea', fontSize: 15, fontWeight: '600' },
  title: { fontSize: 32, fontWeight: '800', color: '#fff', marginBottom: 8, letterSpacing: -1 },
  subtitle: { fontSize: 15, color: '#8888aa', marginBottom: 36 },
  field: { marginBottom: 20 },
  label: { color: '#aaaacc', fontSize: 13, fontWeight: '600', marginBottom: 8, letterSpacing: 0.5 },
  input: {
    backgroundColor: '#1a1a2e', borderWidth: 1.5, borderColor: '#2a2a45',
    borderRadius: 12, padding: 16, color: '#fff', fontSize: 15,
  },
  inputError: { borderColor: '#ff6b6b' },
  errorText: { color: '#ff6b6b', fontSize: 12, marginTop: 6 },
  serverError: {
    backgroundColor: '#ff6b6b22', borderWidth: 1, borderColor: '#ff6b6b44',
    borderRadius: 10, padding: 14, marginBottom: 20,
  },
  serverErrorText: { color: '#ff9999', fontSize: 14 },
  btnPrimary: {
    backgroundColor: '#667eea', paddingVertical: 16, borderRadius: 14,
    alignItems: 'center', marginTop: 8,
    shadowColor: '#667eea', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  footerText: { color: '#8888aa', fontSize: 15 },
  link: { color: '#667eea', fontSize: 15, fontWeight: '700' },
});