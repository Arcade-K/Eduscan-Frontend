import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../services/api';

const NotesEditorScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirm = async () => {
    try {
      await api.createNote({ title, content });
      navigation.goBack();
    } catch (e) {
      // Minimal fallback; production app should show a toast
      console.error('Failed to save note', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Chapter 3 Summary"
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="Jot down your thoughts, ideas, and lecture notes here..."
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 18,
    color: '#111827',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  headerSpacer: {
    width: 26,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  titleInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
    color: '#111827',
  },
  contentInput: {
    height: 180,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#fff',
    color: '#111827',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 14,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotesEditorScreen;


