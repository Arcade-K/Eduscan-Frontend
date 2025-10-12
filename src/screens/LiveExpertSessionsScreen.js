import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const LiveExpertSessionsScreen = ({ navigation }) => {
  const [hasLiveSessions, setHasLiveSessions] = useState(false);

  const handleGetVerifiedAnswer = () => {
    // Navigate to ask question or expert consultation
    navigation.navigate('AskQuestion');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live expert sessions</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!hasLiveSessions ? (
          <View style={styles.emptyState}>
            {/* Illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.illustration}>
                {/* Lab Characters */}
                <View style={styles.character1}>
                  <View style={styles.labCoat} />
                  <View style={styles.testTube} />
                </View>
                <View style={styles.character2}>
                  <View style={styles.labCoat} />
                  <View style={styles.pointingHand} />
                </View>
                <View style={styles.character3}>
                  <View style={styles.labCoat} />
                  <View style={styles.beaker} />
                </View>
                
                {/* Floating Elements */}
                <View style={styles.lightbulb1}>
                  <Ionicons name="bulb" size={16} color="#FFD700" />
                </View>
                <View style={styles.lightbulb2}>
                  <Ionicons name="bulb" size={14} color="#FFD700" />
                </View>
                <View style={styles.lightbulb3}>
                  <Ionicons name="bulb" size={12} color="#FFD700" />
                </View>
                
                {/* Scientific Equipment */}
                <View style={styles.equipment}>
                  <View style={styles.flask} />
                  <View style={styles.pencil} />
                  <View style={styles.graph} />
                </View>
                
                {/* Plant Elements */}
                <View style={styles.plant1}>
                  <Ionicons name="leaf" size={20} color="#4CAF50" />
                </View>
                <View style={styles.plant2}>
                  <Ionicons name="leaf" size={16} color="#4CAF50" />
                </View>
              </View>
            </View>

            {/* Empty State Text */}
            <Text style={styles.emptyTitle}>No Live Sessions Yet.</Text>
            <Text style={styles.emptySubtitle}>
              There's nothing here yet. Ask an expert something to get started.
            </Text>

            {/* Call to Action Button */}
            <TouchableOpacity 
              style={styles.ctaButton} 
              onPress={handleGetVerifiedAnswer}
            >
              <Text style={styles.ctaButtonText}>GET A VERIFIED ANSWER</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.liveSessions}>
            {/* Live sessions content would go here */}
            <Text style={styles.comingSoon}>Live sessions coming soon!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
  headerPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  illustrationContainer: {
    width: 300,
    height: 250,
    marginBottom: 40,
    position: 'relative',
  },
  illustration: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  character1: {
    position: 'absolute',
    left: 50,
    top: 80,
    width: 40,
    height: 60,
  },
  character2: {
    position: 'absolute',
    left: 120,
    top: 70,
    width: 40,
    height: 60,
  },
  character3: {
    position: 'absolute',
    left: 190,
    top: 85,
    width: 40,
    height: 60,
  },
  labCoat: {
    width: 35,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  testTube: {
    position: 'absolute',
    right: -5,
    top: 10,
    width: 8,
    height: 20,
    backgroundColor: '#FF6B9D',
    borderRadius: 4,
  },
  pointingHand: {
    position: 'absolute',
    right: -8,
    top: 15,
    width: 12,
    height: 8,
    backgroundColor: '#FF6B9D',
    borderRadius: 2,
  },
  beaker: {
    position: 'absolute',
    right: -5,
    top: 8,
    width: 10,
    height: 15,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  lightbulb1: {
    position: 'absolute',
    left: 30,
    top: 40,
  },
  lightbulb2: {
    position: 'absolute',
    right: 40,
    top: 50,
  },
  lightbulb3: {
    position: 'absolute',
    left: 80,
    top: 30,
  },
  equipment: {
    position: 'absolute',
    bottom: 20,
    left: 50,
    flexDirection: 'row',
    gap: 15,
  },
  flask: {
    width: 20,
    height: 30,
    backgroundColor: '#FF6B9D',
    borderRadius: 10,
  },
  pencil: {
    width: 3,
    height: 25,
    backgroundColor: '#8B4513',
    borderRadius: 2,
  },
  graph: {
    width: 25,
    height: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  plant1: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  plant2: {
    position: 'absolute',
    bottom: 15,
    right: 30,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  ctaButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  liveSessions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  comingSoon: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default LiveExpertSessionsScreen;
