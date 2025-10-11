import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, setAuthToken } from '../services/api';

const Row = ({ icon, label, value, destructive, onPress, disabled }) => (
  <TouchableOpacity 
    style={[styles.row, disabled && styles.rowDisabled]} 
    onPress={disabled ? null : onPress} 
    activeOpacity={disabled ? 1 : 0.7}
  >
    <View style={styles.rowLeft}>
      <Ionicons 
        name={icon} 
        size={18} 
        color={disabled ? '#9CA3AF' : (destructive ? '#EF4444' : '#6B7280')} 
      />
      <Text style={[
        styles.rowLabel, 
        destructive && styles.rowDestructive,
        disabled && styles.rowDisabledText
      ]}>
        {label}
      </Text>
    </View>
    <View style={styles.rowRight}>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    </View>
  </TouchableOpacity>
);

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

const SettingsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        // Verify token is still valid
        try {
          await api.verifyToken();
          setIsLoggedIn(true);
          setAuthToken(token);
        } catch (error) {
          // Token is invalid, clear it
          await AsyncStorage.removeItem('authToken');
          setAuthToken(null);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoggedIn(false);
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              // Clear stored authentication data
              await AsyncStorage.removeItem('authToken');
              setAuthToken(null);
              setIsLoggedIn(false);
              
              // Navigate to login screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
              
              Alert.alert('Success', 'You have been logged out successfully.');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to log out. Please try again.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Show confirmation dialog
            Alert.alert(
              'Final Confirmation',
              'This will permanently delete your account and all associated data. Are you absolutely sure?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Yes, Delete',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      setLoading(true);
                      
                      // Call delete account API
                      await api.deleteAccount();
                      
                      // Clear local data
                      await AsyncStorage.removeItem('authToken');
                      setAuthToken(null);
                      setIsLoggedIn(false);
                      
                      // Navigate to onboarding
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Onboarding' }],
                      });
                      
                      Alert.alert('Account Deleted', 'Your account has been permanently deleted.');
                    } catch (error) {
                      console.error('Delete account error:', error);
                      Alert.alert('Error', 'Failed to delete account. Please try again.');
                    } finally {
                      setLoading(false);
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerIcon} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Section title="General">
          <Row icon="notifications-outline" label="Notifications" onPress={() => navigation.navigate('NotificationSettings')} />
          <Row icon="card-outline" label="Subscription" onPress={() => {}} />
        </Section>

        <Section title="Community">
          <Row icon="swap-vertical-outline" label="Auto-publish" onPress={() => {}} />
          <Row icon="people-outline" label="Blocked users" onPress={() => navigation.navigate('BlockedUsers')} />
        </Section>

        <Section title="EduScan">
          <Row icon="help-circle-outline" label="FAQ" onPress={() => {}} />
          <Row icon="mail-outline" label="Contact us" onPress={() => {}} />
          <Row icon="information-circle-outline" label="About" onPress={() => navigation.navigate('About')} />
        </Section>

        <Section title="Account">
          <Row icon="globe-outline" label="Country" value="United States of America" onPress={() => navigation.navigate('CountrySelection')} />
          {isLoggedIn ? (
            <>
              <Row 
                icon="log-out-outline" 
                label="Log out" 
                onPress={handleLogout}
                disabled={loading}
              />
              <Row 
                icon="trash-outline" 
                label="Delete account" 
                destructive 
                onPress={handleDeleteAccount}
                disabled={loading}
              />
            </>
          ) : (
            <Row 
              icon="log-in-outline" 
              label="Sign In" 
              onPress={handleSignIn}
            />
          )}
        </Section>
      </ScrollView>
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  headerIcon: {
    width: 28,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rowLabel: {
    fontSize: 14,
    color: '#111827',
  },
  rowValue: {
    fontSize: 12,
    color: '#6B7280',
  },
  rowDestructive: {
    color: '#EF4444',
    fontWeight: '600',
  },
  rowDisabled: {
    opacity: 0.5,
  },
  rowDisabledText: {
    color: '#9CA3AF',
  },
});

export default SettingsScreen;


