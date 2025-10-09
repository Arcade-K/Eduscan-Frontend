import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const NotesInputScreen = ({ navigation }) => {

  const handleInputText = () => {
    navigation.navigate('NotesEditor');
  };

  const handleRecordAudio = () => {
    navigation.navigate('RecordAudio');
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Main Content */}
        <View style={styles.content}>
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {/* Input Text Button */}
            <TouchableOpacity style={styles.inputTextButton} onPress={handleInputText}>
              <Ionicons name="pencil" size={20} color="#fff" />
              <Text style={styles.buttonText}>Input text</Text>
            </TouchableOpacity>

            {/* Record Audio Button */}
            <TouchableOpacity style={styles.recordAudioButton} onPress={handleRecordAudio}>
              <Ionicons name="mic" size={20} color="#fff" />
              <Text style={styles.buttonText}>Record audio</Text>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Ionicons name="close" size={20} color="#374151" />
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  inputTextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
    minWidth: 200,
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recordAudioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
    minWidth: 200,
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotesInputScreen;
