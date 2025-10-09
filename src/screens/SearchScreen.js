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

const SearchScreen = ({ navigation }) => {
  const handleNewNote = () => {
    // Navigate to notes input screen
    navigation.navigate('NotesInput');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration Section */}
        <View style={styles.illustrationSection}>
          <View style={styles.illustrationContainer}>
            <View style={styles.personContainer}>
              <Ionicons name="person" size={80} color="#FFD700" />
            </View>
            <View style={styles.phoneContainer}>
              <View style={styles.phoneScreen}>
                <View style={styles.microphoneIcon}>
                  <Ionicons name="mic" size={24} color="#4F46E5" />
                </View>
              </View>
              <View style={styles.greenDot} />
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.headline}>WE TAKE THE NOTES, YOU FOCUS ON CLASS</Text>
          <Text style={styles.description}>Get organized notes when we listen to your teacher.</Text>
          
          <TouchableOpacity style={styles.newNoteButton} onPress={handleNewNote}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.newNoteButtonText}>New note</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  illustrationSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  personContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 60,
    marginBottom: 20,
  },
  phoneContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  phoneScreen: {
    width: 80,
    height: 100,
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  microphoneIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenDot: {
    position: 'absolute',
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  contentSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  newNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  newNoteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchScreen;
