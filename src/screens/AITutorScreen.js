import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard, 
  TouchableWithoutFeedback,
  Alert,
  Image,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { normalizeFont, scale, verticalScale } from '../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';

const AITutorScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Ask me any question about your content!', from: 'bot' },
    { id: '2', text: 'Hello', from: 'user' }
  ]);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleSend = () => {
    if (!text.trim()) return;
    const newMsg = { id: Date.now().toString(), text: text.trim(), from: 'user' };
    setMessages((m) => [...m, newMsg]);
    setText('');
    simulateAIResponse();
    setTimeout(() => scrollToBottom(), 100);
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      try {
        listRef.current.scrollToEnd({ animated: true });
      } catch (e) {}
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.messageRow, item.from === 'user' ? styles.messageUser : styles.messageBot]}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.messageImage} />
        )}
        <Text style={item.from === 'user' ? styles.messageUserText : styles.messageBotText}>
          {item.text}
        </Text>
      </View>
    );
  };

  const listRef = useRef(null);
  const textInputRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setIsKeyboardVisible(true);
      setTimeout(() => scrollToBottom(), 100);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is needed to take photos.');
      return false;
    }
    return true;
  };

  const handleCameraPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
        setShowImagePreview(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const handleImageSend = () => {
    if (selectedImage) {
      const imageMessage = {
        id: Date.now().toString(),
        text: text.trim() || 'Image shared',
        from: 'user',
        image: selectedImage.uri,
        type: 'image'
      };
      setMessages((m) => [...m, imageMessage]);
      setSelectedImage(null);
      setShowImagePreview(false);
      setText('');
      simulateAIResponse();
    }
  };

  const simulateVoiceRecognition = () => {
    setIsListening(true);
    // Simulate voice recognition delay
    setTimeout(() => {
      const mockVoiceText = "Can you explain this math problem?";
      setText(mockVoiceText);
      setIsListening(false);
      // Auto-focus the text input
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);
    }, 2000);
  };

  const speakText = (text) => {
    Speech.speak(text, {
      language: 'en',
      pitch: 1.0,
      rate: 0.8,
    });
  };

  const simulateAIResponse = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Let me analyze your question and provide a detailed explanation.",
        "That's a great question! Here's what I understand and how I can help you solve it.",
        "I can see you're working on this problem. Let me break it down step by step for you.",
        "Interesting question! Let me provide you with a comprehensive answer that should help clarify this concept.",
        "I understand what you're asking. Here's my explanation with examples to make it clearer."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const botMessage = { 
        id: Date.now().toString(), 
        text: randomResponse, 
        from: 'bot' 
      };
      setMessages((m) => [...m, botMessage]);
      setIsTyping(false);
      setTimeout(() => scrollToBottom(), 100);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={0}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Tutor</Text>
        <View style={{ width: 40 }} />
      </View>

            <FlatList
              ref={listRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.messagesList}
              inverted={false}
            />

            {/* Typing Indicator */}
            {isTyping && (
              <View style={styles.typingIndicatorContainer}>
                <View style={styles.typingIndicator}>
                  <Text style={styles.typingDots}>...</Text>
                </View>
              </View>
            )}

            <View style={styles.inputRow}>
              <View style={styles.inputWrap}>
                <TextInput
                  ref={textInputRef}
                  placeholder="Ask anything..."
                  value={text}
                  onChangeText={setText}
                  onFocus={scrollToBottom}
                  style={styles.textInput}
                  multiline
                  maxLength={500}
                />
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={handleCameraPress}
                >
                  <Ionicons name="camera" size={18} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.iconButton, isListening && styles.listeningButton]}
                  onPress={simulateVoiceRecognition}
                  disabled={isListening}
                >
                  <Ionicons 
                    name="mic" 
                    size={18} 
                    color={isListening ? "#22C55E" : "#6B7280"} 
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={[styles.sendButton, !text.trim() && styles.sendButtonDisabled]} 
                onPress={handleSend}
                disabled={!text.trim()}
              >
                <Ionicons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Image Preview Modal */}
      <Modal
        visible={showImagePreview}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImagePreview(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Preview Image</Text>
              <TouchableOpacity 
                onPress={() => setShowImagePreview(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            {selectedImage && (
              <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
            )}
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowImagePreview(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.sendImageButton}
                onPress={handleImageSend}
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
                <Text style={styles.sendImageButtonText}>Send</Text>
              </TouchableOpacity>
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
    backgroundColor: '#FFFFFF' 
  },
  header: { 
    height: 56, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
  },
  backButton: { 
    width: 40, 
    alignItems: 'flex-start',
    padding: 8,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#000000',
  },
  messagesList: { 
    flex: 1,
    paddingHorizontal: 16, 
    paddingTop: 20, 
    paddingBottom: 100,
  },
  messageRow: { 
    marginVertical: 4,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageBot: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#F3F4F6', 
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageUser: { 
    alignSelf: 'flex-end', 
    backgroundColor: '#2563EB', 
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageBotText: { 
    color: '#000000', 
    fontSize: 16,
    lineHeight: 20,
  },
  messageUserText: { 
    color: '#FFFFFF', 
    fontSize: 16,
    lineHeight: 20,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  typingIndicatorContainer: {
    position: 'absolute',
    left: 16,
    bottom: 80,
    zIndex: 1,
  },
  typingIndicator: {
    backgroundColor: '#F3F4F6',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  typingDots: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputRow: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  inputWrap: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F3F4F6', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 24,
    marginRight: 12,
  },
  textInput: { 
    flex: 1, 
    fontSize: 16,
    color: '#000000',
    paddingRight: 8,
    paddingVertical: 0,
    paddingLeft: 0,
  },
  iconButton: { 
    padding: 8,
    marginLeft: 4,
  },
  listeningButton: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 16,
  },
  sendButton: { 
    backgroundColor: '#2563EB', 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#000000',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1A1A1A',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 8,
  },
  previewImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1A1A1A',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#374151',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sendImageButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sendImageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AITutorScreen;
