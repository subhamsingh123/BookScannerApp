import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onPress?: () => void;
  isHighlighted?: boolean;
}

export default function BookCard({ book, onPress, isHighlighted = false }: BookCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isHighlighted && styles.highlighted,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {book.coverImage ? (
          <Image
            source={{ uri: book.coverImage }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialIcons name="book" size={40} color="#ccc" />
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        
        <Text style={styles.author} numberOfLines={1}>
          {book.authors?.join(', ') || 'Unknown Author'}
        </Text>
        
        {book.rating && (
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{book.rating.toFixed(1)}</Text>
          </View>
        )}
        
        {book.isbn && (
          <Text style={styles.isbn}>ISBN: {book.isbn}</Text>
        )}
      </View>
      
      {isHighlighted && (
        <View style={styles.highlightIndicator}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
    position: 'relative',
  },
  highlighted: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8E9',
  },
  imageContainer: {
    marginRight: 12,
  },
  coverImage: {
    width: 60,
    height: 80,
    borderRadius: 6,
  },
  placeholderImage: {
    width: 60,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  isbn: {
    fontSize: 11,
    color: '#999',
  },
  highlightIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
}); 