import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';

const AnswerScreen = ({ navigation, route }) => {
  const { question } = route.params || {};
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      Alert.alert('Error', 'Please provide an answer');
      return;
    }

    try {
      await api.addAnswer(question.id, {
        content: answer,
        explanation: explanation
      });
      
      Alert.alert(
        'Success!',
        'Your answer has been submitted successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Failed to submit answer:', error);
      Alert.alert(
        'Error',
        'Failed to submit answer. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleFormattingAction = (action) => {
    // Handle formatting actions
    console.log('Formatting action:', action);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Answer</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionLabel}>Question:</Text>
          <Text style={styles.questionText}>
            {question?.title || 'What is the greatest common factor of the expression below?'}
          </Text>
          <Text style={styles.questionExpression}>
            {question?.content || '-6x² + 2x - 4'}
          </Text>
        </View>

        {/* Answer Input Card */}
        <View style={styles.answerCard}>
          <Text style={styles.inputLabel}>Answer:</Text>
          <TextInput
            style={styles.answerInput}
            placeholder="Enter your answer here..."
            placeholderTextColor="#9CA3AF"
            value={answer}
            onChangeText={setAnswer}
            multiline
            textAlignVertical="top"
          />
          
          <Text style={styles.inputLabel}>Step-by-step explanation:</Text>
          <TextInput
            style={styles.explanationInput}
            placeholder="Provide a detailed explanation of your solution..."
            placeholderTextColor="#9CA3AF"
            value={explanation}
            onChangeText={setExplanation}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Bottom Toolbar */}
      <View style={styles.toolbar}>
        <View style={styles.formattingButtons}>
          <TouchableOpacity 
            style={styles.formatButton}
            onPress={() => handleFormattingAction('add')}
          >
            <Text style={styles.formatButtonText}>+</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.formatButton}
            onPress={() => handleFormattingAction('bold')}
          >
            <Text style={styles.formatButtonText}>B</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.formatButton}
            onPress={() => handleFormattingAction('italic')}
          >
            <Text style={styles.formatButtonText}>I</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.formatButton}
            onPress={() => handleFormattingAction('underline')}
          >
            <Text style={styles.formatButtonText}>U</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.formatButton}
            onPress={() => handleFormattingAction('strikethrough')}
          >
            <Text style={styles.formatButtonText}>T</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.formatButton}
            onPress={() => handleFormattingAction('bullet')}
          >
            <Ionicons name="list" size={16} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.formatButton}
            onPress={() => handleFormattingAction('number')}
          >
            <Ionicons name="list-numbered" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
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
    paddingTop: 20,
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
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
  questionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 22,
    marginBottom: 12,
  },
  questionExpression: {
    fontSize: 16,
    color: '#6366F1',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  answerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
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
  inputLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
    fontWeight: '500',
  },
  answerInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 80,
    marginBottom: 16,
  },
  explanationInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 120,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  formattingButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  formatButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  formatButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  submitButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default AnswerScreen;
