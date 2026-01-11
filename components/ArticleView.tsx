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
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-axis-maroon z-[60] transition-all duration-150 ease-out shadow-sm"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Article Header - Centered and Spaced */}
      <header className="mb-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-[9px] font-sans font-bold uppercase tracking-[0.5em] text-axis-maroon bg-axis-maroon/5 px-4 py-2 rounded-sm">
            {article.category}
          </span>
          <div className="h-px w-8 bg-axis-maroon/20"></div>
          <span className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-gray-400">
            {readTime}
          </span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] text-axis-charcoal mb-8 tracking-tight">
          {article.title}
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-gray-500 leading-relaxed italic mb-10 max-w-4xl mx-auto">
          {article.subtitle}
        </p>

        <div className="flex flex-col items-center justify-center py-8 border-y border-axis-charcoal/5">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-gray-400">Authored by</span>
            <span className="font-serif font-bold text-2xl text-axis-charcoal decoration-axis-maroon/20 decoration-2 underline-offset-8 underline italic">{article.author.name}</span>
          </div>
          <time className="font-sans text-[10px] uppercase tracking-[0.4em] text-gray-400 mt-4 font-bold">{article.date}</time>
        </div>
      </header>

      {/* Main Reading Column - Decreased space-y by 60% (from 12 to 5) */}
      <div className="w-full">
        <div className="font-body text-[1.15rem] md:text-[1.3rem] leading-[1.85] text-gray-800 space-y-5 selection:bg-axis-maroon/10 selection:text-axis-charcoal">
          {article.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                const isContentNote = block.content.includes('Content Note:');
                if (isContentNote) {
                  return (
                    <div key={index} className="bg-axis-gray/50 border-l-[4px] border-axis-maroon p-10 my-6 shadow-sm ring-1 ring-black/5">
                      <p className="font-sans text-[10px] uppercase font-bold tracking-[0.5em] text-axis-maroon mb-4">Editorial Note</p>
                      <p className="italic text-gray-600 text-[1.05rem] leading-relaxed" dangerouslySetInnerHTML={{ __html: block.content }} />
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
                  <h2 key={index} className="font-serif text-3xl md:text-4xl font-black text-axis-navy pt-8 pb-2 tracking-tight leading-snug text-center italic">
                    {block.content}
                  </h2>
                );
              
              case 'impact-box':
                return <ImpactBox key={index} text={block.content} />;
              
              case 'list':
                return (
                   <div key={index} className="bg-white border-y border-axis-charcoal/10 p-12 md:p-20 my-10">
                     <h4 className="font-sans font-bold text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-10 text-center">Referenced Scholarly Sources</h4>
                     <ul className="space-y-4 font-body text-base text-gray-600 max-w-3xl mx-auto">
                        {block.items?.map((item, i) => (
                          <li key={i} className="group flex items-start gap-6 border-b border-axis-charcoal/5 pb-4 last:border-0">
                            <span className="font-serif italic font-bold text-axis-maroon/40 text-lg mt-0.5">{(i+1).toString().padStart(2, '0')}</span>
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
        <div className="mt-20 pt-12 border-t border-axis-charcoal/10 flex flex-col items-center">
          <div className="flex gap-16 mb-8">
             {['Twitter', 'LinkedIn', 'Copy Link'].map(social => (
               <button key={social} className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-axis-navy transition-all duration-300">
                 {social}
               </button>
             ))}
          </div>
          <div className="w-24 h-px bg-axis-charcoal/10 mb-8"></div>
          <div className="text-center">
            <h5 className="font-serif italic text-2xl text-axis-charcoal mb-6">In pursuit of scholarly clarity.</h5>
            <button className="group relative inline-flex items-center px-16 py-6 font-sans text-[11px] font-bold uppercase tracking-[0.5em] text-white bg-axis-navy overflow-hidden transition-all hover:bg-axis-maroon">
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