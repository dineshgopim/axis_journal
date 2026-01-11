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
    <div className="animate-in fade-in duration-1000">
      {/* 
        FEATURED ARTICLE "TYPOGRAPHIC STAGE" 
        Decreased title and subtitle font sizes by 10%.
      */}
      <section 
        className="relative w-full py-24 md:py-32 mb-16 overflow-hidden group cursor-pointer border-b border-axis-charcoal/10"
        onClick={() => onSelectArticle(featuredArticle)}
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-axis-maroon">
              Featured Dispatch
            </span>
            <div className="h-px w-12 bg-axis-maroon/20"></div>
          </div>
          
          <h2 className="font-serif text-[1.68rem] md:text-[2.7rem] lg:text-[3.37rem] font-black text-axis-charcoal leading-[1.1] tracking-tight group-hover:text-axis-navy transition-colors mb-8">
            {featuredArticle.title}
          </h2>
          
          <p className="font-body text-[1rem] md:text-[1.12rem] text-gray-500 leading-relaxed max-w-2xl opacity-90 mb-12 italic">
            {featuredArticle.subtitle}
          </p>

          <button className="text-[11px] font-bold uppercase tracking-[0.4em] text-axis-navy border-2 border-axis-navy px-12 py-5 hover:bg-axis-navy hover:text-white transition-all transform active:scale-95 shadow-lg shadow-axis-navy/5">
            Read Full Investigation
          </button>
        </div>

        {/* Branding Watermark moved to center background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none select-none">
          <span className="font-serif text-[18rem] font-black text-axis-charcoal opacity-[0.03] leading-none uppercase">
            Axis
          </span>
        </div>
      </section>

      {/* SECONDARY FEED SECTION - Purely Typographic */}
      <section className="pb-24">
        <div className="flex items-center gap-8 mb-20">
          <div className="h-px flex-grow bg-axis-charcoal/10"></div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.6em] text-gray-400 whitespace-nowrap">
            Curated Insights
          </h3>
          <div className="h-px flex-grow bg-axis-charcoal/10"></div>
        </div>

        <div className="space-y-24">
          {remainingArticles.length > 0 ? (
            remainingArticles.map((article) => (
              <article 
                key={article.id} 
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer border-b border-axis-charcoal/5 pb-24 last:border-0"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-axis-maroon bg-axis-maroon/5 px-3 py-1">
                      {article.category}
                    </span>
                    <div className="h-px w-4 bg-axis-maroon/20"></div>
                    <span className="text-[10px] font-serif italic text-gray-400">{article.date}</span>
                  </div>
                  
                  <h4 className="font-serif text-3xl md:text-4xl font-bold text-axis-charcoal leading-tight mb-6 group-hover:text-axis-navy transition-colors tracking-tight">
                    {article.title}
                  </h4>
                  
                  <p className="font-body text-lg text-gray-500 leading-relaxed mb-8 max-w-3xl">
                    {article.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border border-axis-navy/20 flex items-center justify-center font-serif text-xs text-axis-navy font-bold">
                          {article.author.name.charAt(0)}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-axis-charcoal opacity-80">
                          {article.author.name}
                        </span>
                    </div>
                    <span className="text-[10px] font-bold text-axis-navy group-hover:text-axis-maroon transition-colors underline underline-offset-8 decoration-axis-navy/10 group-hover:decoration-axis-maroon/50 tracking-widest uppercase">
                      Open Report &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="py-32 text-center border-y border-gray-100">
              <p className="font-serif italic text-gray-400 text-xl tracking-wide">Synthesizing the next series of reports.</p>
            </div>
          )}
        </div>
      </section>

      {/* THE AXIS MANIFESTO STRIP */}
      <section className="bg-axis-navy text-axis-cream py-32 mb-12 relative overflow-hidden">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <p className="font-serif text-3xl md:text-5xl italic mb-12 leading-[1.3] opacity-90">
            "We believe in the power of the slow word, the rigorous investigation, and the unwavering pursuit of clarity in a noisy world."
          </p>
          <div className="flex justify-center items-center gap-6">
            <div className="h-px w-20 bg-axis-maroon opacity-50"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.7em] text-axis-maroon">Our Commitment</p>
            <div className="h-px w-20 bg-axis-maroon opacity-50"></div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
      </section>
    </div>
  );
};

export default ArticleList;