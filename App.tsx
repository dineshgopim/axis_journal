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
    <div className="min-h-screen bg-axis-cream flex flex-col font-body selection:bg-axis-maroon selection:text-white">
      <Header onLogoClick={handleLogoClick} />

      <main className="flex-grow">
        {/* Content Wrapper */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-16">
          <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24">
            
            {/* Main Column: Constrained for readability, but scales nicely */}
            <div className="flex-grow w-full lg:max-w-[800px] xl:max-w-[850px]">
              {currentArticle ? (
                <ArticleView article={currentArticle} />
              ) : (
                <ArticleList 
                  articles={articles} 
                  onSelectArticle={handleSelectArticle} 
                />
              )}
            </div>

            {/* Sidebar: Sticky on laptop, bottom on mobile */}
            <div className="w-full lg:w-[320px] xl:w-[380px] mt-12 lg:mt-0 flex-shrink-0">
               <div className="lg:sticky lg:top-[160px]">
                  <Sidebar author={currentArticle?.author} />
                  
                  {/* Additional desktop footer-like content in sidebar */}
                  <div className="hidden lg:block mt-12 pt-8 border-t border-gray-200">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Archive Index 1892 - 2025
                    </p>
                    <p className="text-[10px] mt-2 text-gray-400 font-serif italic">
                      Members get exclusive access to 130 years of clarity.
                    </p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="bg-axis-charcoal text-white pt-20 pb-12 border-t-8 border-axis-navy mt-24">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
             <div className="md:col-span-2">
                <h4 className="font-serif font-bold text-4xl mb-6">Axis Journal</h4>
                <p className="font-body text-gray-400 max-w-md leading-relaxed">
                  Dedicated to rigorous investigation, cultural preservation, and the pursuit of clarity in an increasingly fragmented world.
                </p>
             </div>
             <div>
                <h5 className="font-bold uppercase tracking-[0.2em] text-[10px] text-axis-maroon mb-6">Publication</h5>
                <ul className="space-y-3 text-sm text-gray-300">
                   <li><a href="#" className="hover:text-white transition-colors">Masthead</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Ethics Policy</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
             </div>
             <div>
                <h5 className="font-bold uppercase tracking-[0.2em] text-[10px] text-axis-maroon mb-6">Connect</h5>
                <ul className="space-y-3 text-sm text-gray-300">
                   <li><a href="#" className="hover:text-white transition-colors">Newsletters</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Podcasts</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Customer Service</a></li>
                   <li><a href="#" className="hover:text-white transition-colors">Advertise</a></li>
                </ul>
             </div>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
             <p>© {new Date().getFullYear()} Axis Journal Publication Group.</p>
             <div className="mt-4 md:mt-0 space-x-6">
               <span>New York</span>
               <span>London</span>
               <span>Mumbai</span>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;