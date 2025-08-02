import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface HomeScreenProps {
  onNavigateToScanner: () => void;
}

export default function HomeScreen({ onNavigateToScanner }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons name="library-books" size={80} color="#007AFF" />
          <Text style={styles.title}>Book Scanner</Text>
          <Text style={styles.subtitle}>
            Scan books, find information, and build your library
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <MaterialIcons name="camera-alt" size={32} color="#4CAF50" />
            <Text style={styles.featureTitle}>Scan Barcodes</Text>
            <Text style={styles.featureText}>
              Point your camera at book barcodes to instantly get book details
            </Text>
          </View>

          <View style={styles.feature}>
            <MaterialIcons name="search" size={32} color="#FF9800" />
            <Text style={styles.featureTitle}>Search Books</Text>
            <Text style={styles.featureText}>
              Search for specific books and find them in your scanned collection
            </Text>
          </View>

          <View style={styles.feature}>
            <MaterialIcons name="star" size={32} color="#FFD700" />
            <Text style={styles.featureTitle}>Get Details</Text>
            <Text style={styles.featureText}>
              View ratings, descriptions, and cover images from Google Books
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={onNavigateToScanner}>
          <MaterialIcons name="camera-alt" size={24} color="white" />
          <Text style={styles.startButtonText}>Start Scanning</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    flex: 1,
    justifyContent: 'space-around',
  },
  feature: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 