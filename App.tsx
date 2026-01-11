import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleList from './components/ArticleList';
import ArticleView from './components/ArticleView';
import { articles } from './data/articles';
import { Article } from './types';

function App() {
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  const handleLogoClick = () => {
    setCurrentArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    setCurrentArticle(article);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="min-h-screen bg-axis-cream flex flex-col font-body selection:bg-axis-maroon selection:text-white overflow-x-hidden">
      <Header onLogoClick={handleLogoClick} />

      <main className="flex-grow">
        <div className="container mx-auto px-4 flex flex-col items-center">
          {currentArticle ? (
            /* ARTICLE VIEW: Centered Column strictly @ max-750px as requested for optimal reading */
            <div className="w-full max-w-[750px] pt-4 md:pt-8 pb-12 md:pb-24">
              <ArticleView article={currentArticle} />
              
              {/* Sidebar content at bottom of article */}
              <div className="mt-20 pt-16 border-t border-axis-charcoal/10">
                <Sidebar author={currentArticle.author} />
              </div>
            </div>
          ) : (
            /* HOME PAGE: Slightly wider for the feed, but centered. Reduced top padding to close gap. */
            <div className="w-full max-w-[850px] pt-4 md:pt-6 pb-12 md:pb-20">
              <ArticleList 
                articles={articles} 
                onSelectArticle={handleSelectArticle} 
              />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-axis-charcoal text-white pt-20 pb-10 border-t-4 border-axis-navy mt-12">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
             <div className="lg:col-span-2">
                <h4 className="font-serif font-bold text-4xl tracking-tighter mb-6">Axis Journal</h4>
                <p className="font-body text-gray-400 max-w-md text-base leading-relaxed opacity-75">
                  A high-end digital publication dedicated to rigorous investigation, cultural preservation, and the pursuit of clarity.
                </p>
             </div>
             <div>
                <h5 className="font-bold uppercase tracking-[0.2em] text-[9px] text-axis-maroon mb-6">Information</h5>
                <ul className="space-y-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                   <li><a href="#" className="hover:text-white transition-colors">The Masthead</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Ethics Guidelines</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
             </div>
             <div>
                <h5 className="font-bold uppercase tracking-[0.2em] text-[9px] text-axis-maroon mb-6">Engagement</h5>
                <ul className="space-y-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                   <li><a href="#" className="hover:text-white transition-colors">Daily Briefing</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Axis Podcasts</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Membership</a></li>
                </ul>
             </div>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-center text-[8px] uppercase tracking-[0.3em] text-gray-600">
             <p>© {new Date().getFullYear()} Axis Journal Publication Group.</p>
             <div className="mt-4 md:mt-0 space-x-8">
               <span>NYC</span>
               <span>LDN</span>
               <span>MUM</span>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;