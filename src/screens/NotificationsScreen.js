import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const NotificationsScreen = ({ navigation }) => {
  // Mock notification data
  const [notifications] = useState([
    {
      id: '1',
      type: 'rank',
      title: 'You gained a new rank: Ambitious',
      timeAgo: '5 days ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      hasStar: true,
    },
    {
      id: '2',
      type: 'progress',
      title: 'Your weekly progress report is available!',
      timeAgo: '1 week ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      hasStar: false,
    },
    {
      id: '3',
      type: 'answer',
      title: 'A new expert answer to your question in Physics has been posted.',
      timeAgo: '3 weeks ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      hasStar: false,
    },
    {
      id: '4',
      type: 'group',
      title: 'New study group "Calculus Masters" has been created.',
      timeAgo: '1 month ago',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3849565d9d7a?w=100&h=100&fit=crop&crop=face',
      hasStar: false,
    },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMessages = () => {
    navigation.navigate('Messages');
  };

  const handleNotificationPress = (notification) => {
    console.log('Notification pressed:', notification.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Messages Section */}
        <TouchableOpacity style={styles.messagesSection} onPress={handleMessages}>
          <View style={styles.messagesContent}>
            <Ionicons name="chatbubble-outline" size={24} color="#111827" />
            <Text style={styles.messagesText}>Messages</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </View>
        </TouchableOpacity>

        {/* Older Notifications Heading */}
        <Text style={styles.olderHeading}>Older notifications</Text>

        {/* Notifications List */}
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={styles.notificationItem}
            onPress={() => handleNotificationPress(notification)}
          >
            <View style={styles.notificationContent}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: notification.avatar }} style={styles.avatar} />
                {notification.hasStar && (
                  <View style={styles.starBadge}>
                    <Ionicons name="star" size={12} color="#fff" />
                  </View>
                )}
        </View>
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationTime}>{notification.timeAgo}</Text>
              </View>
            </View>
            </TouchableOpacity>
        ))}
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
  },
  messagesSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  messagesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messagesText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    fontWeight: '500',
  },
  olderHeading: {
    fontSize: 14,
    color: '#9CA3AF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  notificationItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  starBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  notificationText: {
    flex: 1,
    paddingTop: 4,
  },
  notificationTitle: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});

export default NotificationsScreen;
