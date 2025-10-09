import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, setAuthToken } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = async () => {
    try {
      const { token } = await api.login(email, password);
      setAuthToken(token);
      await AsyncStorage.setItem('authToken', token);
      navigation.replace('MainApp');
    } catch (e) {
      console.error('Login failed', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerSide}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Welcome</Text>
        <TouchableOpacity style={styles.headerSide}>
          <Text style={styles.signupText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Welcome again</Text>
        <Text style={styles.subtitle}>Get instant answers, scan your homework to solve it, and ace your exams with AI-powered features tailored to your learning style!</Text>

        <TextInput
          style={styles.input}
          placeholder="Username or email"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.eyeIcon}>👁️</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>

        <View style={styles.separatorRow}>
          <View style={styles.separator} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.separator} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <Text style={styles.disclaimer}>We never share anything on your behalf.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  headerSide: { width: 60 },
  backIcon: { fontSize: 18, color: '#111827' },
  signupText: { color: '#2563EB', fontWeight: '600', textAlign: 'right' },
  body: { paddingHorizontal: 16 },
  title: { marginTop: 8, fontSize: 20, fontWeight: '700', color: '#111827' },
  subtitle: { marginTop: 8, fontSize: 13, color: '#6B7280', lineHeight: 18 },
  input: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    color: '#111827',
    backgroundColor: '#fff',
  },
  passwordRow: { position: 'relative' },
  passwordInput: { paddingRight: 36 },
  eyeIcon: { position: 'absolute', right: 12, top: 26, color: '#6B7280' },
  loginButton: {
    marginTop: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginText: { color: '#fff', fontWeight: '600' },
  forgot: { marginTop: 12, color: '#2563EB', fontWeight: '600' },
  separatorRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 16 },
  separator: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  orText: { color: '#6B7280', fontSize: 12 },
  googleButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 12,
  },
  googleText: { color: '#111827', fontWeight: '600' },
  disclaimer: { marginTop: 8, color: '#6B7280', fontSize: 12, textAlign: 'center' },
});

export default LoginScreen;


