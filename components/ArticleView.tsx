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
      {/* Reading Progress Bar - Sits right below the sticky header */}
      <div 
        className="fixed top-[110px] md:top-[160px] lg:top-[178px] left-0 h-[3px] bg-axis-maroon z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Article Header Container */}
      <header className="mb-12 md:mb-20 text-center max-w-4xl mx-auto px-4 md:px-0">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-axis-maroon border border-axis-maroon/20 px-3 py-1">
            {article.category}
          </span>
          <div className="h-px w-8 bg-axis-maroon/20"></div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gray-400">
            {readTime}
          </span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] text-axis-charcoal mb-8 tracking-tight">
          {article.title}
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-gray-500 leading-relaxed italic mb-10 max-w-2xl mx-auto">
          {article.subtitle}
        </p>

        <div className="flex flex-col items-center justify-center py-8 border-y border-axis-charcoal/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-gray-400">Author</span>
            <span className="font-serif font-bold text-lg text-axis-charcoal border-b border-axis-maroon/20">{article.author.name}</span>
          </div>
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-2">{article.date}</span>
        </div>
      </header>

      {/* Cover Image - Adjusted for better visual balance */}
      {article.coverImage && (
        <figure className="mb-16 md:mb-24 -mx-4 md:-mx-8 lg:-mx-12 overflow-hidden shadow-2xl shadow-black/5">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-auto object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-[2s]"
          />
          <figcaption className="bg-white/50 backdrop-blur-sm py-3 px-6 text-right text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-gray-400">
            Digital Archive | Axis Journal Visualization
          </figcaption>
        </figure>
      )}

      {/* Main Reading Column - Perfected Typography */}
      <div className="max-w-[700px] mx-auto px-4 md:px-0">
        <div className="font-body text-lg md:text-[1.2rem] leading-[1.85] text-axis-charcoal space-y-10 selection:bg-axis-maroon/10">
          {article.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                const isContentNote = block.content.startsWith('Content Note:');
                if (isContentNote) {
                  return (
                    <div key={index} className="bg-axis-gray border-l-4 border-axis-maroon p-8 my-12 shadow-sm">
                      <p className="font-sans text-xs uppercase font-bold tracking-widest text-axis-maroon mb-2">Editor's Note</p>
                      <p className="italic text-gray-600 text-base leading-relaxed">{block.content}</p>
                    </div>
                  );
                }
                
                // Professional Drop Cap on the first substantive paragraph
                const isFirstParagraph = index === 0 || (index === 1 && article.content[0].content.startsWith('Content Note:'));
                
                return (
                  <p key={index} className={`${isFirstParagraph ? 'drop-cap' : ''} text-gray-800 antialiased`}>
                    {block.content}
                  </p>
                );
              
              case 'subheading':
                return (
                  <h2 key={index} className="font-serif text-2xl md:text-3xl font-black text-axis-navy pt-14 pb-4 tracking-tight leading-tight">
                    {block.content}
                  </h2>
                );
              
              case 'impact-box':
                return <ImpactBox key={index} text={block.content} />;
              
              case 'list':
                return (
                   <div key={index} className="bg-white border border-axis-charcoal/5 p-10 my-16 shadow-inner">
                     <h4 className="font-sans font-bold text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-10 border-b border-axis-charcoal/5 pb-4">Citations & Scholarly Resources</h4>
                     <ul className="space-y-6 font-body text-base text-gray-600">
                        {block.items?.map((item, i) => (
                          <li key={i} className="group flex items-start gap-4">
                            <span className="font-serif italic font-bold text-axis-maroon opacity-40 text-sm">{(i+1).toString().padStart(2, '0')}.</span>
                            <span className="group-hover:text-axis-navy cursor-pointer transition-colors border-b border-transparent group-hover:border-axis-navy/20 leading-relaxed">
                              {item}
                            </span>
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

        {/* Article Footer / Engagement */}
        <div className="mt-32 pt-12 border-t border-axis-charcoal/5 flex flex-col items-center">
          <div className="flex gap-10 mb-12">
             {['Twitter', 'LinkedIn', 'Email'].map(social => (
               <button key={social} className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-axis-maroon transition-all hover:scale-105">
                 {social}
               </button>
             ))}
          </div>
          <div className="w-12 h-px bg-axis-charcoal/10 mb-12"></div>
          <button className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-axis-navy border-2 border-axis-navy px-10 py-4 hover:bg-axis-navy hover:text-white transition-all transform active:scale-95">
            Receive Next Dispatch
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleView;