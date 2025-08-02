import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CameraScanner from '../components/CameraScanner';
import BookCard from '../components/BookCard';
import { BooksApiService } from '../services/booksApi';
import { Book, ScanResult, DetectedBook } from '../types';

export default function ScannerScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedBooks, setDetectedBooks] = useState<DetectedBook[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleScanResult = async (result: ScanResult) => {
    setIsLoading(true);
    
    try {
      let book: Book | null = null;
      
      if (result.type === 'barcode') {
        // Try to find book by ISBN
        book = await BooksApiService.searchByISBN(result.value);
      } else if (result.type === 'text') {
        // Try to find book by title
        const books = await BooksApiService.searchByTitle(result.value);
        book = books[0] || null;
      }
      
      if (book) {
        const newDetectedBook: DetectedBook = {
          book,
          scanResult: result,
          isHighlighted: false,
        };
        
        // Check if book already exists
        const existingIndex = detectedBooks.findIndex(
          (detected) => detected.book.id === book!.id
        );
        
        if (existingIndex === -1) {
          setDetectedBooks(prev => [...prev, newDetectedBook]);
        }
      } else {
        Alert.alert(
          'Book Not Found',
          `Could not find book information for: ${result.value}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error processing scan result:', error);
      Alert.alert('Error', 'Failed to process scan result');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    try {
      const results = await BooksApiService.searchByTitle(searchQuery);
      setSearchResults(results);
      
      // Highlight matching books in detected list
      setDetectedBooks(prev => 
        prev.map(detected => ({
          ...detected,
          isHighlighted: results.some(result => result.id === detected.book.id)
        }))
      );
    } catch (error) {
      console.error('Error searching books:', error);
      Alert.alert('Error', 'Failed to search for books');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookPress = (book: Book) => {
    // Navigate to book details (implement navigation later)
    Alert.alert('Book Details', `${book.title} by ${book.authors?.join(', ')}`);
  };

  const clearResults = () => {
    setDetectedBooks([]);
    setSearchResults([]);
    setSearchQuery('');
  };

  const renderBookItem = ({ item }: { item: DetectedBook }) => (
    <BookCard
      book={item.book}
      onPress={() => handleBookPress(item.book)}
      isHighlighted={item.isHighlighted}
    />
  );

  const renderSearchResult = ({ item }: { item: Book }) => (
    <BookCard
      book={item}
      onPress={() => handleBookPress(item)}
    />
  );

  return (
  
    <View style={styles.container}>
      {isScanning ? (
          <Text>Hello World</Text>
        // <CameraScanner
        //   onScanResult={handleScanResult}
        //   onClose={() => setIsScanning(false)}
        // />
      ) : (
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Book Scanner</Text>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => setIsScanning(true)}
            >
              <MaterialIcons name="camera-alt" size={24} color="white" />
              <Text style={styles.scanButtonText}>Scan</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a book..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <MaterialIcons name="search" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>

          {/* Clear Button */}
          {(detectedBooks.length > 0 || searchResults.length > 0) && (
            <TouchableOpacity style={styles.clearButton} onPress={clearResults}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          )}

          {/* Results */}
          {searchResults.length > 0 && (
            <View style={styles.resultsSection}>
              <Text style={styles.sectionTitle}>Search Results</Text>
              <FlatList
                data={searchResults}
                renderItem={renderSearchResult}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          {detectedBooks.length > 0 && (
            <View style={styles.resultsSection}>
              <Text style={styles.sectionTitle}>
                Detected Books ({detectedBooks.length})
              </Text>
              <FlatList
                data={detectedBooks}
                renderItem={renderBookItem}
                keyExtractor={(item) => item.book.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          {detectedBooks.length === 0 && searchResults.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialIcons name="camera-alt" size={64} color="#ccc" />
              <Text style={styles.emptyStateText}>
                Point your camera at books to scan them
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Or search for a specific book above
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scanButtonText: {
    color: 'white',
    marginLeft: 4,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginRight: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  clearButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  resultsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
}); 