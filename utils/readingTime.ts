import { ContentBlock } from '../types';

/**
 * Calculates a more accurate reading time for Axis Journal articles.
 * Standardizes word count by stripping HTML tags and including list content.
 */
export const calculateReadTime = (blocks: ContentBlock[]): string => {
  const wordsPerMinute = 225; // Adjusted for academic/journalistic density
  let totalWords = 0;

  // Helper to strip HTML tags from strings (e.g., <strong>, <a>)
  const stripHtml = (text: string) => text.replace(/<[^>]*>?/gm, '');

  blocks.forEach(block => {
    if (!block.content && (!block.items || block.items.length === 0)) return;

    if (block.type === 'paragraph' || block.type === 'impact-box' || block.type === 'subheading') {
      const cleanContent = stripHtml(block.content).trim();
      const words = cleanContent.split(/\s+/).filter(word => word.length > 0);

      // Requirement: Ignore short headings/subheadings that don't add significant reading time
      if (block.type === 'subheading' && words.length < 4) {
        return;
      }

      totalWords += words.length;
    } 
    
    // Account for list items which were previously skipped
    else if (block.type === 'list' && block.items) {
      block.items.forEach(item => {
        const cleanItem = stripHtml(item).trim();
        const words = cleanItem.split(/\s+/).filter(word => word.length > 0);
        totalWords += words.length;
      });
    }
  });

  const minutes = Math.ceil(totalWords / wordsPerMinute);
  
  // Ensure we always show at least 1 minute
  const displayMinutes = Math.max(1, minutes);
  
  return `${displayMinutes} min read`;
};