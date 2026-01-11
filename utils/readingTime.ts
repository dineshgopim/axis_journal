import { ContentBlock } from '../types';

export const calculateReadTime = (blocks: ContentBlock[]): string => {
  const wordsPerMinute = 200;
  let totalWords = 0;

  blocks.forEach(block => {
    totalWords += block.content.split(/\s+/).length;
  });

  const minutes = Math.ceil(totalWords / wordsPerMinute);
  return `${minutes} min read`;
};