import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const NotificationSettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState({
    brainliestAnswers: true,
    newAnswers: true,
    thanks: true,
    newComments: true,
    newMessages: true,
    newFollower: true,
    helpRequest: true,
    approvedAnswers: true,
    newRank: true,
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationCategories = [
    {
      key: 'brainliestAnswers',
      title: 'Brainliest answers',
      description: 'Notifications about having your answers marked as Brainliest',
    },
    {
      key: 'newAnswers',
      title: 'New answers',
      description: 'Notifications about new answers to your questions',
    },
    {
      key: 'thanks',
      title: 'Thanks!',
      description: 'Notifications when someone thanks you for your answer',
    },
    {
      key: 'newComments',
      title: 'New comments',
      description: 'Notifications about new comments on your answers',
    },
    {
      key: 'newMessages',
      title: 'New messages',
      description: 'Notifications about new direct messages',
    },
    {
      key: 'newFollower',
      title: 'New follower',
      description: 'Notifications when someone follows you',
    },
    {
      key: 'helpRequest',
      title: 'Help request',
      description: 'Notifications about help requests in your subjects',
    },
    {
      key: 'approvedAnswers',
      title: 'Approved answers',
      description: 'Notifications when your answers get approved',
    },
    {
      key: 'newRank',
      title: 'New rank',
      description: 'Notifications about rank achievements and milestones',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introductory Text */}
        <Text style={styles.introText}>
          We'd like to notify you about your important updates on Brainly. If you'd rather prefer to not receive those notifications, you can turn some of them off here.
        </Text>

        {/* Notification Categories */}
        <View style={styles.categoriesContainer}>
          {notificationCategories.map((category) => (
            <View key={category.key} style={styles.categoryItem}>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
              <Switch
                value={notifications[category.key]}
                onValueChange={() => toggleNotification(category.key)}
                trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                thumbColor={notifications[category.key] ? '#fff' : '#fff'}
                ios_backgroundColor="#E5E7EB"
                style={styles.toggleSwitch}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
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
  introText: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginTop: 20,
    marginBottom: 24,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryContent: {
    flex: 1,
    marginRight: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  toggleSwitch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
});

export default NotificationSettingsScreen;
