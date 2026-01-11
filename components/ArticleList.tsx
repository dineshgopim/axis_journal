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
        FEATURED ARTICLE "COVER STAGE" 
        This section starts immediately after the navigation menu.
      */}
      <section 
        className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] min-h-[500px] mb-24 overflow-hidden group cursor-pointer border-b border-axis-charcoal/10"
        onClick={() => onSelectArticle(featuredArticle)}
      >
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredArticle.coverImage} 
            alt="" 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[2000ms] ease-out"
          />
          {/* Subtle overlay for contrast */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* 
          THE PRECISE POSITIONING BOX
          As per latest feedback: "Exactly under the names" (Navigation).
          Horizontal: 10% to 60% of the screen width (Left 10%, Width 50%).
          Vertical: Adjusted from 45% down to 5% to sit right under the header options.
        */}
        <div 
          className="
            absolute z-10 
            /* Desktop Coordinates: Exactly under the nav (top-5%), spanning 10% to 60% width */
            lg:top-[5%] lg:left-[10%] lg:w-[50%]
            /* Tablet Coordinates */
            md:top-[8%] md:left-[8%] md:w-[65%]
            /* Mobile Coordinates */
            top-[10%] left-[5%] w-[90%]
            
            bg-white/95 backdrop-blur-md md:bg-white 
            p-8 md:p-10 lg:p-12
            border-l-[12px] md:border-l-[20px] border-axis-maroon
            shadow-[30px_30px_60px_rgba(0,0,0,0.2)]
            flex flex-col justify-center
            transition-all duration-700 group-hover:translate-x-1 group-hover:shadow-[40px_40px_80px_rgba(0,0,0,0.25)]
          "
        >
          <div className="overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-axis-maroon">
                Featured Dispatch
              </span>
              <div className="h-px w-8 bg-axis-maroon/20"></div>
            </div>
            
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-black text-axis-charcoal leading-[1.1] tracking-tighter group-hover:text-axis-navy transition-colors mb-6">
              {featuredArticle.title}
            </h2>
            
            <p className="font-body text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-3 opacity-90 mb-8 border-b border-gray-100 pb-8">
              {featuredArticle.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button className="text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] text-axis-navy flex items-center group/btn relative overflow-hidden py-1">
              <span className="relative z-10">Read Full Article</span>
              <span className="ml-3 transform group-hover/btn:translate-x-2 transition-transform">&rarr;</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-axis-maroon/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left"></div>
            </button>
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-axis-charcoal opacity-60">By {featuredArticle.author.name}</span>
              <span className="text-[9px] font-serif italic text-gray-400 mt-0.5">{featuredArticle.date}</span>
            </div>
          </div>
        </div>

        {/* Branding Watermark */}
        <div className="absolute bottom-12 right-12 hidden lg:block pointer-events-none select-none">
          <span className="font-serif text-[14rem] font-black text-white opacity-10 leading-none">
            A.J.
          </span>
        </div>
      </section>

      {/* SECONDARY FEED SECTION */}
      <section className="container mx-auto px-4 lg:px-12 pb-24">
        <div className="flex items-center gap-8 mb-20">
          <div className="h-px flex-grow bg-axis-charcoal/10"></div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.6em] text-gray-400 whitespace-nowrap">
            Curated Insights
          </h3>
          <div className="h-px flex-grow bg-axis-charcoal/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-28">
          {remainingArticles.length > 0 ? (
            remainingArticles.map((article) => (
              <article 
                key={article.id} 
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[16/9] mb-10 overflow-hidden bg-axis-gray shadow-lg ring-1 ring-black/5">
                  <img 
                    src={article.coverImage} 
                    alt=""
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-axis-maroon bg-axis-maroon/5 px-2 py-0.5">
                      {article.category}
                    </span>
                    <span className="text-[10px] font-serif italic text-gray-400">{article.date}</span>
                  </div>
                  
                  <h4 className="font-serif text-3xl font-bold text-axis-charcoal leading-tight mb-6 group-hover:text-axis-navy transition-colors tracking-tight">
                    {article.title}
                  </h4>
                  
                  <p className="font-body text-base text-gray-500 leading-relaxed line-clamp-3">
                    {article.subtitle}
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-axis-navy/5 flex items-center justify-center font-serif text-sm text-axis-navy font-bold">
                        {article.author.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-axis-charcoal opacity-80">
                          {article.author.name}
                        </span>
                        <span className="text-[9px] text-gray-400 uppercase tracking-tighter">Contributor</span>
                      </div>
                   </div>
                   <span className="text-[11px] font-bold text-axis-navy group-hover:text-axis-maroon transition-colors underline underline-offset-4 decoration-axis-navy/10 group-hover:decoration-axis-maroon/50">
                     Open Dispatch
                   </span>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-y border-gray-100">
              <p className="font-serif italic text-gray-400 text-xl tracking-wide">Synthesizing the next series of reports.</p>
            </div>
          )}
        </div>
      </section>

      {/* THE AXIS MANIFESTO STRIP */}
      <section className="bg-axis-navy text-axis-cream py-32 mb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <p className="font-serif text-3xl md:text-5xl italic mb-12 leading-[1.3] opacity-90">
            "We believe in the power of the slow word, the rigorous investigation, and the unwavering pursuit of clarity in a noisy world."
          </p>
          <div className="flex justify-center items-center gap-6">
            <div className="h-px w-20 bg-axis-maroon opacity-50"></div>
            <p className="text-[11px] font-bold uppercase tracking-[0.7em] text-axis-maroon">Our Commitment</p>
            <div className="h-px w-20 bg-axis-maroon opacity-50"></div>
          </div>
        </div>
        {/* Architectural background pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
      </section>
    </div>
  );
};

export default ArticleList;