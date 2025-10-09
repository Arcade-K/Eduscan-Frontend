import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const QuestionDetailScreen = ({ route, navigation }) => {
  const { question } = route.params;
  const [newAnswer, setNewAnswer] = useState('');
  const [answers] = useState([
    {
      id: 1,
      content: "Photosynthesis is the process by which plants convert light energy into chemical energy. It occurs in the chloroplasts and involves two main stages: the light-dependent reactions and the Calvin cycle.",
      author: "BioExpert",
      votes: 15,
      timeAgo: "2 hours ago",
      isVerified: true,
    },
    {
      id: 2,
      content: "During photosynthesis, plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. The equation is: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2",
      author: "ScienceTeacher",
      votes: 8,
      timeAgo: "4 hours ago",
      isVerified: false,
    },
  ]);

  const handleVote = (answerId, isUpvote) => {
    console.log(`${isUpvote ? 'Upvote' : 'Downvote'} answer ${answerId}`);
  };

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim()) return;
    console.log('Submitting answer:', newAnswer);
    setNewAnswer('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question Section */}
        <View style={styles.questionSection}>
          <View style={styles.questionHeader}>
            <View style={styles.subjectBadge}>
              <Text style={styles.subjectText}>{question.subject}</Text>
            </View>
            <Text style={styles.gradeText}>{question.grade}</Text>
          </View>
          
          <Text style={styles.questionTitle}>{question.title}</Text>
          
          <View style={styles.questionMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="person-outline" size={16} color="#6B7280" />
              <Text style={styles.metaText}>by {question.author}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <Text style={styles.metaText}>{question.timeAgo}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
              <Text style={styles.metaText}>{answers.length} answers</Text>
            </View>
          </View>
        </View>

        {/* Answers Section */}
        <View style={styles.answersSection}>
          <Text style={styles.sectionTitle}>Answers ({answers.length})</Text>
          
          {answers.map((answer) => (
            <View key={answer.id} style={styles.answerCard}>
              <View style={styles.answerHeader}>
                <View style={styles.authorInfo}>
                  <Text style={styles.authorName}>{answer.author}</Text>
                  {answer.isVerified && (
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.answerTime}>{answer.timeAgo}</Text>
              </View>
              
              <Text style={styles.answerContent}>{answer.content}</Text>
              
              <View style={styles.answerActions}>
                <View style={styles.voteButtons}>
                  <TouchableOpacity 
                    style={styles.voteButton}
                    onPress={() => handleVote(answer.id, true)}
                  >
                    <Ionicons name="thumbs-up-outline" size={18} color="#6B7280" />
                  </TouchableOpacity>
                  <Text style={styles.voteCount}>{answer.votes}</Text>
                  <TouchableOpacity 
                    style={styles.voteButton}
                    onPress={() => handleVote(answer.id, false)}
                  >
                    <Ionicons name="thumbs-down-outline" size={18} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
                  <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={16} color="#6B7280" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Textbook Solutions Section */}
        <View style={styles.textbookSection}>
          <TouchableOpacity 
            style={styles.textbookButton}
            onPress={() => navigation.navigate('TextbookSolutions')}
          >
            <Ionicons name="book-outline" size={20} color="#6366F1" />
            <Text style={styles.textbookButtonText}>View Textbook Solutions</Text>
            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
          </TouchableOpacity>
        </View>

        {/* Add Answer Section */}
        <View style={styles.addAnswerSection}>
          <Text style={styles.sectionTitle}>Add Your Answer</Text>
          <TextInput
            style={styles.answerInput}
            placeholder="Share your knowledge and help others..."
            placeholderTextColor="#9CA3AF"
            value={newAnswer}
            onChangeText={setNewAnswer}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity 
            style={styles.submitAnswerButton}
            onPress={handleSubmitAnswer}
          >
            <Text style={styles.submitAnswerText}>Post Answer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
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
    marginBottom: 16,
    gap: 12,
  },
  subjectBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  subjectText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  gradeText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 28,
    marginBottom: 16,
  },
  questionMeta: {
    flexDirection: 'row',
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  answersSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  answerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  answerTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  answerContent: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 22,
    marginBottom: 16,
  },
  answerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voteButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  voteButton: {
    padding: 6,
  },
  voteCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    minWidth: 20,
    textAlign: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  addAnswerSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  answerInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 100,
    marginBottom: 16,
  },
  submitAnswerButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitAnswerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  textbookSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  textbookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textbookButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#6366F1',
    fontWeight: '600',
  },
});

export default QuestionDetailScreen;
