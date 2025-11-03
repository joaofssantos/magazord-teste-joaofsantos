import { useEffect } from 'react';

/**
 * Custom hook to update document title
 * @param title - The title to set
 * @param defaultTitle - Fallback title when component unmounts
 */
export const useDocumentTitle = (
  title: string,
  defaultTitle: string = 'GitHub Profile Viewer'
) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = defaultTitle || previousTitle;
    };
  }, [title, defaultTitle]);
};
