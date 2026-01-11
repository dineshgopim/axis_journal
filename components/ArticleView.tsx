import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import ImpactBox from './ImpactBox';
import { calculateReadTime } from '../utils/readingTime';

interface ArticleViewProps {
  article: Article;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  const readTime = calculateReadTime(article.content);

  return (
    <article className="animate-in fade-in duration-1000">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-[64px] md:top-[128px] left-0 h-1 bg-axis-maroon z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Article Header */}
      <header className="mb-10 md:mb-16 text-center max-w-3xl mx-auto px-4 md:px-0">
        <div className="inline-flex items-center space-x-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-axis-maroon mb-6">
          <span className="bg-axis-maroon text-white px-2 py-0.5 rounded-sm">{article.category}</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500">{readTime}</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-axis-charcoal mb-6 md:mb-8 tracking-tight">
          {article.title}
        </h1>
        
        <p className="font-body text-lg md:text-2xl text-gray-600 leading-relaxed italic mb-8 md:mb-12 max-w-2xl mx-auto border-l-2 md:border-l-0 border-axis-navy/10 pl-4 md:pl-0">
          {article.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-xs md:text-sm font-serif border-y border-gray-200 py-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">By</span>
            <span className="font-bold text-axis-charcoal underline decoration-axis-maroon/30 underline-offset-4">{article.author.name}</span>
          </div>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="text-gray-500">{article.date}</span>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <figure className="mb-12 md:mb-20 -mx-4 md:-mx-8 lg:-mx-16 relative">
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <figcaption className="text-right px-4 md:px-8 text-[9px] text-gray-400 mt-2 font-sans uppercase tracking-[0.2em]">
            Archival Footage / Axis Journal
          </figcaption>
        </figure>
      )}

      {/* Article Content */}
      <div className="font-body text-lg md:text-xl leading-[1.85] text-axis-charcoal space-y-8 md:space-y-10 max-w-prose mx-auto px-1 md:px-0">
        {article.content.map((block, index) => {
          switch (block.type) {
            case 'paragraph':
              if (index === 0 || (index === 1 && article.content[0].content.startsWith('Content Note:'))) {
                 const isContentNote = block.content.startsWith('Content Note:');
                 if (isContentNote) {
                   return <p key={index} className="italic text-gray-500 text-sm md:text-base border-l-2 border-axis-maroon bg-white p-6 shadow-sm mb-12">{block.content}</p>;
                 }
                 return (
                  <p key={index} className="first-letter:float-left first-letter:text-8xl first-letter:font-bold first-letter:font-serif first-letter:text-axis-charcoal first-letter:mr-4 first-letter:mt-1 first-letter:leading-[0.7] drop-cap">
                    {block.content}
                  </p>
                 );
              }
              return <p key={index}>{block.content}</p>;
            
            case 'subheading':
              return (
                <h2 key={index} className="font-serif text-2xl md:text-4xl font-black text-axis-navy pt-12 pb-4 tracking-tight border-b-4 border-axis-navy/5">
                  {block.content}
                </h2>
              );
            
            case 'impact-box':
              return <ImpactBox key={index} text={block.content} />;
            
            case 'list':
              return (
                 <div key={index} className="bg-white/50 border border-gray-100 p-8 my-12">
                   <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Further Reading & Sources</h4>
                   <ul className="space-y-3 font-body text-base text-gray-600">
                      {block.items?.map((item, i) => (
                        <li key={i} className="group flex items-start">
                          <span className="mr-3 text-axis-maroon opacity-50 font-bold">0{i+1}.</span>
                          <span className="group-hover:text-axis-navy cursor-pointer transition-colors border-b border-transparent group-hover:border-axis-navy/20">{item}</span>
                        </li>
                      ))}
                   </ul>
                 </div>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* Author/Footer Section */}
      <div className="mt-20 pt-12 border-t border-gray-200">
        <div className="max-w-prose mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex space-x-4">
               {['Twitter', 'Facebook', 'LinkedIn', 'Email'].map(social => (
                 <button key={social} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-axis-maroon transition-colors">
                   {social}
                 </button>
               ))}
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-axis-navy border border-axis-navy/20 px-3 py-1 hover:bg-axis-navy hover:text-white transition-all">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleView;