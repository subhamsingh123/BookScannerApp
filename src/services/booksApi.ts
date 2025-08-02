import { Book } from '../types';

const GOOGLE_BOOKS_API_BASE = 'https://www.googleapis.com/books/v1';

export class BooksApiService {
  private static async makeRequest(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${GOOGLE_BOOKS_API_BASE}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Books API request failed:', error);
      throw error;
    }
  }

  static async searchByISBN(isbn: string): Promise<Book | null> {
    try {
      const data = await this.makeRequest(`/volumes?q=isbn:${isbn}`);
      
      if (data.items && data.items.length > 0) {
        const volume = data.items[0];
        return this.parseBookFromVolume(volume);
      }
      return null;
    } catch (error) {
      console.error('Error searching by ISBN:', error);
      return null;
    }
  }

  static async searchByTitle(title: string): Promise<Book[]> {
    try {
      const data = await this.makeRequest(`/volumes?q=${encodeURIComponent(title)}&maxResults=10`);
      
      if (data.items) {
        return data.items.map((volume: any) => this.parseBookFromVolume(volume));
      }
      return [];
    } catch (error) {
      console.error('Error searching by title:', error);
      return [];
    }
  }

  static async getBookDetails(bookId: string): Promise<Book | null> {
    try {
      const data = await this.makeRequest(`/volumes/${bookId}`);
      return this.parseBookFromVolume(data);
    } catch (error) {
      console.error('Error getting book details:', error);
      return null;
    }
  }

  private static parseBookFromVolume(volume: any): Book {
    const volumeInfo = volume.volumeInfo;
    const industryIdentifiers = volumeInfo.industryIdentifiers || [];
    const isbn = industryIdentifiers.find((id: any) => id.type === 'ISBN_13')?.identifier ||
                 industryIdentifiers.find((id: any) => id.type === 'ISBN_10')?.identifier;

    return {
      id: volume.id,
      title: volumeInfo.title || 'Unknown Title',
      authors: volumeInfo.authors || ['Unknown Author'],
      description: volumeInfo.description || '',
      coverImage: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail,
      rating: volumeInfo.averageRating,
      isbn,
      publishedDate: volumeInfo.publishedDate,
      pageCount: volumeInfo.pageCount,
    };
  }
} 