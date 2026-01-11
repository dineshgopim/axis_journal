import React, { useState } from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const date = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const categories = ['World', 'Politics', 'Business', 'Technology', 'Science', 'Health', 'Style', 'Travel'];

  return (
    <header className="border-b border-gray-200 bg-axis-cream sticky top-0 z-50">
      {/* Top Bar - Date and Utility (Desktop Only) */}
      <div className="hidden md:block container mx-auto px-4 py-2 border-b border-gray-100">
        <div className="flex justify-between items-center text-[9px] font-serif uppercase tracking-[0.2em] text-gray-500">
          <span>{date}</span>
          <div className="space-x-6">
            <button className="hover:text-axis-maroon transition-colors">Digital Archive</button>
            <button className="hover:text-axis-maroon transition-colors">Newsletters</button>
            <button className="text-axis-navy font-bold">Sign In</button>
          </div>
        </div>
      </div>

      {/* Main Logo and Mobile Menu Toggle */}
      <div className="container mx-auto px-4 py-4 md:py-8 flex items-center justify-between md:justify-center relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 -ml-2 text-axis-charcoal focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="text-center flex-grow md:flex-grow-0">
          <h1 
            onClick={() => {
              onLogoClick();
              setIsMenuOpen(false);
            }}
            className="font-serif text-3xl md:text-6xl font-bold tracking-tighter text-axis-charcoal cursor-pointer hover:opacity-80 transition-opacity select-none"
          >
            Axis Journal
          </h1>
          <p className="hidden md:block mt-1 font-serif italic text-gray-500 text-xs tracking-widest uppercase">In Pursuit of Clarity</p>
        </div>

        <div className="md:hidden w-10"></div> {/* Spacer for mobile balance */}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block container mx-auto px-4">
        <ul className="flex justify-center gap-8 lg:gap-12 text-[10px] font-bold uppercase tracking-[0.15em] text-axis-navy py-4">
          {categories.map((item) => (
            <li key={item}>
              <button className="hover:text-axis-maroon transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-axis-maroon transition-all group-hover:w-full"></span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-axis-cream border-b border-gray-200 shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="p-6">
            <ul className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-widest text-axis-navy">
              {categories.map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-left py-3 border-b border-gray-100 active:text-axis-maroon"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
              <button className="block w-full text-center py-3 bg-axis-navy text-white font-bold uppercase tracking-widest text-[9px]">
                Subscribe Now
              </button>
              <p className="text-center text-[9px] text-gray-500 font-serif italic">{date}</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;