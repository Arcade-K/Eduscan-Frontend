import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';

const ProfileScreen = ({ navigation }) => {
  const handlePremiumAccess = () => {
    navigation.navigate('PremiumUpgrade');
  };

  const handleMenuPress = (menuItem) => {
    console.log(`Pressed ${menuItem}`);
  };

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getProfile();
        if (mounted) setProfile(data);
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={24} color="#111827" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color="#fff" />
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{profile?.username || 'guest'}</Text>
              <Text style={styles.userStatus}>{profile?.status || '—'}</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {/* First Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>355</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Answers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Thanks</Text>
              </View>
            </View>
            {/* Second Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Premium Access Banner */}
        <TouchableOpacity style={styles.premiumBanner} onPress={handlePremiumAccess}>
          <Text style={styles.premiumText}>Get premium access for Free</Text>
          <View style={styles.premiumButton}>
            <Text style={styles.premiumButtonText}>EDUSCAN+</Text>
          </View>
        </TouchableOpacity>

        {/* Navigation Menu */}
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleMenuPress('Browsing History')}
          >
            <Ionicons name="time-outline" size={20} color="#6B7280" />
            <Text style={styles.menuText}>Browsing History</Text>
            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('Home', { screen: 'TextbookSolutions' })}
          >
            <Ionicons name="book-outline" size={20} color="#6B7280" />
            <Text style={styles.menuText}>Textbooks</Text>
            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleMenuPress('Saved Answers')}
          >
            <Ionicons name="bookmark-outline" size={20} color="#6B7280" />
            <Text style={styles.menuText}>Saved Answers</Text>
            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('Home', { screen: 'MyQuestions' })}
          >
            <Ionicons name="help-circle-outline" size={20} color="#6B7280" />
            <Text style={styles.menuText}>Posted Questions</Text>
            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleMenuPress('Posted Answers')}
          >
            <Ionicons name="notifications-outline" size={20} color="#6B7280" />
            <Text style={styles.menuText}>Posted Answers</Text>
            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => handleMenuPress('Live Expert Sessions')}
          >
            <Ionicons name="radio-outline" size={20} color="#6B7280" />
            <Text style={styles.menuText}>Live Expert Sessions</Text>
            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsGrid: {
    gap: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 50,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 14,
    maxWidth: 60,
  },
  premiumBanner: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  premiumText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  premiumButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  premiumButtonText: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default ProfileScreen;