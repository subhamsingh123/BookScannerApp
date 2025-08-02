export interface Book {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  coverImage?: string;
  rating?: number;
  isbn?: string;
  publishedDate?: string;
  pageCount?: number;
}

export interface ScanResult {
  type: 'barcode' | 'text' | 'cover';
  value: string;
  confidence: number;
  bounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface DetectedBook {
  book: Book;
  scanResult: ScanResult;
  isHighlighted: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  Scanner: undefined;
  BookDetails: { book: Book };
  Search: undefined;
  Library: undefined;
};

export interface CameraPermission {
  granted: boolean;
  canAskAgain: boolean;
} 