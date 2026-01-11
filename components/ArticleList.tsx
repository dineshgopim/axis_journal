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
        On desktop, this section takes up a significant portion of the viewport to allow 
        for the specific percentage-based positioning requested.
      */}
      <section 
        className="relative w-full h-[85vh] md:h-[90vh] lg:h-[95vh] mb-24 overflow-hidden group cursor-pointer border-b border-axis-charcoal/10"
        onClick={() => onSelectArticle(featuredArticle)}
      >
        {/* Full-bleed background image with subtle parallax-like feel */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={featuredArticle.coverImage} 
            alt="" 
            className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-out opacity-40 md:opacity-100"
          />
          {/* Subtle gradient overlay to ensure text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-r from-axis-cream/80 via-axis-cream/20 to-transparent lg:hidden"></div>
        </div>

        {/* 
          THE PRECISE POSITIONING BOX
          Laptop (lg+): 
          - Top: 45% to 60% (Starts at 45% height, spans roughly 15-20% height)
          - Left: 10% to 60% (Spans 50% of the screen width starting from 10%)
        */}
        <div className="relative z-10 w-full h-full container mx-auto">
          <div 
            className="
              static md:absolute 
              md:top-[45%] md:left-[10%] md:w-[50%]
              p-6 md:p-10 lg:p-12 
              bg-axis-cream/95 md:bg-white md:shadow-[30px_30px_60px_rgba(0,0,0,0.05)] 
              border-l-4 md:border-l-[12px] border-axis-maroon
              transition-all duration-700 group-hover:translate-x-2
              flex flex-col justify-center
            "
            style={{ 
              // We ensure it stays roughly within the 45-60% height strip on desktop
              minHeight: '20vh' 
            }}
          >
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-axis-maroon mb-4 block">
                Exclusive Dispatch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-axis-charcoal leading-[1.1] tracking-tight group-hover:text-axis-navy transition-colors mb-6">
                {featuredArticle.title}
              </h2>
              <p className="font-body text-base md:text-lg text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-3 mb-8 opacity-90">
                {featuredArticle.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-axis-navy flex items-center group/btn">
                <span>Read Full Article</span>
                <span className="ml-3 transform group-hover/btn:translate-x-2 transition-transform">&rarr;</span>
              </div>
              <div className="hidden md:block text-[9px] font-serif italic text-gray-400">
                By {featuredArticle.author.name} — {featuredArticle.date}
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative typography for high-end feel */}
        <div className="absolute bottom-8 right-8 hidden xl:block pointer-events-none select-none">
          <span className="font-serif text-[12rem] font-black text-axis-charcoal opacity-[0.03] leading-none">
            01
          </span>
        </div>
      </section>

      {/* SECONDARY FEED SECTION */}
      <section className="container mx-auto px-4 lg:px-12 pb-24">
        <div className="flex items-center justify-between mb-16">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-gray-400 border-b border-axis-maroon/20 pb-2">
            The Journal Archive
          </h3>
          <div className="text-[10px] font-serif italic text-gray-400">Curated daily for the intellectual</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-24">
          {remainingArticles.length > 0 ? (
            remainingArticles.map((article) => (
              <article 
                key={article.id} 
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer flex flex-col h-full border-b border-gray-100 pb-12 last:border-0"
              >
                <div className="relative aspect-[16/9] mb-8 overflow-hidden bg-axis-gray shadow-sm">
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
                    <span className="h-px flex-grow bg-gray-200"></span>
                  </div>
                  
                  <h4 className="font-serif text-2xl md:text-3xl font-bold text-axis-charcoal leading-tight mb-4 group-hover:text-axis-navy transition-colors tracking-tight">
                    {article.title}
                  </h4>
                  
                  <p className="font-body text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6">
                    {article.subtitle}
                  </p>
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden grayscale opacity-80">
                         {article.author.imageUrl ? (
                           <img src={article.author.imageUrl} alt="" className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full bg-axis-navy/10 flex items-center justify-center font-serif text-xs">
                             {article.author.name[0]}
                           </div>
                         )}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-axis-charcoal">
                        {article.author.name}
                      </span>
                   </div>
                   <span className="text-[9px] font-serif text-gray-400 uppercase tracking-tighter">
                     {article.date}
                   </span>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-24 text-center border border-dashed border-gray-200 bg-white/30">
              <p className="font-serif italic text-gray-400 text-lg">Next edition in production...</p>
            </div>
          )}
        </div>
      </section>

      {/* PHILOSOPHICAL FOOTER INTERSTITIAL */}
      <section className="bg-axis-navy text-white py-24 mb-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-12 h-1 bg-axis-maroon mx-auto mb-10"></div>
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl italic leading-tight mb-12 opacity-90">
            "The truth is rarely pure and never simple."
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-axis-maroon">
            A Pillar of the Axis Ethos
          </p>
        </div>
      </section>
    </div>
  );
};

export default ArticleList;