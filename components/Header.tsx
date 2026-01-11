import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="border-b border-gray-200 bg-axis-cream">
      {/* Top Bar - Date and Utility */}
      <div className="container mx-auto px-4 py-2 border-b border-gray-200">
        <div className="flex justify-between items-center text-xs font-serif uppercase tracking-widest text-gray-500">
          <span>{date}</span>
          <div className="space-x-4 hidden md:block">
            <button className="hover:text-axis-maroon transition-colors">Digital Archive</button>
            <button className="hover:text-axis-maroon transition-colors">Newsletters</button>
          </div>
        </div>
      </div>

      {/* Main Logo */}
      <div className="container mx-auto px-4 py-8 md:py-10 text-center">
        <h1 
          onClick={onLogoClick}
          className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-axis-charcoal cursor-pointer hover:opacity-90 transition-opacity"
        >
          Axis Journal
        </h1>
        <p className="mt-2 font-serif italic text-gray-600 text-sm md:text-base">In Pursuit of Clarity</p>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-4 pb-4">
        <ul className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-bold uppercase tracking-widest text-axis-navy border-y border-gray-900/10 py-3">
          {['World', 'Politics', 'Business', 'Technology', 'Science', 'Health', 'Style', 'Travel'].map((item) => (
            <li key={item}>
              <button className="hover:text-axis-maroon transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-axis-maroon transition-all group-hover:w-full"></span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;