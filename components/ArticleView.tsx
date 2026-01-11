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
    <article className="animate-in fade-in duration-700">
      {/* Reading Progress Bar - Optimized for visibility */}
      <div 
        className="fixed top-0 left-0 h-1 bg-axis-maroon z-[60] transition-all duration-150 ease-out shadow-sm"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Article Header */}
      <header className="mb-16 md:mb-24 text-left md:text-center max-w-4xl mx-auto px-4 md:px-0">
        <div className="flex items-center md:justify-center gap-4 mb-10">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-axis-maroon bg-axis-maroon/5 px-3 py-1.5 rounded-sm">
            {article.category}
          </span>
          <div className="h-px w-6 bg-axis-maroon/20"></div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400">
            {readTime}
          </span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-axis-charcoal mb-10 tracking-tight">
          {article.title}
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-gray-500 leading-relaxed italic mb-12 max-w-3xl mx-auto">
          {article.subtitle}
        </p>

        <div className="flex flex-col items-center justify-center py-10 border-y border-axis-charcoal/5">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400">By</span>
            <span className="font-serif font-bold text-xl text-axis-charcoal decoration-axis-maroon/20 decoration-2 underline-offset-4 underline">{article.author.name}</span>
          </div>
          <time className="font-sans text-[10px] uppercase tracking-[0.25em] text-gray-400 mt-2">{article.date}</time>
        </div>
      </header>

      {/* Cover Image - Proportional Scaling */}
      {article.coverImage && (
        <figure className="mb-16 md:mb-28 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20 overflow-hidden bg-axis-gray shadow-2xl shadow-black/5">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-auto max-h-[75vh] object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-[2.5s] ease-in-out"
          />
          <figcaption className="bg-white/70 backdrop-blur-md py-4 px-8 text-right text-[9px] font-sans font-bold uppercase tracking-[0.4em] text-gray-500 border-t border-black/5">
            Photography & Digital Archive &copy; Axis Journal Media Group
          </figcaption>
        </figure>
      )}

      {/* Main Reading Column - Perfected Vertical Rhythm */}
      <div className="max-w-[720px] mx-auto px-4 md:px-0">
        <div className="font-body text-[1.15rem] md:text-[1.2rem] leading-[1.8] text-gray-800 space-y-10 selection:bg-axis-maroon/10 selection:text-axis-charcoal">
          {article.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                const isContentNote = block.content.includes('Content Note:');
                if (isContentNote) {
                  return (
                    <div key={index} className="bg-axis-gray/50 border-l-[3px] border-axis-maroon p-8 my-14 shadow-sm ring-1 ring-black/5">
                      <p className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-axis-maroon mb-4">Editorial Note</p>
                      <p className="italic text-gray-600 text-[1rem] leading-relaxed" dangerouslySetInnerHTML={{ __html: block.content }} />
                    </div>
                  );
                }
                
                const isFirstParagraph = index === 0 || (index === 1 && article.content[0].content.includes('Content Note:'));
                
                return (
                  <p 
                    key={index} 
                    className={`${isFirstParagraph ? 'drop-cap' : ''} antialiased`}
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                );
              
              case 'subheading':
                return (
                  <h2 key={index} className="font-serif text-2xl md:text-3xl font-black text-axis-navy pt-12 pb-2 tracking-tight leading-snug">
                    {block.content}
                  </h2>
                );
              
              case 'impact-box':
                return <ImpactBox key={index} text={block.content} />;
              
              case 'list':
                return (
                   <div key={index} className="bg-white border-y border-axis-charcoal/10 p-10 md:p-14 my-20">
                     <h4 className="font-sans font-bold text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-12 text-center">Referenced Scholarly Sources</h4>
                     <ul className="space-y-6 font-body text-base text-gray-600 max-w-2xl mx-auto">
                        {block.items?.map((item, i) => (
                          <li key={i} className="group flex items-start gap-5">
                            <span className="font-serif italic font-bold text-axis-maroon/40 text-sm mt-0.5">{(i+1).toString().padStart(2, '0')}</span>
                            <span 
                              className="group-hover:text-axis-navy transition-colors leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: item }}
                            />
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

        {/* Footer Engagement */}
        <div className="mt-40 pt-20 border-t border-axis-charcoal/5 flex flex-col items-center">
          <div className="flex gap-14 mb-16">
             {['Twitter', 'LinkedIn', 'Copy Link'].map(social => (
               <button key={social} className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-axis-navy transition-all duration-300">
                 {social}
               </button>
             ))}
          </div>
          <div className="w-16 h-px bg-axis-charcoal/10 mb-16"></div>
          <div className="text-center">
            <h5 className="font-serif italic text-xl text-axis-charcoal mb-8">Continuing the conversation.</h5>
            <button className="group relative inline-flex items-center px-12 py-5 font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-white bg-axis-navy overflow-hidden transition-all hover:bg-axis-maroon">
              <span className="relative z-10">Receive Next Dispatch</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-axis-maroon"></div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleView;