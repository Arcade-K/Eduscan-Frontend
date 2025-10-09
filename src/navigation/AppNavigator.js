import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AskQuestionScreen from '../screens/AskQuestionScreen';
import AITutorScreen from '../screens/AITutorScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import QuestionDetailScreen from '../screens/QuestionDetailScreen';
import VoiceSearchScreen from '../screens/VoiceSearchScreen';
import TextbookSolutionsScreen from '../screens/TextbookSolutionsScreen';
import SolutionStepsScreen from '../screens/SolutionStepsScreen';
import CameraScreen from '../screens/CameraScreen';
import PremiumUpgradeScreen from '../screens/PremiumUpgradeScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import MyQuestionsScreen from '../screens/MyQuestionsScreen';
import NotesInputScreen from '../screens/NotesInputScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotesEditorScreen from '../screens/NotesEditorScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="QuestionDetail" 
        component={QuestionDetailScreen}
        options={{ 
          title: 'Question',
          headerStyle: { backgroundColor: '#6366F1' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
      <Stack.Screen 
        name="AskQuestion" 
        component={AskQuestionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="VoiceSearch" 
        component={VoiceSearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TextbookSolutions" 
        component={TextbookSolutionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SolutionSteps" 
        component={SolutionStepsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PremiumUpgrade" 
        component={PremiumUpgradeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Subscription"
        component={SubscriptionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MyQuestions" 
        component={MyQuestionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NotesInput" 
        component={NotesInputScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SearchMain" 
        component={SearchScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NotesInput" 
        component={NotesInputScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NotesEditor" 
        component={NotesEditorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="RecordAudio" 
        component={VoiceSearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="QuestionDetail" 
        component={QuestionDetailScreen}
        options={{ 
          title: 'Question',
          headerStyle: { backgroundColor: '#6366F1' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
    </Stack.Navigator>
  );
}

function MainAppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Ask') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        headerShown: false,
      })}
    >
        <Tab.Screen 
          name="Home" 
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Notes" 
          component={SearchStack}
          options={{
            tabBarLabel: 'Notes',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Ask" 
          component={AITutorScreen}
          options={{
            tabBarLabel: 'Ask AI',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'chatbubble' : 'chatbubble-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Community" 
          component={NotificationsScreen}
          options={{
            tabBarLabel: 'Community',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'people' : 'people-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
            ),
          }}
        />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={MainAppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
