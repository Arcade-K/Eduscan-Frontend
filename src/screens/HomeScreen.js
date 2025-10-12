import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { normalizeFont, scale } from '../utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';

const HomeScreen = ({ navigation }) => {
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleAskQuestion = (type) => {
    if (type === 'text') {
      navigation.navigate('Notes');
    } else if (type === 'camera') {
      navigation.navigate('Camera');
    } else if (type === 'voice') {
      setShowVoiceSearch(true);
    }
  };

  const handleFeaturePress = (feature) => {
    if (feature === 'math') {
      navigation.navigate('TextbookSolutions');
    } else if (feature === 'answer') {
      navigation.navigate('AskQuestion');
    } else if (feature === 'community') {
      navigation.navigate('Community');
    }
  };

  const handlePremiumUpgrade = () => {
    navigation.navigate('PremiumUpgrade');
  };

  const stopVoiceSearch = () => {
    setShowVoiceSearch(false);
    setIsListening(false);
  };

  const handleVoiceInput = (text) => {
    setVoiceText(text);
    // Simulate search results based on voice input
    const mockResults = [
      { id: 1, title: `Result for "${text}"`, description: 'This is a mock search result' },
      { id: 2, title: `Related to "${text}"`, description: 'Another mock result' },
      { id: 3, title: `Answer for "${text}"`, description: 'Third mock result' },
    ];
    setSearchResults(mockResults);
  };

  const speakText = (text) => {
    Speech.speak(text, {
      language: 'en',
      pitch: 1.0,
      rate: 0.8,
    });
  };

  const simulateVoiceRecognition = () => {
    setIsListening(true);
    // Simulate voice recognition delay
    setTimeout(() => {
      const mockVoiceText = "What is the derivative of x squared?";
      handleVoiceInput(mockVoiceText);
      setIsListening(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
  barStyle="dark-content" // black content
  backgroundColor="#FFFFFF" // white background
  translucent={false} // ensure backgroundColor is applied on Android
/>
      
      <LinearGradient
        // Approximate 160.75deg using start/end coordinates
        start={{ x: 0.84, y: 0.08 }}
        end={{ x: 0.16, y: 0.92 }}
        colors={[ '#0C104D', '#020315' ]}
        locations={[0.2797, 0.9917]}
        style={styles.gradient}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Help Banner (now contains Ask Question section) */}
          <View style={styles.helpBanner}>
            <View style={styles.topHelpContentRow}>
  <Text style={styles.helpTitle}>Need help with history?</Text>

  <View style={styles.helpIllustration}>
    <Image
      source={require('../../assets/illustration-help.png')}
      style={styles.helpImage}
    />
    <View style={styles.phoneIcon}>
      <Ionicons name="phone-portrait" size={20} color="#4F46E5" />
    </View>
  </View>
</View>


            {/* Ask Question Section */}
            <View style={styles.askSection}>
  <Text style={styles.askSectionTitle}>Ask a question</Text>
  <View style={styles.askButtons}>
    <TouchableOpacity 
      style={styles.askButton}
      onPress={() => handleAskQuestion('text')}
    >
      <Ionicons name="document-text" size={24} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity 
      style={styles.askButton}
      onPress={() => handleAskQuestion('camera')}
    >
      <Ionicons name="camera" size={24} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity 
      style={styles.askButton}
      onPress={() => handleAskQuestion('voice')}
    >
      <Ionicons name="mic" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
</View>
          </View>

          {/* Feature Cards */}
          <View style={styles.featureCards}>
            <TouchableOpacity 
              style={[styles.featureCard, styles.mathCard]}
              onPress={() => handleFeaturePress('math')}
            >
              <Ionicons name="calculator" size={32} color="#fff" />
              <Text style={styles.featureTitle}>Math Solver</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.featureCard, styles.answerCard]}
              onPress={() => handleFeaturePress('answer')}
            >
              <Ionicons name="chatbubble" size={32} color="#fff" />
              <Text style={styles.featureTitle}>Give Answer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.featureCard, styles.communityCard]}
              onPress={() => handleFeaturePress('community')}
            >
              <Ionicons name="people" size={32} color="#fff" />
              <Text style={styles.featureTitle}>Community</Text>
            </TouchableOpacity>
          </View>

          {/* Premium Access Banner */}
          <TouchableOpacity style={styles.premiumBanner} onPress={handlePremiumUpgrade}>
            <View style={styles.premiumContent}>
              <View style={styles.premiumText}>
                <Text style={styles.premiumTitle}>Get unlimited access today!</Text>
                <Text style={styles.premiumSubtitle}>Upgrade your learning with unlimited access to premium perks.</Text>
              </View>
              <View style={styles.premiumIcon}>
                <Ionicons name="layers" size={24} color="#f2f1eaff" />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>

      {/* Voice Search Modal */}
      <Modal
        visible={showVoiceSearch}
        transparent={true}
        animationType="slide"
        onRequestClose={stopVoiceSearch}
      >
        <View style={styles.voiceSearchOverlay}>
          <View style={styles.voiceSearchContainer}>
            <View style={styles.voiceSearchHeader}>
              <TouchableOpacity onPress={stopVoiceSearch} style={styles.voiceSearchCloseButton}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.voiceSearchTitle}>Voice Search</Text>
              <View style={styles.voiceSearchPlaceholder} />
            </View>
            
            <View style={styles.voiceSearchContent}>
              {isListening ? (
                <View style={styles.listeningContainer}>
                  <View style={styles.listeningAnimation}>
                    <Ionicons name="mic" size={48} color="#22C55E" />
                  </View>
                  <Text style={styles.listeningText}>Listening...</Text>
                  <Text style={styles.listeningSubtext}>Speak your question</Text>
                </View>
              ) : (
                <View style={styles.voiceInputContainer}>
                  <TextInput
                    style={styles.voiceInput}
                    placeholder="Enter your question or tap mic to speak"
                    placeholderTextColor="#9CA3AF"
                    value={voiceText}
                    onChangeText={setVoiceText}
                    multiline
                  />
                  
                  <TouchableOpacity 
                    style={styles.listenButton} 
                    onPress={simulateVoiceRecognition}
                  >
                    <Ionicons name="mic" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              )}
              
              {searchResults.length > 0 && (
                <View style={styles.searchResultsContainer}>
                  <Text style={styles.resultsTitle}>Search Results:</Text>
                  {searchResults.map((result) => (
                    <TouchableOpacity 
                      key={result.id} 
                      style={styles.resultItem}
                      onPress={() => speakText(result.description)}
                    >
                      <Text style={styles.resultTitle}>{result.title}</Text>
                      <Text style={styles.resultDescription}>{result.description}</Text>
                      <Ionicons name="volume-high" size={16} color="#22C55E" />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  helpBanner: {
  backgroundColor: '#8a9ebfff',
  borderRadius: 16,
  paddingHorizontal: 20,
  paddingTop: (StatusBar.currentHeight || 20) + 20,
  paddingBottom: 20,
  marginBottom: 20,
  marginHorizontal: -20,
  flexDirection: 'column',
  justifyContent: 'space-between', // push askSection to bottom
  minHeight: 300,
},

  helpContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: normalizeFont(27),
    fontWeight: 'bold',
    color: '#f2f4f8ff',
    flex: 1,
  },
  topHelpContentRow: {
  flexDirection: 'row',
  justifyContent: 'space-between', // title left, image right
  alignItems: 'center',
  marginBottom: 20, // spacing before Ask Section
},
  helpIllustration: {
  width: scale(120), // adjust as needed
  height: scale(120),
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
},

  
  phoneIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
  },

  helpImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
},
  askSection: {
    backgroundColor: '#ced8e9ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  askSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0c0c0dff',
    textAlign: 'center',
    marginBottom: 16,
  },
  askButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  askButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  featureCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  featureCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  mathCard: {
    backgroundColor: '#10B981',
  },
  answerCard: {
    backgroundColor: '#F59E0B',
  },
  communityCard: {
    backgroundColor: '#EC4899',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  premiumBanner: {
    backgroundColor: '#536178ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  premiumText: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  premiumIcon: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 12,
    marginLeft: 16,
  },
  voiceSearchOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceSearchContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#000000',
    borderRadius: 16,
    overflow: 'hidden',
  },
  voiceSearchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1A1A1A',
  },
  voiceSearchCloseButton: {
    padding: 8,
  },
  voiceSearchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  voiceSearchPlaceholder: {
    width: 40,
  },
  voiceSearchContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  listeningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listeningAnimation: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  listeningText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listeningSubtext: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  voiceInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  voiceInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  listenButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  searchResultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  resultDescription: {
    color: '#9CA3AF',
    fontSize: 14,
    flex: 2,
    marginLeft: 12,
  },
});

export default HomeScreen;
