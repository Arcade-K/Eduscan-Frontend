import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';

const NotesListScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  // Refresh notes when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const loadNotes = async () => {
    try {
      const data = await api.getNotes();
      setNotes(data);
    } catch (error) {
      console.error('Failed to load notes:', error);
      // Don't set fallback data - show empty state
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewNote = () => {
    navigation.navigate('NotesEditor');
  };

  const handleNotePress = (note) => {
    navigation.navigate('NoteDetail', { note });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const groupNotesByDate = (notes) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayNotes = [];
    const olderNotes = [];

    notes.forEach(note => {
      const noteDate = new Date(note.createdAt);
      if (noteDate.toDateString() === today.toDateString()) {
        todayNotes.push(note);
      } else {
        olderNotes.push(note);
      }
    });

    return { todayNotes, olderNotes };
  };

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => handleNotePress(item)}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteDate}>{formatDate(item.createdAt)}</Text>
    </TouchableOpacity>
  );

  const renderSection = (title, data) => {
    if (data.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {data.map((note) => (
          <TouchableOpacity
            key={note.id}
            style={styles.noteItem}
            onPress={() => handleNotePress(note)}
          >
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteDate}>{formatDate(note.createdAt)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const { todayNotes, olderNotes } = groupNotesByDate(notes);

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <View style={styles.personContainer}>
          {/* Person's head */}
          <View style={styles.personHead}>
            <View style={styles.face}>
              <View style={styles.eye} />
              <View style={[styles.eye, { marginLeft: 8 }]} />
              <View style={styles.smile} />
            </View>
          </View>
          
          {/* Person's body */}
          <View style={styles.personBody} />
          
          {/* Phone in hands */}
          <View style={styles.phoneContainer}>
            <View style={styles.phone}>
              <View style={styles.phoneScreen}>
                <View style={styles.phoneIcon}>
                  <Ionicons name="analytics" size={20} color="#fff" />
                </View>
              </View>
              <View style={styles.phoneCamera} />
            </View>
          </View>
        </View>
      </View>

      {/* Headline */}
      <Text style={styles.headline}>WE TAKE THE NOTES,{'\n'}YOU FOCUS ON CLASS</Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>Get organized notes when we listen to your teacher.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading notes...</Text>
        </View>
      ) : notes.length === 0 ? (
        <View style={styles.content}>
          {renderEmptyState()}
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderSection('Today', todayNotes)}
          {renderSection('Earlier', olderNotes)}
        </ScrollView>
      )}

      {/* New Note Button */}
      <View style={styles.newNoteContainer}>
        <TouchableOpacity style={styles.newNoteButton} onPress={handleNewNote}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.newNoteText}>New note</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  noteItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  newNoteContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  newNoteButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
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
  newNoteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  illustrationContainer: {
    marginBottom: 50,
  },
  personContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  personHead: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    borderWidth: 3,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    position: 'relative',
  },
  face: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  },
  eye: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#111827',
    position: 'absolute',
    top: 15,
  },
  smile: {
    width: 20,
    height: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    borderRadius: 10,
    position: 'absolute',
    bottom: 15,
    left: 20,
  },
  personBody: {
    width: 120,
    height: 80,
    backgroundColor: '#FEF3C7',
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#E5E7EB',
  },
  phoneContainer: {
    position: 'absolute',
    top: 30,
    right: -30,
  },
  phone: {
    width: 70,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#111827',
    position: 'relative',
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#6366F1',
    borderRadius: 9,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneCamera: {
    position: 'absolute',
    top: 12,
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
});

export default NotesListScreen;
