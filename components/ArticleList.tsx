import React from 'react';
import { Article } from '../types';

interface ArticleListProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onSelectArticle }) => {
  // Feature the first article
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Featured Article */}
      <div 
        onClick={() => onSelectArticle(featuredArticle)}
        className="mb-16 cursor-pointer group border-b border-gray-200 pb-12"
      >
         <div className="mb-4 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-axis-maroon bg-axis-maroon/5 px-2 py-1">
              Latest Cover Story
            </span>
         </div>
        <h2 className="font-serif text-5xl md:text-6xl font-bold text-center text-axis-charcoal mb-6 group-hover:text-axis-navy transition-colors leading-tight">
          {featuredArticle.title}
        </h2>
        <div className="md:flex gap-8 items-start">
           <div className="flex-1 order-2 md:order-1">
              <p className="font-body text-xl text-gray-600 leading-relaxed mb-6">
                {featuredArticle.subtitle}
              </p>
              <div className="text-sm font-serif font-bold text-axis-navy">
                Read Full Story &rarr;
              </div>
           </div>
           {featuredArticle.coverImage && (
             <div className="flex-[2] order-1 md:order-2 mb-6 md:mb-0 overflow-hidden">
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.title}
                  className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
             </div>
           )}
        </div>
      </div>

      {/* Remaining Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {remainingArticles.map((article) => (
          <div 
            key={article.id} 
            onClick={() => onSelectArticle(article)}
            className="cursor-pointer group flex flex-col h-full"
          >
            {article.coverImage && (
              <div className="overflow-hidden mb-6 h-64 border-b border-gray-200">
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-axis-maroon mb-3">
              <span>{article.category}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-axis-charcoal mb-3 group-hover:text-axis-navy transition-colors leading-tight">
              {article.title}
            </h3>
            <p className="font-body text-gray-600 mb-4 flex-grow line-clamp-3">
              {article.subtitle}
            </p>
            <div className="text-xs font-serif text-gray-400 mt-auto">
              {article.date} • By {article.author.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;