export type ContentBlockType = 'paragraph' | 'heading' | 'impact-box' | 'subheading' | 'image' | 'list';

export interface ContentBlock {
  type: ContentBlockType;
  content: string;
  items?: string[]; // For list items
  caption?: string; // For images
}

export interface Author {
  name: string;
  bio: string;
  imageUrl?: string;
  role: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: Author;
  date: string;
  category: string;
  content: ContentBlock[];
  coverImage?: string;
}