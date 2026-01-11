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
  };

  return (
    <div className="min-h-screen bg-axis-cream flex flex-col">
      <Header onLogoClick={handleLogoClick} />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-24 relative">
          
          {/* Main Content Area - Constrained width for reading optimal line length */}
          <div className="flex-grow w-full max-w-[750px] mx-auto lg:mx-0">
            {currentArticle ? (
              <ArticleView article={currentArticle} />
            ) : (
              <ArticleList 
                articles={articles} 
                onSelectArticle={handleSelectArticle} 
              />
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="hidden lg:block w-80 relative">
             <div className="sticky top-8">
                <Sidebar author={currentArticle?.author} />
             </div>
          </div>

          {/* Mobile Sidebar (appears at bottom) */}
          <div className="lg:hidden mt-16 pt-8 border-t border-gray-200">
             <Sidebar author={currentArticle?.author} />
          </div>

        </div>
      </main>

      <footer className="bg-axis-charcoal text-white py-12 text-center border-t-4 border-axis-navy mt-12">
        <div className="container mx-auto px-4">
           <h4 className="font-serif font-bold text-2xl mb-4">Axis Journal</h4>
           <div className="flex justify-center space-x-6 text-xs uppercase tracking-widest text-gray-400 mb-8">
             <a href="#" className="hover:text-white transition-colors">About</a>
             <a href="#" className="hover:text-white transition-colors">Team</a>
             <a href="#" className="hover:text-white transition-colors">Careers</a>
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
           </div>
           <p className="font-serif text-gray-500 text-sm">© {new Date().getFullYear()} Axis Journal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;