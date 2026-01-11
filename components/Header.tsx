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

  const handleNavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogoClick();
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-gray-200 bg-axis-cream sticky top-0 z-50">
      {/* Top Bar */}
      <div className="hidden md:block container mx-auto px-4 py-1.5 border-b border-gray-100">
        <div className="flex justify-between items-center text-[9px] font-serif uppercase tracking-[0.2em] text-gray-500">
          <span>{date}</span>
          <div className="space-x-6">
            <button onClick={handleNavClick} className="hover:text-axis-maroon transition-colors">Digital Archive</button>
            <button onClick={handleNavClick} className="hover:text-axis-maroon transition-colors">Newsletters</button>
            <button className="text-axis-navy font-bold">Sign In</button>
          </div>
        </div>
      </div>

      {/* Main Logo Container */}
      <div className="container mx-auto px-4 py-2 md:py-4 flex items-center justify-between md:justify-center relative">
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
            onClick={onLogoClick}
            className="font-serif text-2xl md:text-5xl font-bold tracking-tighter text-axis-charcoal cursor-pointer hover:opacity-80 transition-opacity select-none leading-none"
          >
            Axis Journal
          </h1>
          <p className="hidden md:block mt-1 font-serif italic text-gray-500 text-[9px] tracking-[0.2em] uppercase">In Pursuit of Clarity</p>
        </div>

        <div className="md:hidden w-10"></div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block container mx-auto px-4">
        <ul className="flex justify-center gap-6 lg:gap-10 text-[10px] font-bold uppercase tracking-[0.15em] text-axis-navy py-2">
          {categories.map((item) => (
            <li key={item}>
              <button onClick={handleNavClick} className="hover:text-axis-maroon transition-colors relative group py-1">
                {item}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-axis-maroon transition-all group-hover:w-full"></span>
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
                    onClick={handleNavClick}
                    className="w-full text-left py-3 border-b border-gray-100 active:text-axis-maroon"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;