import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, setAuthToken } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSignUp = () => {
    // Navigate to sign up screen
    console.log('Sign up tapped');
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

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    console.log('Forgot password tapped');
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Google login tapped');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Welcome</Text>
        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Welcome again</Text>
          <Text style={styles.subtitle}>
            Get instant answers, scan your homework to solve it, and ace your exams with{' '}
            <Text style={styles.boldText}>AI-powered features</Text> tailored to your learning style!
          </Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Username or email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#6B7280" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Google Login */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <View style={styles.googleIcon}>
            <Text style={styles.googleG}>G</Text>
          </View>
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        {/* Privacy Statement */}
        <Text style={styles.privacyText}>We never share anything on your behalf.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  signUpButton: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  signUpText: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#111827',
  },
  inputSection: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    color: '#111827',
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 50,
    height: 52,
    color: '#111827',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    color: '#6B7280',
    fontSize: 14,
    marginHorizontal: 16,
    fontWeight: '500',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  googleG: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  googleText: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 16,
  },
  privacyText: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoginScreen;


