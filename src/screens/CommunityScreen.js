import React, { useEffect, useState } from 'react';
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
import { api } from '../services/api';

const CommunityScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getQuestions();
        if (mounted) setQuestions(data);
      } catch (e) {
        console.error('Failed to load questions', e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleGiveAnswer = (question) => {
    navigation.navigate('Answer', { question });
  };

  const handleAskQuestion = () => {
    navigation.navigate('AskQuestion');
  };

  const handleFilterQuestions = () => {
    // Handle filter functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
      </View>

      {/* Filter Questions */}
      <View style={styles.filterSection}>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterQuestions}>
          <Ionicons name="filter" size={20} color="#6366F1" />
          <Text style={styles.filterText}>FILTER QUESTIONS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Answer Questions Card */}
        <View style={styles.answerCard}>
          <View style={styles.answerCardContent}>
            <View style={styles.answerTextContainer}>
              <Text style={styles.answerCardTitle}>Answer questions</Text>
              <Text style={styles.answerCardSubtitle}>Lend a hand to other students</Text>
              <Text style={styles.answerCardSubtitle}>and get rewarded for sharing</Text>
              <Text style={styles.answerCardSubtitle}>your knowledge!</Text>
            </View>
            <View style={styles.crownIcon}>
              <Ionicons name="trophy" size={40} color="#8B5CF6" />
            </View>
          </View>
        </View>

        {/* Question Cards */}
        {questions.map((question) => (
          <View key={question.id} style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={20} color="#6366F1" />
              </View>
              <View style={styles.questionMeta}>
                <Text style={styles.subjectText}>{question.subject || 'General'}</Text>
                <Text style={styles.pointsText}>5 points</Text>
                <Text style={styles.timeText}>{new Date(question.createdAt).toLocaleDateString()}</Text>
              </View>
            </View>
            
            <Text style={styles.questionText} numberOfLines={3}>
              {question.title}
            </Text>
            
            <TouchableOpacity 
              style={styles.giveAnswerButton}
              onPress={() => handleGiveAnswer(question)}
            >
              <Text style={styles.giveAnswerText}>GIVE ANSWER</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Ask Question Button */}
      <View style={styles.askQuestionSection}>
        <TouchableOpacity style={styles.askQuestionButton} onPress={handleAskQuestion}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.askQuestionText}>Ask question</Text>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterText: {
    fontSize: 16,
    color: '#6366F1',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  answerCard: {
    backgroundColor: '#D1FAE5',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
  },
  answerCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  answerTextContainer: {
    flex: 1,
  },
  answerCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  answerCardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  crownIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  questionMeta: {
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  pointsText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '500',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  questionText: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 22,
    marginBottom: 16,
  },
  giveAnswerButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  giveAnswerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  askQuestionSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  askQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  askQuestionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CommunityScreen;
