import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QuestionCard = ({ question, onPress }) => {
  const getSubjectColor = (subject) => {
    const colors = {
      'Biology': '#10B981',
      'Mathematics': '#6366F1',
      'History': '#F59E0B',
      'Chemistry': '#8B5CF6',
      'Physics': '#EF4444',
      'English': '#06B6D4',
    };
    return colors[subject] || '#6366F1';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.questionHeader}>
          <View style={styles.subjectContainer}>
            <View 
              style={[
                styles.subjectBadge, 
                { backgroundColor: getSubjectColor(question.subject) }
              ]}
            >
              <Text style={styles.subjectText}>{question.subject}</Text>
            </View>
            <Text style={styles.gradeText}>{question.grade}</Text>
          </View>
          {question.isAnswered && (
            <View style={styles.answeredBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.answeredText}>Answered</Text>
            </View>
          )}
        </View>

        <Text style={styles.questionTitle} numberOfLines={2}>
          {question.title}
        </Text>

        <View style={styles.questionFooter}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
              <Text style={styles.statText}>{question.answers}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="thumbs-up-outline" size={16} color="#6B7280" />
              <Text style={styles.statText}>{question.votes}</Text>
            </View>
          </View>
          
          <View style={styles.authorContainer}>
            <Text style={styles.authorText}>by {question.author}</Text>
            <Text style={styles.timeText}>{question.timeAgo}</Text>
          </View>
        </View>
      </View>
      
      {question.image && (
        <Image 
          source={{ uri: question.image }}
          style={styles.questionImage}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subjectBadge: {
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
    fontSize: 12,
    fontWeight: '500',
  },
  answeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  answeredText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 24,
    marginBottom: 12,
  },
  questionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  authorContainer: {
    alignItems: 'flex-end',
  },
  authorText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
  },
  timeText: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  questionImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginLeft: 12,
  },
});

export default QuestionCard;
