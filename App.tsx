import React, { useState, useEffect } from 'react';
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
        <div className="container mx-auto px-4 md:px-0 flex flex-col items-center">
          {currentArticle ? (
            /* ARTICLE VIEW: Centered Column @ 60% width on large screens */
            <div className="w-full md:w-[85%] lg:w-[60%] py-12 md:py-24">
              <ArticleView article={currentArticle} />
              
              {/* Sidebar content moved to bottom of article for a focused reading flow */}
              <div className="mt-32 pt-20 border-t border-axis-charcoal/10">
                <Sidebar author={currentArticle.author} />
              </div>
            </div>
          ) : (
            /* HOME PAGE: Centered Feed @ 60% width on large screens */
            <div className="w-full md:w-[85%] lg:w-[60%]">
              <ArticleList 
                articles={articles} 
                onSelectArticle={handleSelectArticle} 
              />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-axis-charcoal text-white pt-24 pb-12 border-t-8 border-axis-navy mt-12">
        <div className="container mx-auto px-4 lg:px-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 border-b border-white/10 pb-20">
             <div className="lg:col-span-2">
                <h4 className="font-serif font-bold text-5xl tracking-tighter mb-8">Axis Journal</h4>
                <p className="font-body text-gray-400 max-w-md text-lg leading-relaxed opacity-80">
                  A high-end digital publication dedicated to rigorous investigation, cultural preservation, and the pursuit of clarity in a fragmented age.
                </p>
             </div>
             <div>
                <h5 className="font-bold uppercase tracking-[0.3em] text-[9px] text-axis-maroon mb-8 underline underline-offset-8">Information</h5>
                <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                   <li><a href="#" className="hover:text-white transition-colors">The Masthead</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Ethics Guidelines</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Terms of Dispatch</a></li>
                </ul>
             </div>
             <div>
                <h5 className="font-bold uppercase tracking-[0.3em] text-[9px] text-axis-maroon mb-8 underline underline-offset-8">Engagement</h5>
                <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                   <li><a href="#" className="hover:text-white transition-colors">Daily Briefing</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Axis Podcasts</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Member Events</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Advertising</a></li>
                </ul>
             </div>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.3em] text-gray-600">
             <p>© {new Date().getFullYear()} Axis Journal Publication Group. All rights reserved.</p>
             <div className="mt-8 md:mt-0 space-x-10">
               <span className="hover:text-gray-400 cursor-default">NYC</span>
               <span className="hover:text-gray-400 cursor-default">LDN</span>
               <span className="hover:text-gray-400 cursor-default">MUM</span>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;