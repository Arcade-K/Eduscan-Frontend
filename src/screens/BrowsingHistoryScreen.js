import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BrowsingHistoryScreen = ({ navigation }) => {
  const [historyData, setHistoryData] = useState({
    today: [],
    last7Days: []
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
        loadHistoryData();
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  const loadHistoryData = () => {
    // Mock data - in a real app, this would fetch from an API
    setHistoryData({
      today: [
        {
          id: '1',
          subject: 'Mathematics',
          content: 'What is the greatest common factor of the expression below? -6x^2 +2x',
          timestamp: 'Today 10:45 AM',
          time: '10:45 AM'
        },
        {
          id: '2',
          subject: 'Business',
          content: 'Dennis has a credit card with an APR of 10.14% and a billing',
          timestamp: 'Today 09:15 AM',
          time: '09:15 AM'
        },
        {
          id: '3',
          subject: 'Mathematics',
          content: 'Number of snapdragons, x | Number of daisies, y...',
          timestamp: 'Today 08:30 AM',
          time: '08:30 AM'
        },
        {
          id: '4',
          subject: 'Mathematics',
          content: 'Stephanie wanted to know if the point (3,-4) lies in the region that',
          timestamp: 'Today 07:00 AM',
          time: '07:00 AM'
        },
        {
          id: '5',
          subject: 'English',
          content: 'Gilgamesh answered, "Dear friend, dear brother, I cannot kill Humbaba"',
          timestamp: 'Today 06:10 AM',
          time: '06:10 AM'
        }
      ],
      last7Days: [
        {
          id: '6',
          subject: 'Mathematics',
          content: 'In triangle PQR, point C is the centroid. If PC = 9, then find the',
          timestamp: 'Yesterday 04:00 PM',
          time: 'Yesterday 04:00 PM'
        },
        {
          id: '7',
          subject: 'Physics',
          content: 'Explain the principles of quantum entanglement and its potential',
          timestamp: '3 days ago',
          time: '3 days ago'
        },
        {
          id: '8',
          subject: 'Biology',
          content: 'Describe the process of photosynthesis and its importance to',
          timestamp: '5 days ago',
          time: '5 days ago'
        }
      ]
    });
    setIsLoading(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLoginPrompt = () => {
    Alert.alert(
      'Login Required',
      'You need to be logged in to view your browsing history. Would you like to log in now?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log In',
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  const handleHistoryItemPress = (item) => {
    // Navigate to the specific question or content
    console.log('History item pressed:', item);
  };

  const handleMoreOptions = (item) => {
    // Show options menu (delete, share, etc.)
    console.log('More options for:', item);
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': '#3B82F6',
      'Business': '#10B981',
      'English': '#F59E0B',
      'Physics': '#8B5CF6',
      'Biology': '#EF4444',
    };
    return colors[subject] || '#6B7280';
  };

  const renderHistoryItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.historyItem}
      onPress={() => handleHistoryItemPress(item)}
    >
      <View style={styles.historyContent}>
        <View style={styles.subjectContainer}>
          <View style={[styles.subjectBadge, { backgroundColor: getSubjectColor(item.subject) }]}>
            <Text style={styles.subjectText}>{item.subject}</Text>
          </View>
        </View>
        <Text style={styles.contentText} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.timestampText}>{item.timestamp}</Text>
      </View>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => handleMoreOptions(item)}
      >
        <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSection = (title, data) => {
    if (data.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionContent}>
          {data.map(renderHistoryItem)}
        </View>
      </View>
    );
  };

  const renderLoginPrompt = () => (
    <View style={styles.loginPromptContainer}>
      <View style={styles.loginPromptCard}>
        <Ionicons name="lock-closed" size={48} color="#6B7280" />
        <Text style={styles.loginPromptTitle}>Login Required</Text>
        <Text style={styles.loginPromptText}>
          You need to be logged in to view your browsing history. Sign in to see your past activities and questions.
        </Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPrompt}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Browsing history</Text>
          <View style={styles.headerSpacer} />
        </View>
        {renderLoading()}
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Browsing history</Text>
          <View style={styles.headerSpacer} />
        </View>
        {renderLoginPrompt()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Browsing history</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSection('Today', historyData.today)}
        {renderSection('Last 7 days', historyData.last7Days)}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  historyContent: {
    flex: 1,
    marginRight: 12,
  },
  subjectContainer: {
    marginBottom: 8,
  },
  subjectBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  subjectText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  contentText: {
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
    marginBottom: 6,
  },
  timestampText: {
    fontSize: 12,
    color: '#6B7280',
  },
  moreButton: {
    padding: 4,
  },
  loginPromptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginPromptCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 300,
  },
  loginPromptTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
  },
  loginPromptText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default BrowsingHistoryScreen;
