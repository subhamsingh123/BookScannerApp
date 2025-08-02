# Book Scanner App

A React Native app that uses the device camera to scan book barcodes and spines, then fetches detailed book information from Google Books API.

## Features

### 📱 Core Functionality
- **Barcode Scanning**: Scan book ISBN barcodes for instant book lookup
- **Text Recognition**: Detect book titles from spines and covers (future enhancement)
- **Book Information**: Fetch detailed book data including title, author, description, cover image, and ratings
- **Search & Highlight**: Search for specific books and highlight them if found in the scanned collection
- **Real-time Processing**: Instant book information retrieval as you scan

### 🎯 Key Features
- **Multi-book Recognition**: Scan multiple books in a stack
- **Search Functionality**: Search for specific books by title
- **Book Highlighting**: Highlight searched books in the detected list
- **Beautiful UI**: Modern, intuitive interface with smooth animations
- **Offline Support**: Basic offline functionality for previously scanned books

## Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Camera**: `expo-barcode-scanner` for barcode detection
- **API**: Google Books API for book information
- **Icons**: `@expo/vector-icons` for modern icon support
- **TypeScript**: Full type safety throughout the app

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for development)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BookScannerApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web (limited functionality)
   npm run web
   ```

## Usage

### Scanning Books
1. Open the app and tap "Start Scanning"
2. Point your camera at a book's barcode (ISBN)
3. The app will automatically detect the barcode and fetch book information
4. Book details will appear in the "Detected Books" section

### Searching Books
1. Use the search bar to look for specific books
2. Type a book title and tap the search icon
3. Results will appear in the "Search Results" section
4. If a searched book is in your detected list, it will be highlighted

### Features in Action
- **Real-time Scanning**: Camera continuously scans for barcodes
- **Instant Results**: Book information appears immediately after scanning
- **Duplicate Prevention**: Same book won't be added multiple times
- **Error Handling**: Graceful handling of network errors and invalid barcodes

## API Integration

The app uses the **Google Books API** to fetch book information:

- **ISBN Lookup**: Direct ISBN to book information mapping
- **Title Search**: Fallback search by book title
- **Rich Data**: Cover images, ratings, descriptions, author information

### API Endpoints Used
- `GET /volumes?q=isbn:{isbn}` - Search by ISBN
- `GET /volumes?q={title}` - Search by title
- `GET /volumes/{id}` - Get detailed book information

## Project Structure

```
src/
├── components/
│   ├── CameraScanner.tsx    # Camera and barcode scanning
│   └── BookCard.tsx         # Book information display
├── screens/
│   ├── HomeScreen.tsx       # Welcome screen
│   └── ScannerScreen.tsx    # Main scanning interface
├── services/
│   └── booksApi.ts          # Google Books API integration
├── types/
│   └── index.ts             # TypeScript type definitions
└── utils/                   # Utility functions (planned)
```

## Dependencies

### Core Dependencies
- `expo`: ~53.0.0 - React Native framework
- `expo-barcode-scanner`: ^13.0.1 - Barcode scanning functionality
- `expo-status-bar`: ~2.2.3 - Status bar management
- `@expo/vector-icons`: ^14.0.0 - Modern icon library
- `react`: 19.0.0 - React core
- `react-native`: 0.79.5 - React Native core

### Development Dependencies
- `typescript`: ~5.8.3 - Type safety
- `@types/react`: ~19.0.10 - React type definitions
- `@babel/core`: ^7.25.2 - JavaScript compiler

## Recent Updates

### ✅ **Deprecated Code Removal**
- Removed `react-native-vector-icons` (deprecated) → Replaced with `@expo/vector-icons`
- Removed `expo-camera` (unused) → Using only `expo-barcode-scanner`
- Removed `@react-navigation/*` packages (unused) → Simplified navigation
- Removed `react-native-paper` (unused) → Using native components
- Removed `expo-font` and `expo-splash-screen` (unused)
- Removed `react-native-safe-area-context` (unused)

### 🚀 **Performance Improvements**
- Reduced bundle size by removing unused dependencies
- Simplified component structure
- Updated to latest compatible versions
- Improved TypeScript configuration

## Future Enhancements

### Phase 2: Advanced Features
- **Text Recognition**: OCR for book spines and covers
- **Voice Search**: Voice commands for book search
- **User Library**: Save and organize scanned books
- **Book Details Screen**: Detailed book information view
- **Offline Mode**: Cache book data for offline access

### Phase 3: Advanced AI
- **Cover Recognition**: AI-powered book cover matching
- **Smart Recommendations**: Book suggestions based on scanned collection
- **Social Features**: Share book collections with friends
- **Reading Lists**: Create and manage reading lists

## Permissions

The app requires the following permissions:
- **Camera**: For scanning book barcodes and spines
- **Internet**: For fetching book information from Google Books API

## Troubleshooting

### Common Issues

1. **Camera not working**
   - Ensure camera permissions are granted
   - Check if device supports barcode scanning
   - Try restarting the app

2. **Book information not found**
   - Verify the barcode is clear and well-lit
   - Check internet connection
   - Some books may not be in Google Books database

3. **App crashes on startup**
   - Clear app cache and restart
   - Ensure all dependencies are installed
   - Check Expo SDK version compatibility

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Books API for book information
- Expo team for the excellent development platform
- React Native community for the amazing ecosystem 