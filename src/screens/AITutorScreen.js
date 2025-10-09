import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { normalizeFont, scale, verticalScale } from '../utils/responsive';
import { Ionicons } from '@expo/vector-icons';

const AITutorScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Ask me any question about your content!', from: 'bot' }
  ]);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    const newMsg = { id: Date.now().toString(), text: text.trim(), from: 'user' };
    setMessages((m) => [...m, newMsg]);
    setText('');
    // TODO: call AI backend and append bot response
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageRow, item.from === 'user' ? styles.messageUser : styles.messageBot]}>
      <Text style={item.from === 'user' ? styles.messageUserText : styles.messageBotText}>{item.text}</Text>
    </View>
  );

  const listRef = useRef(null);

  const scrollToBottom = () => {
    // scroll to top of inverted list (index 0)
    if (listRef.current) {
      try {
        listRef.current.scrollToOffset({ offset: 0, animated: true });
      } catch (e) {}
    }
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
              data={messages.slice().reverse()}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.messagesList}
              inverted={true}
            />

            <View style={styles.inputRow}>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Ask anything..."
            value={text}
            onChangeText={setText}
                  onFocus={scrollToBottom}
            style={styles.textInput}
          />
          <View style={styles.inputIcons} pointerEvents="box-none">
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="camera" size={18} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="mic" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
              <TouchableOpacity style={styles.sendButton} onPress={() => { handleSend(); scrollToBottom(); }}>
                <Ionicons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backButton: { width: 40, alignItems: 'flex-start' },
  headerTitle: { fontSize: 16, fontWeight: '600' },
  messagesList: { paddingHorizontal: scale(16), paddingTop: verticalScale(12), paddingBottom: verticalScale(120) },
  messageRow: { maxWidth: '72%', padding: scale(12), borderRadius: scale(16), marginVertical: verticalScale(6) },
  messageBot: { alignSelf: 'flex-start', backgroundColor: '#F3F4F6', borderTopLeftRadius: scale(16), borderTopRightRadius: scale(16), borderBottomRightRadius: scale(16), borderBottomLeftRadius: scale(6) },
  messageUser: { alignSelf: 'flex-end', backgroundColor: '#2563EB', borderTopLeftRadius: scale(16), borderTopRightRadius: scale(16), borderBottomLeftRadius: scale(16), borderBottomRightRadius: scale(6) },
  messageBotText: { color: '#111827', fontSize: normalizeFont(14) },
  messageUserText: { color: '#fff', fontSize: normalizeFont(14) },
  inputRow: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6', backgroundColor: '#fff' },
  inputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: scale(12), paddingVertical: verticalScale(6), borderRadius: scale(24) },
  textInput: { flex: 1, paddingVertical: verticalScale(6), color: '#111827', paddingRight: scale(96), fontSize: normalizeFont(14), height: verticalScale(36) },
  inputIcons: { position: 'absolute', right: scale(8), top: verticalScale(6), height: verticalScale(36), flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: scale(8), padding: scale(6) },
  sendButton: { marginLeft: scale(12), backgroundColor: '#2563EB', width: scale(44), height: verticalScale(44), borderRadius: scale(22), alignItems: 'center', justifyContent: 'center', shadowColor: '#2563EB', shadowOffset: { width: 0, height: verticalScale(4) }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 6 },
});

export default AITutorScreen;
