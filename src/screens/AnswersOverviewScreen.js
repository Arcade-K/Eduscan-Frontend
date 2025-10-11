import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const AnswersOverviewScreen = ({ navigation }) => {
  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: 'calculator',
      color: '#3B82F6',
      answers: 1230,
    },
    {
      id: 'history',
      name: 'History',
      icon: 'time',
      color: '#F97316',
      answers: 585,
    },
    {
      id: 'english',
      name: 'English',
      icon: 'book',
      color: '#8B5CF6',
      answers: 1230,
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: 'leaf',
      color: '#10B981',
      answers: 585,
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: 'flask',
      color: '#14B8A6',
      answers: 700,
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: 'nuclear',
      color: '#EF4444',
      answers: 800,
    },
    {
      id: 'social-studies',
      name: 'Social Studies',
      icon: 'people',
      color: '#8B5CF6',
      answers: 120,
    },
    {
      id: 'advanced-placement',
      name: 'Advanced Placement',
      icon: 'school',
      color: '#374151',
      answers: 280,
    },
    {
      id: 'sat',
      name: 'SAT',
      icon: 'bulb',
      color: '#F97316',
      answers: 320,
    },
    {
      id: 'geography',
      name: 'Geography',
      icon: 'globe',
      color: '#10B981',
      answers: 570,
    },
    {
      id: 'health',
      name: 'Health',
      icon: 'heart',
      color: '#EC4899',
      answers: 480,
    },
    {
      id: 'arts',
      name: 'Arts',
      icon: 'color-palette',
      color: '#8B5CF6',
      answers: 130,
    },
    {
      id: 'business',
      name: 'Business',
      icon: 'briefcase',
      color: '#10B981',
      answers: 880,
    },
    {
      id: 'computers',
      name: 'Computers',
      icon: 'desktop',
      color: '#3B82F6',
      answers: 870,
    },
    {
      id: 'french',
      name: 'French',
      icon: 'flag',
      color: '#EF4444',
      answers: 120,
    },
    {
      id: 'german',
      name: 'German',
      icon: 'beer',
      color: '#14B8A6',
      answers: 100,
    },
    {
      id: 'spanish',
      name: 'Spanish',
      icon: 'chatbubble',
      color: '#F59E0B',
      answers: 200,
    },
    {
      id: 'world-languages',
      name: 'World Languages',
      icon: 'language',
      color: '#8B5CF6',
      answers: 230,
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubjectPress = (subject) => {
    // Navigate to subject-specific answers
    console.log('Navigate to subject:', subject.name);
    // navigation.navigate('SubjectAnswers', { subject });
  };

  const renderSubjectItem = (subject) => (
    <TouchableOpacity
      key={subject.id}
      style={styles.subjectItem}
      onPress={() => handleSubjectPress(subject)}
    >
      <View style={[styles.subjectIcon, { backgroundColor: subject.color }]}>
        <Ionicons name={subject.icon} size={24} color="#fff" />
      </View>
      <Text style={styles.subjectName}>{subject.name}</Text>
      <Text style={styles.subjectAnswers}>{subject.answers} answers</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Answers</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {subjects.map(renderSubjectItem)}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  subjectItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  subjectIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 18,
  },
  subjectAnswers: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default AnswersOverviewScreen;
