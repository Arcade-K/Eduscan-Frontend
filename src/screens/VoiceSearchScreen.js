import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const VoiceSearchScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

  const handleVoiceSearch = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording
      Alert.alert('Voice Search', 'Listening... Speak your question now!');
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        Alert.alert('Voice Search', 'Question recorded! Searching for solutions...');
        // Navigate to search results or textbook solutions
        navigation.navigate('TextbookSolutions');
      }, 3000);
    } else {
      // Stop recording
      setIsRecording(false);
    }
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Select Language',
      'Choose your voice search language',
      [
        { text: 'English (US)', onPress: () => setSelectedLanguage('English (US)') },
        { text: 'Spanish', onPress: () => setSelectedLanguage('Spanish') },
        { text: 'French', onPress: () => setSelectedLanguage('French') },
        { text: 'German', onPress: () => setSelectedLanguage('German') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Search</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>Tap and ask it out loud</Text>
        
        {/* Voice Button */}
        <TouchableOpacity 
          style={[
            styles.voiceButton,
            isRecording && styles.voiceButtonRecording
          ]}
          onPress={handleVoiceSearch}
        >
          <Ionicons 
            name={isRecording ? "stop" : "mic"} 
            size={40} 
            color={isRecording ? "#EF4444" : "#6366F1"} 
          />
        </TouchableOpacity>

        {/* Language Selection */}
        <View style={styles.languageSection}>
          <Text style={styles.languageLabel}>Voice search language</Text>
          <TouchableOpacity 
            style={styles.languageSelector}
            onPress={handleLanguageChange}
          >
            <Text style={styles.languageText}>{selectedLanguage}</Text>
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  instructionText: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 60,
    fontWeight: '500',
  },
  voiceButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    borderWidth: 3,
    borderColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  voiceButtonRecording: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
    shadowColor: '#EF4444',
  },
  languageSection: {
    alignItems: 'center',
  },
  languageLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    fontWeight: '500',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  languageText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
});

export default VoiceSearchScreen;
