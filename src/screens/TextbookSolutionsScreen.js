import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const TextbookSolutionsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const openedBooks = [
    {
      id: 1,
      title: "Algebra 2, Volume 2, Student Edition",
      cover: "https://via.placeholder.com/80x100/4F46E5/FFFFFF?text=A2",
    },
    {
      id: 2,
      title: "Calculus Early Transcendentals",
      cover: "https://via.placeholder.com/80x100/10B981/FFFFFF?text=C",
    },
    {
      id: 3,
      title: "Physics for Scientists",
      cover: "https://via.placeholder.com/80x100/F59E0B/FFFFFF?text=P",
    },
  ];

  const textbooks = [
    {
      id: 1,
      title: "Algebra 1, Volume 2, Student Edition",
      author: "Go Math! Practice Fluency Workbook Grade 6, California 1st Edition",
      year: "2023",
      cover: "https://via.placeholder.com/60x80/6366F1/FFFFFF?text=A1",
    },
    {
      id: 2,
      title: "Carnegie Learning Algebra 1, Student Edition",
      author: "Carnegie Learning",
      year: "2022",
      cover: "https://via.placeholder.com/60x80/10B981/FFFFFF?text=CL",
    },
    {
      id: 3,
      title: "Geometry Common Core Edition",
      author: "Pearson Education",
      year: "2023",
      cover: "https://via.placeholder.com/60x80/8B5CF6/FFFFFF?text=G",
    },
    {
      id: 4,
      title: "Calculus Early Transcendentals",
      author: "James Stewart",
      year: "2021",
      cover: "https://via.placeholder.com/60x80/F59E0B/FFFFFF?text=C",
    },
    {
      id: 5,
      title: "Physics for Scientists and Engineers",
      author: "Raymond A. Serway",
      year: "2022",
      cover: "https://via.placeholder.com/60x80/EF4444/FFFFFF?text=P",
    },
  ];

  const handleBookPress = (book) => {
    navigation.navigate('SolutionSteps', { book });
  };

  const handleFilterPress = () => {
    Alert.alert('Filters', 'Filter options would be shown here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Textbook solutions</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title, author or expert"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.expertBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          <Text style={styles.expertText}>All solutions are written by experts</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Opened Books Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opened books</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.openedBooksContainer}>
            {openedBooks.map((book) => (
              <TouchableOpacity 
                key={book.id} 
                style={styles.openedBookItem}
                onPress={() => handleBookPress(book)}
              >
                <Image source={{ uri: book.cover }} style={styles.openedBookCover} />
                <Text style={styles.openedBookTitle} numberOfLines={2}>
                  {book.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Textbook List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Textbooks</Text>
          {textbooks.map((book) => (
            <TouchableOpacity 
              key={book.id} 
              style={styles.textbookItem}
              onPress={() => handleBookPress(book)}
            >
              <Image source={{ uri: book.cover }} style={styles.textbookCover} />
              <View style={styles.textbookInfo}>
                <Text style={styles.textbookTitle}>{book.title}</Text>
                <Text style={styles.textbookAuthor}>{book.author}</Text>
                <Text style={styles.textbookYear}>{book.year}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
        <Ionicons name="filter" size={20} color="#fff" />
        <Text style={styles.filterButtonText}>FILTERS</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSpacer: {
    width: 24,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  expertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expertText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  openedBooksContainer: {
    marginBottom: 8,
  },
  openedBookItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
  },
  openedBookCover: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  openedBookTitle: {
    fontSize: 12,
    color: '#111827',
    textAlign: 'center',
    fontWeight: '500',
  },
  textbookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textbookCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  textbookInfo: {
    flex: 1,
  },
  textbookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  textbookAuthor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  textbookYear: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  filterButton: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TextbookSolutionsScreen;
