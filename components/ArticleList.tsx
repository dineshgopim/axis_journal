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
        This section starts exactly under the names (navigation menu).
        We use relative positioning on the container to anchor our percentage-based box.
      */}
      <section 
        className="relative w-full h-[calc(100vh-140px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-200px)] min-h-[600px] mb-24 overflow-hidden group cursor-pointer border-b border-axis-charcoal/10"
        onClick={() => onSelectArticle(featuredArticle)}
      >
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredArticle.coverImage} 
            alt="" 
            className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
          />
          {/* Subtle gradient to ensure the transition from header is smooth */}
          <div className="absolute inset-0 bg-gradient-to-b from-axis-cream/40 via-transparent to-black/20"></div>
        </div>

        {/* 
          THE PRECISE POSITIONING BOX
          As requested: 
          - From 45% to 60% of the screen height (vertical slice)
          - From 10% to 60% of the screen width (horizontal slice)
          
          Note: On desktop, these coordinates are strictly enforced via absolute positioning.
          On mobile, we adapt to ensure readability while maintaining the "box" feel.
        */}
        <div 
          className="
            absolute z-10 
            /* Laptop/Desktop Coordinates */
            lg:top-[45%] lg:left-[10%] lg:w-[50%] lg:h-[15%]
            /* Tablet Coordinates */
            md:top-[40%] md:left-[10%] md:w-[60%] md:h-auto
            /* Mobile Coordinates */
            top-[50%] left-[5%] w-[90%] -translate-y-1/2 md:translate-y-0
            
            bg-white/95 backdrop-blur-sm md:bg-white 
            p-6 md:p-8 lg:px-10 lg:py-4
            border-l-[8px] md:border-l-[16px] border-axis-maroon
            shadow-[20px_20px_50px_rgba(0,0,0,0.15)]
            flex flex-col justify-center
            transition-all duration-700 group-hover:bg-white group-hover:shadow-[30px_30px_70px_rgba(0,0,0,0.2)]
          "
        >
          <div className="overflow-hidden">
            <span className="hidden md:block text-[9px] font-bold uppercase tracking-[0.4em] text-axis-maroon mb-2 animate-in slide-in-from-left duration-700">
              Featured Dispatch
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-black text-axis-charcoal leading-tight tracking-tight group-hover:text-axis-navy transition-colors mb-2 lg:mb-1">
              {featuredArticle.title}
            </h2>
            <p className="font-body text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed line-clamp-2 opacity-80 mb-4 lg:mb-2">
              {featuredArticle.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
            <button className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-axis-navy flex items-center group/btn hover:text-axis-maroon transition-colors">
              <span>Read Full Article</span>
              <span className="ml-2 transform group-hover/btn:translate-x-2 transition-transform">&rarr;</span>
            </button>
            <div className="hidden lg:block text-[9px] font-serif italic text-gray-400">
              {featuredArticle.date}
            </div>
          </div>
        </div>

        {/* Floating Number Detail */}
        <div className="absolute top-12 right-12 hidden lg:block pointer-events-none">
          <span className="font-serif text-[10rem] font-black text-axis-charcoal opacity-[0.05] leading-none select-none">
            I
          </span>
        </div>
      </section>

      {/* SECONDARY FEED SECTION */}
      <section className="container mx-auto px-4 lg:px-12 pb-24">
        <div className="flex items-center gap-6 mb-16">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-gray-400 whitespace-nowrap">
            Recent Analysis
          </h3>
          <div className="h-px w-full bg-axis-charcoal/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-24">
          {remainingArticles.length > 0 ? (
            remainingArticles.map((article) => (
              <article 
                key={article.id} 
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[16/9] mb-8 overflow-hidden bg-axis-gray">
                  <img 
                    src={article.coverImage} 
                    alt=""
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5"></div>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-axis-maroon">
                      {article.category}
                    </span>
                    <span className="text-[9px] font-serif italic text-gray-400">{article.date}</span>
                  </div>
                  
                  <h4 className="font-serif text-2xl md:text-3xl font-bold text-axis-charcoal leading-tight mb-4 group-hover:text-axis-navy transition-colors tracking-tight">
                    {article.title}
                  </h4>
                  
                  <p className="font-body text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {article.subtitle}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-axis-charcoal opacity-70">
                     By {article.author.name}
                   </span>
                   <span className="text-[10px] font-bold text-axis-navy group-hover:text-axis-maroon transition-colors">
                     Open Dispatch &rarr;
                   </span>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-24 text-center border-t border-b border-gray-100">
              <p className="font-serif italic text-gray-400 text-lg">Awaiting additional field reports.</p>
            </div>
          )}
        </div>
      </section>

      {/* THE AXIS MANIFESTO STRIP */}
      <section className="bg-axis-charcoal text-axis-cream py-20 mb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="font-serif text-2xl md:text-4xl italic mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
            "In an age of instant noise, we choose the clarity of measured investigation."
          </p>
          <div className="inline-block h-1 w-16 bg-axis-maroon mb-6"></div>
          <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-gray-500">The Axis Ethos</p>
        </div>
        {/* Subtle background detail */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-white h-full"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleList;