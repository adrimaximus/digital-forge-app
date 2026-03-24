
import { useState, useEffect } from 'react';
import { safeStorage } from '../utils/storageUtils';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const storedBookmarks = safeStorage.getItem('bookmarks');
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks));
      } catch (e) {
        console.error('Error parsing bookmarks:', e);
      }
    }
  }, []);

  useEffect(() => {
    safeStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (itemId: string) => {
    setBookmarks(prevBookmarks => {
      if (prevBookmarks.includes(itemId)) {
        return prevBookmarks.filter(id => id !== itemId);
      } else {
        return [...prevBookmarks, itemId];
      }
    });
  };

  return {
    bookmarks,
    toggleBookmark
  };
};
