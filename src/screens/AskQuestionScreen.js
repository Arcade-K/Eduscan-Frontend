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

const AskQuestionScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [question, setQuestion] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const subjects = [
    'Mathematics', 'Biology', 'Chemistry', 'Physics', 
    'History', 'English', 'Geography', 'Computer Science'
  ];

  const grades = [
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 
    'Grade 10', 'Grade 11', 'Grade 12', 'College'
  ];

  const handleNext = () => {
    if (currentStep === 1 && question.trim()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedSubject && selectedGrade) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      await api.createQuestion({
        title: question,
        content: question,
        subject: selectedSubject,
        grade: selectedGrade,
        additionalDetails: additionalDetails
      });
      
      Alert.alert(
        'Question Submitted!',
        'Your question has been posted and will be visible to other students.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setQuestion('');
              setSelectedSubject('');
              setSelectedGrade('');
              setAdditionalDetails('');
              setCurrentStep(1);
              // Navigate back to home
              navigation.navigate('Home');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Failed to submit question:', error);
      Alert.alert(
        'Error',
        'Failed to submit question. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>What's your question?</Text>
      <TextInput
        style={styles.questionInput}
        placeholder="Type your question here..."
        placeholderTextColor="#9CA3AF"
        value={question}
        onChangeText={setQuestion}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
      <Text style={styles.characterCount}>{question.length}/500</Text>
      
      <Text style={styles.detailsLabel}>Additional details (optional)</Text>
      <TextInput
        style={styles.detailsInput}
        placeholder="Add any additional context or what you've tried so far..."
        placeholderTextColor="#9CA3AF"
        value={additionalDetails}
        onChangeText={setAdditionalDetails}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select subject and grade</Text>
      
      <Text style={styles.sectionLabel}>Subject</Text>
      <View style={styles.optionsGrid}>
        {subjects.map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedSubject === subject && styles.selectedOption
            ]}
            onPress={() => setSelectedSubject(subject)}
          >
            <Text style={[
              styles.optionText,
              selectedSubject === subject && styles.selectedOptionText
            ]}>
              {subject}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Grade Level</Text>
      <View style={styles.optionsGrid}>
        {grades.map((grade, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedGrade === grade && styles.selectedOption
            ]}
            onPress={() => setSelectedGrade(grade)}
          >
            <Text style={[
              styles.optionText,
              selectedGrade === grade && styles.selectedOptionText
            ]}>
              {grade}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ask Question</Text>
        <TouchableOpacity 
          onPress={handleNext}
          disabled={
            (currentStep === 1 && !question.trim()) ||
            (currentStep === 2 && (!selectedSubject || !selectedGrade))
          }
        >
          <Text style={[
            styles.nextButton,
            ((currentStep === 1 && !question.trim()) ||
             (currentStep === 2 && (!selectedSubject || !selectedGrade))) && styles.nextButtonDisabled
          ]}>
            {currentStep === 1 ? 'Next' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 ? renderStep1() : renderStep2()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  nextButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  nextButtonDisabled: {
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    paddingVertical: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  questionInput: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 120,
    marginBottom: 8,
  },
  characterCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 24,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  detailsInput: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 80,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    marginTop: 24,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: '45%',
  },
  selectedOption: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  optionText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default AskQuestionScreen;
