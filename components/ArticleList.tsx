import React from 'react';
import { Article } from '../types';

interface ArticleListProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onSelectArticle }) => {
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Featured Article - High Impact on Laptop, Compact on Mobile */}
      <div 
        onClick={() => onSelectArticle(featuredArticle)}
        className="mb-12 md:mb-24 cursor-pointer group"
      >
        <div className="text-center mb-8">
           <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-axis-maroon border-b border-axis-maroon mb-2">
             Cover Story
           </span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
           <div className="w-full lg:w-3/5 order-1 overflow-hidden">
              <img 
                src={featuredArticle.coverImage} 
                alt={featuredArticle.title}
                className="w-full aspect-[16/9] object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
           </div>
           <div className="w-full lg:w-2/5 order-2 text-center lg:text-left">
              <h2 className="font-serif text-3xl md:text-5xl font-black text-axis-charcoal mb-4 group-hover:text-axis-navy transition-colors leading-[1.1] tracking-tighter">
                {featuredArticle.title}
              </h2>
              <p className="font-body text-base md:text-lg text-gray-600 mb-6 line-clamp-3">
                {featuredArticle.subtitle}
              </p>
              <div className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-axis-navy border-b-2 border-axis-navy/20 pb-1 group-hover:border-axis-maroon transition-colors">
                Continue Reading
              </div>
           </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 mb-16" />

      {/* Grid - 1 col mobile, 2 col laptop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {remainingArticles.length > 0 ? (
          remainingArticles.map((article) => (
            <div 
              key={article.id} 
              onClick={() => onSelectArticle(article)}
              className="cursor-pointer group flex flex-col h-full"
            >
              {article.coverImage && (
                <div className="overflow-hidden mb-6 aspect-[16/10] border-b border-gray-100">
                  <img 
                    src={article.coverImage} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>
              )}
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-axis-maroon mb-3">
                <span className="bg-axis-maroon/10 px-1.5 py-0.5">{article.category}</span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-axis-charcoal mb-3 group-hover:text-axis-navy transition-colors leading-tight tracking-tight">
                {article.title}
              </h3>
              <p className="font-body text-sm text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                {article.subtitle}
              </p>
              <div className="flex items-center justify-between text-[10px] font-serif text-gray-400 pt-4 border-t border-gray-100">
                <span>{article.date}</span>
                <span className="font-bold text-axis-charcoal">By {article.author.name}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center font-serif italic text-gray-400">
            More dispatches coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;