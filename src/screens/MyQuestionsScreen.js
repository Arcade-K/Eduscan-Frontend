import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MyQuestionsScreen = ({ navigation }) => {
  const handleAskQuestion = () => {
    navigation.navigate('AskQuestion');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My questions</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Empty State Content */}
      <View style={styles.emptyStateContainer}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.listIcon}>
            <View style={styles.listLine}>
              <View style={styles.bulletPoint} />
              <View style={styles.line} />
            </View>
            <View style={styles.listLine}>
              <View style={styles.bulletPoint} />
              <View style={styles.line} />
            </View>
            <View style={styles.listLine}>
              <View style={styles.line} />
            </View>
          </View>
        </View>

        {/* Empty State Message */}
        <Text style={styles.emptyStateMessage}>
          You haven't asked any questions yet.
        </Text>

        {/* Ask Question Button */}
        <TouchableOpacity style={styles.askQuestionButton} onPress={handleAskQuestion}>
          <Ionicons name="document-text" size={20} color="#fff" />
          <Text style={styles.askQuestionText}>ASK QUESTION</Text>
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
  headerSpacer: {
    width: 24,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  illustrationContainer: {
    marginBottom: 40,
  },
  listIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6B7280',
    marginRight: 12,
  },
  line: {
    width: 60,
    height: 3,
    backgroundColor: '#6B7280',
    borderRadius: 2,
  },
  emptyStateMessage: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  askQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
  },
});

export default MyQuestionsScreen;



