import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { normalizeFont, scale } from '../utils/responsive';

const PremiumUpgradeScreen = ({ navigation }) => {
  const handleUpgradeNow = () => {
    // Navigate to subscription selection screen
    navigation.navigate('Subscription');
  };

  const handleNoThanks = () => {
    navigation.goBack();
  };

  const premiumFeatures = [
    {
      id: 1,
      title: "Unlimited Expert-Verified answers",
      icon: "checkmark-circle",
    },
    {
      id: 2,
      title: "Full access to AI-powered Math Solver",
      icon: "expand",
    },
    {
      id: 3,
      title: "Expert-created textbook solutions",
      icon: "book-open",
    },
    {
      id: 4,
      title: "No ads or Interruptions",
      icon: "volume-mute",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Premium Upgrade</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="diamond" size={40} color="#fff" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.mainTitle}>Get unlimited access today!</Text>

        {/* Features Card */}
        <View style={styles.featuresCard}>
          {premiumFeatures.map((feature) => (
            <View key={feature.id} style={styles.featureItem}>
              <Ionicons name={feature.icon} size={20} color="#059669" />
              <Text style={styles.featureText}>{feature.title}</Text>
            </View>
          ))}
        </View>

        {/* Upgrade Button */}
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradeNow}>
          <Text style={styles.upgradeButtonText}>UPGRADE NOW</Text>
        </TouchableOpacity>

        {/* No Thanks Button */}
        <TouchableOpacity style={styles.noThanksButton} onPress={handleNoThanks}>
          <Text style={styles.noThanksText}>NO, THANKS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#059669',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#059669',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: normalizeFont(24),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: scale(40),
  },
  featuresCard: {
    backgroundColor: '#fff',
    borderRadius: scale(16),
    padding: scale(20),
    width: '100%',
    marginBottom: scale(40),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    flex: 1,
  },
  upgradeButton: {
    backgroundColor: '#6366F1',
    paddingVertical: scale(16),
    paddingHorizontal: scale(32),
    borderRadius: scale(12),
    width: '100%',
    alignItems: 'center',
    marginBottom: scale(20),
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noThanksButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  noThanksText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PremiumUpgradeScreen;



