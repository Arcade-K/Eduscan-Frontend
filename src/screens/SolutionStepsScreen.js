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

const SolutionStepsScreen = ({ route, navigation }) => {
  const { book } = route.params || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps] = useState(3);
  const [tipExpanded, setTipExpanded] = useState(false);
  const [explanationExpanded, setExplanationExpanded] = useState(true);

  const solutionData = {
    bookTitle: book?.title || "Algebra 1, Volume 2, Student Edition",
    bookCover: book?.cover || "https://via.placeholder.com/60x80/6366F1/FFFFFF?text=A1",
    tip: "Remember that sequences can be arithmetic or geometric. Look for patterns in the differences or ratios between terms.",
    explanation: "The word 'MY' (mythology) is a sequence because it follows a specific pattern. In mathematics, a sequence is an ordered list of numbers or terms that follow a particular rule or pattern.",
    steps: [
      "Identify the pattern in the sequence",
      "Determine if it's arithmetic or geometric",
      "Find the explicit rule for the sequence",
      "Verify the recursive rule if applicable"
    ],
    finalAnswer: "The summary triangle is filled with appropriate words."
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFeedback = (helpful) => {
    Alert.alert(
      'Thank you!',
      `You marked this solution as ${helpful ? 'helpful' : 'not helpful'}.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solving steps</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Book Info */}
        <View style={styles.bookInfo}>
          <Image source={{ uri: solutionData.bookCover }} style={styles.bookCover} />
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>{solutionData.bookTitle}</Text>
            <View style={styles.expertBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.expertText}>Solved by Experts</Text>
            </View>
          </View>
        </View>

        {/* Tip Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setTipExpanded(!tipExpanded)}
          >
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="bulb-outline" size={20} color="#F59E0B" />
              <Text style={styles.sectionTitle}>Tip</Text>
            </View>
            <Ionicons 
              name={tipExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>
          {tipExpanded && (
            <View style={styles.sectionContent}>
              <Text style={styles.tipText}>{solutionData.tip}</Text>
            </View>
          )}
        </View>

        {/* Explanation Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setExplanationExpanded(!explanationExpanded)}
          >
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="book-outline" size={20} color="#6366F1" />
              <Text style={styles.sectionTitle}>Explanation</Text>
            </View>
            <Ionicons 
              name={explanationExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>
          {explanationExpanded && (
            <View style={styles.sectionContent}>
              <Text style={styles.explanationText}>{solutionData.explanation}</Text>
            </View>
          )}
        </View>

        {/* Steps Section */}
        <View style={styles.stepsSection}>
          <Text style={styles.stepCounter}>Step {currentStep} of {totalSteps}</Text>
          
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Understanding the Problem</Text>
            <Text style={styles.stepDescription}>
              The word 'MY' (mythology) is a sequence because it follows a specific pattern. 
              In mathematics, a sequence is an ordered list of numbers or terms that follow 
              a particular rule or pattern.
            </Text>
            
            <View style={styles.stepList}>
              {solutionData.steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepBullet} />
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Final Answer */}
        <View style={styles.finalAnswerSection}>
          <View style={styles.finalAnswerHeader}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.finalAnswerTitle}>Final Answer</Text>
          </View>
          <View style={styles.finalAnswerBox}>
            <Text style={styles.finalAnswerText}>{solutionData.finalAnswer}</Text>
          </View>
        </View>

        {/* Feedback Section */}
        <View style={styles.feedbackSection}>
          <Text style={styles.feedbackQuestion}>How helpful was this?</Text>
          <View style={styles.feedbackButtons}>
            <TouchableOpacity 
              style={styles.feedbackButton}
              onPress={() => handleFeedback(false)}
            >
              <Text style={styles.feedbackButtonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.feedbackButton, styles.feedbackButtonYes]}
              onPress={() => handleFeedback(true)}
            >
              <Text style={[styles.feedbackButtonText, styles.feedbackButtonTextYes]}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navButton, currentStep === 1 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentStep === 1}
        >
          <Ionicons name="chevron-back" size={20} color={currentStep === 1 ? "#9CA3AF" : "#6366F1"} />
          <Text style={[styles.navButtonText, currentStep === 1 && styles.navButtonTextDisabled]}>
            PREVIOUS
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, currentStep === totalSteps && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={currentStep === totalSteps}
        >
          <Text style={[styles.navButtonText, currentStep === totalSteps && styles.navButtonTextDisabled]}>
            NEXT
          </Text>
          <Ionicons name="chevron-forward" size={20} color={currentStep === totalSteps ? "#9CA3AF" : "#6366F1"} />
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  bookCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  expertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  expertText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sectionContent: {
    paddingVertical: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  explanationText: {
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
  },
  stepsSection: {
    marginVertical: 16,
  },
  stepCounter: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    fontWeight: '500',
  },
  stepContent: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  stepList: {
    gap: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366F1',
    marginTop: 6,
  },
  stepText: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
    lineHeight: 20,
  },
  finalAnswerSection: {
    marginVertical: 16,
  },
  finalAnswerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  finalAnswerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  finalAnswerBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#10B981',
    borderRadius: 12,
    padding: 16,
  },
  finalAnswerText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  feedbackSection: {
    marginVertical: 24,
    alignItems: 'center',
  },
  feedbackQuestion: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
    fontWeight: '500',
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  feedbackButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  feedbackButtonYes: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  feedbackButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  feedbackButtonTextYes: {
    color: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  navButtonTextDisabled: {
    color: '#9CA3AF',
  },
});

export default SolutionStepsScreen;
