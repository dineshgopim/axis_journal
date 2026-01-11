import React, { useEffect } from 'react';
import { Article } from '../types';
import ImpactBox from './ImpactBox';
import { calculateReadTime } from '../utils/readingTime';

interface ArticleViewProps {
  article: Article;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article }) => {
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.id]);

  const readTime = calculateReadTime(article.content);

  return (
    <article className="animate-in fade-in duration-700">
      {/* Article Header */}
      <header className="mb-10 text-center max-w-2xl mx-auto">
        <div className="flex justify-center items-center space-x-2 text-xs font-bold uppercase tracking-widest text-axis-maroon mb-4">
          <span>{article.category}</span>
          <span className="text-gray-300">•</span>
          <span>{readTime}</span>
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-axis-charcoal mb-6">
          {article.title}
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-gray-600 leading-relaxed italic mb-8">
          {article.subtitle}
        </p>

        <div className="flex justify-center items-center space-x-2 text-sm font-serif border-t border-b border-gray-200 py-4">
          <span className="text-gray-500">By</span>
          <span className="font-bold text-axis-charcoal">{article.author.name}</span>
          <span className="text-gray-300 mx-2">|</span>
          <span className="text-gray-500">{article.date}</span>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <figure className="mb-12 -mx-4 md:-mx-0">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-[400px] md:h-[500px] object-cover grayscale-[20%]"
          />
          <figcaption className="text-center text-xs text-gray-400 mt-2 font-sans uppercase tracking-widest">
            Illustration via Unsplash
          </figcaption>
        </figure>
      )}

      {/* Article Content */}
      <div className="font-body text-lg md:text-[1.15rem] leading-[1.8] text-axis-charcoal space-y-6">
        {article.content.map((block, index) => {
          switch (block.type) {
            case 'paragraph':
              // Check if it's the first paragraph to apply drop-cap
              if (index === 0 && !block.content.startsWith('Content Note:')) {
                 return (
                  <p key={index} className="first-letter:float-left first-letter:text-7xl first-letter:font-bold first-letter:font-serif first-letter:text-axis-charcoal first-letter:mr-3 first-letter:mt-[-10px] first-letter:leading-[0.8]">
                    {block.content}
                  </p>
                 );
              }
              // Special styling for Content Note
              if (block.content.startsWith('Content Note:')) {
                return <p key={index} className="italic text-gray-500 text-base border-l-4 border-gray-300 pl-4">{block.content}</p>;
              }
              return <p key={index}>{block.content}</p>;
            
            case 'subheading':
              return (
                <h2 key={index} className="font-serif text-2xl md:text-3xl font-bold text-axis-navy mt-10 mb-4 border-b-2 border-axis-navy/10 pb-2 inline-block">
                  {block.content}
                </h2>
              );
            
            case 'impact-box':
              return <ImpactBox key={index} text={block.content} />;
            
            case 'list':
              return (
                 <ul key={index} className="space-y-2 mt-2 mb-8 font-body text-base text-gray-600">
                    {block.items?.map((item, i) => (
                      <li key={i} className="border-b border-gray-100 py-2 hover:text-axis-maroon transition-colors cursor-pointer flex items-start">
                        <span className="mr-2 opacity-50">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                 </ul>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* Footer / Share */}
      <div className="mt-16 pt-8 border-t border-gray-300">
        <div className="flex justify-center space-x-6">
           <button className="w-10 h-10 rounded-full bg-gray-200 hover:bg-axis-navy hover:text-white flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
           </button>
           <button className="w-10 h-10 rounded-full bg-gray-200 hover:bg-axis-navy hover:text-white flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
           </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleView;