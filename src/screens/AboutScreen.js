import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleTermsOfUse = () => {
    // Navigate to Terms of Use screen or open web view
    console.log('Terms of Use tapped');
  };

  const handlePrivacyPolicy = () => {
    // Navigate to Privacy Policy screen or open web view
    console.log('Privacy Policy tapped');
  };

  const handleOpenSourceLibraries = () => {
    // Navigate to Open Source Libraries screen
    console.log('Open Source Libraries tapped');
  };

  const menuItems = [
    {
      id: 'terms',
      icon: 'document-text-outline',
      title: 'Terms of Use',
      onPress: handleTermsOfUse,
    },
    {
      id: 'privacy',
      icon: 'lock-closed-outline',
      title: 'Privacy Policy',
      onPress: handlePrivacyPolicy,
    },
    {
      id: 'libraries',
      icon: 'bar-chart-outline',
      title: 'Open Source Libraries',
      onPress: handleOpenSourceLibraries,
    },
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <Ionicons name={item.icon} size={24} color="#374151" />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Menu Items Card */}
        <View style={styles.card}>
          {menuItems.map(renderMenuItem)}
        </View>

        {/* Version Information */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>EduScan 1.0.0</Text>
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
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 20,
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 16,
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});

export default AboutScreen;
