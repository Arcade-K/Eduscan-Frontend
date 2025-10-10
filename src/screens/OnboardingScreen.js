import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Rect, G, Defs, LinearGradient, Stop, Path, Circle } from 'react-native-svg';
import { normalizeFont, scale, verticalScale } from '../utils/responsive';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const scrollViewRef = useRef(null);
  const svgScrollViewRef = useRef(null);

  const onboardingData = [
    {
      id: 1,
      title: 'The community is ready to help you',
      description:
        'Join millions of students who help each other learn and grow together in our supportive community.',
      color: '#6366F1',
    },
    {
      id: 2,
      title: 'Step-by-step expert solutions',
      description:
        'Get detailed explanations from verified experts with step-by-step solutions for any subject.',
      color: '#10B981',
    },
    {
      id: 3,
      title: 'Scan to Solve anything instantly',
      description:
        'Simply scan your homework with your camera and get instant answers with detailed explanations.',
      color: '#8B5CF6',
    },
  ];

  const handleNext = () => {
    if (currentScreen < onboardingData.length - 1) {
      const nextScreen = currentScreen + 1;
      setCurrentScreen(nextScreen);
      scrollViewRef.current?.scrollTo({
        x: nextScreen * width,
        animated: true,
      });
      svgScrollViewRef.current?.scrollTo({
        x: nextScreen * width,
        animated: true,
      });
    } else {
      navigation.replace('MainApp');
    }
  };

  const handleSkip = () => {
    navigation.replace('MainApp');
    setTimeout(() => {
      navigation.navigate('Home');
    }, 0);
  };

  const handleJoinNow = () => {
    navigation.replace('MainApp');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const screenIndex = Math.round(contentOffsetX / width);
    setCurrentScreen(screenIndex);
    
    // Sync SVG background scroll
    svgScrollViewRef.current?.scrollTo({
      x: contentOffsetX,
      animated: false,
    });
  };

  

  const renderScreen = (data, index) => (
    <View key={index} style={styles.screenContainer}>
      {/* Slide Illustration */}
      <View style={styles.illustrationContainer}>
 
        {index === 0 ? (
          <View style={styles.chatIllustrationWrap}>

            {/* Left avatar + text container (absolute positioned) */}
            <View style={styles.leftMessageWrap}>
              <Image
                source={require('../../assets/avatars/Avatar2.png')}
                style={styles.avatarImage1}
              />
              <View style={styles.textCardLeft}>
                <Text style={styles.textCardTitle}>Ask here</Text>
              </View>
            </View>


            {/* Right avatar + text container (absolute positioned) */}
            <View style={styles.rightMessageWrap}>
              <View style={styles.textCardRight}>
                <Text style={styles.textCardTitle}>Need help</Text>
              </View>
              <Image
                source={require('../../assets/avatars/Avatar1.png')}
                style={styles.avatarImage2}
              />
            </View>
          </View>
        ) : index === 1 ? (
          <Image
            source={require('../../assets/Group 2.png')}
            style={styles.slideImage1}
          />
        ) : (
          <Image
            source={require('../../assets/Group 3.png')}
            style={styles.slideImage2}
          />
        )}
      </View>

      {/* Slide Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />


      {/* (removed the smaller duplicate SVG) */}

      {/* Header */}
      <View style={[styles.header, styles.headerFloating, { zIndex: 20 }] }>
        <Text style={styles.logo}>EduScan</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipButton}>SKIP</Text>
        </TouchableOpacity>
      </View>

      {/* SVG backgrounds for each slide */}
      <ScrollView
        ref={svgScrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.svgScrollContainer}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {onboardingData.map((data, index) => (
          <View key={index} style={{ width: width }}>
            <Svg
              width={width}
              height={height * 0.55}
              viewBox="0 0 390 402"
              style={[styles.svgBackgroundTop, { zIndex: -1 }]}
            >
              <G opacity={index === 0 ? 0.1 : 1}>
                <Rect
                  x={-85}
                  y={-157}
                  width={559}
                  height={559}
                  rx={2323232}
                  fill={index === 0 ? '#E45AC1' : '#FFFFFF'}
                  stroke={'#FFFFFF'}
                  strokeWidth={1}
                />
              </G>
            </Svg>
          </View>
        ))}
      </ScrollView>

      {/* Scrollable Onboarding Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 16 }}
        style={styles.scrollContainer}
      >

        {onboardingData.map((data, index) => (
          <View key={index} style={{ width: width }}>
            {renderScreen(data, index)}
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {onboardingData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentScreen && {
                backgroundColor: item.color,
                width: 24,
              },
            ]}
          />
        ))}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinNow}>
          <Text style={styles.joinButtonText}>JOIN NOW FREE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3D5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
  },
  headerFloating: {
    position: 'absolute',
    top: (StatusBar.currentHeight || 20) + verticalScale(16),
    left: 0,
    right: 0,
    paddingTop: verticalScale(12),
    backgroundColor: 'transparent',
  },
  logo: {
    fontSize: normalizeFont(24),
    fontWeight: 'bold',
    color: '#111827',
  },
  skipButton: {
    fontSize: normalizeFont(16),
    fontWeight: '600',
    color: '#6B7280',
  },
  scrollContainer: {
    flex: 1,
  },
  screenContainer: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
    paddingBottom: verticalScale(50),
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  chatIllustrationWrap: {
    width: '100%',
    height: verticalScale(220),
    marginTop: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftMessageWrap: {
    position: 'absolute',
    left: scale(20),
    top: verticalScale(100),
    alignItems: 'flex-start',
  },
  rightMessageWrap: {
    position: 'absolute',
    right: scale(20),
    top: verticalScale(-36),
    alignItems: 'flex-end',
  },
  centerButtonWrap: {
    position: 'absolute',
    top: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  textCardLeft: {
    backgroundColor: '#fff',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(12),
    marginTop: verticalScale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(6) },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    alignItems: 'flex-start',
  },
  textCardRight: {
    backgroundColor: '#fff',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(12),
    marginBottom: verticalScale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(6) },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    alignItems: 'flex-end',
  },
  textCardTitle: {
    color: '#111827',
    fontSize: normalizeFont(16),
    fontWeight: '700',
  },
  
  avatarImage1: {
    width: scale(110),
    height: scale(110),
    borderRadius: 999,
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  avatarImage2: {
    width: scale(110),
    height: scale(110),
    borderRadius: 999,
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  slideImage1: {
   width: scale(360),
    height: verticalScale(250),
    position: 'absolute',
    borderRadius: 999,
    top: verticalScale(80),
    transform: [{ rotate: '0deg' }],
    opacity: 1,
  },
  slideImage2: {
   width: scale(360),
    height: verticalScale(250),
    top: verticalScale(5),
    borderRadius: scale(200),
    transform: [{ rotate: '0deg' }],
    opacity: 1,
  },
  content: {
    alignItems: 'bottom',
    /* reduce internal bottom margin since screenContainer provides spacing */
    marginBottom: 8,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    fontSize: normalizeFont(32),
    lineHeight: verticalScale(45),
    letterSpacing: 0,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    fontSize: normalizeFont(18),
    lineHeight: verticalScale(28),
    letterSpacing: 0,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(40),
    gap: scale(8),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#D1D5DB',
  },
  activeDot: {
    backgroundColor: '#6366F1',
    width: scale(24),
  },
  bottomContainer: {
    paddingHorizontal: scale(40),
    paddingBottom: verticalScale(40),
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: '#6366F1',
    borderRadius: scale(12),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(32),
    width: '100%',
    alignItems: 'center',
    marginBottom: scale(16),
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: normalizeFont(16),
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: normalizeFont(16),
    color: '#6366F1',
    fontWeight: '600',
  },
  fullBackgroundSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  svgScrollContainer: {
    position: 'absolute',
    top: -(StatusBar.currentHeight || 20),
    left: 0,
    right: 0,
    height: (StatusBar.currentHeight || 20) + verticalScale(220),
    zIndex: -1, // behind content but above base background
  },
  svgBackgroundTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: (StatusBar.currentHeight || 20) + verticalScale(220),
    zIndex: -1,
  },

});

export default OnboardingScreen;
