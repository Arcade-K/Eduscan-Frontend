import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Show splash screen for 3 seconds then navigate to onboarding
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Background */}
      <View style={styles.background}>
        {/* EDUSCAN Logo */}
        <View style={styles.logoContainer}>
          <Svg
            width={140}
            height={140}
            viewBox="0 0 140 140"
            style={styles.brainIcon}
          >
            {/* Brain Shape - More accurate EDUSCAN style */}
            <Path
              d="M70 25C55 25 40 35 40 55C40 60 42 65 45 70C42 75 40 80 40 85C40 100 50 105 60 105C65 105 70 103 75 100C80 103 85 105 90 105C100 105 110 100 110 85C110 80 108 75 105 70C108 65 110 60 110 55C110 35 95 25 80 25C75 25 70 27 70 25Z"
              fill="#3B82F6"
            />
            
            {/* Brain Details - Subtle folds */}
            <Path
              d="M50 45C50 40 55 35 60 35C65 35 70 40 70 45"
              stroke="#2563EB"
              strokeWidth="1.5"
              fill="none"
            />
            <Path
              d="M70 45C70 40 75 35 80 35C85 35 90 40 90 45"
              stroke="#2563EB"
              strokeWidth="1.5"
              fill="none"
            />
            <Path
              d="M50 65C50 60 55 55 60 55C65 55 70 60 70 65"
              stroke="#2563EB"
              strokeWidth="1.5"
              fill="none"
            />
            <Path
              d="M70 65C70 60 75 55 80 55C85 55 90 60 90 65"
              stroke="#2563EB"
              strokeWidth="1.5"
              fill="none"
            />
            
            {/* Checkmark - Centered and prominent */}
            <Path
              d="M55 70L65 80L85 60"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
          
          {/* EDUSCAN Text */}
          <Text style={styles.logoText}>EDUSCAN</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  brainIcon: {
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 2,
  },
});

export default SplashScreen;
