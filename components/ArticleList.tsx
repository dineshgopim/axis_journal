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
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
      {/* Featured Section - Hero Layout */}
      <section 
        onClick={() => onSelectArticle(featuredArticle)}
        className="group cursor-pointer mb-20 md:mb-28"
      >
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-16 border-b border-axis-charcoal/10 pb-16">
          {/* Featured Image - Left on Desktop */}
          <div className="lg:w-3/5 overflow-hidden order-1">
            <div className="relative aspect-[16/10] overflow-hidden bg-axis-gray">
              <img 
                src={featuredArticle.coverImage} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10"></div>
            </div>
          </div>

          {/* Featured Content - Right on Desktop */}
          <div className="lg:w-2/5 flex flex-col justify-center order-2">
            <div className="mb-6">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-axis-maroon bg-axis-maroon/5 px-3 py-1 mb-6">
                Cover Story
              </span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black text-axis-charcoal leading-[1.05] tracking-tight mb-6 group-hover:text-axis-navy transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="font-body text-lg text-gray-600 leading-relaxed mb-8 line-clamp-4">
                {featuredArticle.subtitle}
              </p>
            </div>
            
            <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-axis-charcoal">{featuredArticle.author.name}</span>
                <span className="text-[10px] font-serif italic text-gray-400">{featuredArticle.date}</span>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-axis-navy hover:text-axis-maroon transition-colors">
                Read Analysis &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Articles Section */}
      <section>
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-gray-400">Latest Dispatches</h3>
          <div className="h-px flex-grow mx-6 bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-20">
          {remainingArticles.length > 0 ? (
            remainingArticles.map((article) => (
              <article 
                key={article.id} 
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Secondary Article Thumbnail */}
                <div className="relative aspect-[16/9] mb-8 overflow-hidden bg-axis-gray">
                  <img 
                    src={article.coverImage} 
                    alt={article.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5"></div>
                </div>

                {/* Secondary Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-axis-maroon">
                      {article.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-[9px] font-serif italic text-gray-400">{article.date}</span>
                  </div>
                  
                  <h4 className="font-serif text-2xl font-bold text-axis-charcoal leading-tight mb-4 group-hover:text-axis-navy transition-colors tracking-tight">
                    {article.title}
                  </h4>
                  
                  <p className="font-body text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6">
                    {article.subtitle}
                  </p>
                </div>

                <div className="mt-auto pt-4 flex items-center gap-3 border-t border-gray-100 group-hover:border-axis-maroon/20 transition-colors">
                  {article.author.imageUrl && (
                    <img src={article.author.imageUrl} className="w-6 h-6 rounded-full grayscale opacity-70" alt="" />
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-axis-charcoal/70">
                    By {article.author.name}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100">
              <p className="font-serif italic text-gray-400">Awaiting further reports from the field.</p>
            </div>
          )}
        </div>
      </section>

      {/* Editorial Note / Quote Section */}
      <section className="mt-32 pt-20 border-t-2 border-axis-charcoal">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl italic text-axis-charcoal leading-snug opacity-80">
            "Journalism is not just a profession; it is the heartbeat of a thriving democracy."
          </p>
          <div className="mt-8 flex justify-center items-center gap-4">
            <div className="h-px w-8 bg-axis-maroon"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-axis-maroon">The Axis Ethos</span>
            <div className="h-px w-8 bg-axis-maroon"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleList;