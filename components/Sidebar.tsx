import React from 'react';
import { Author } from '../types';

interface SidebarProps {
  author?: Author;
}

const Sidebar: React.FC<SidebarProps> = ({ author }) => {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-8 mt-12 lg:mt-0">
      
      {/* Author Bio Section - Only shows if author is provided (i.e., on Article page) */}
      {author && (
        <div className="bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-axis-navy mb-4 border-b border-gray-100 pb-2">About the Author</h3>
          <div className="flex flex-col items-center text-center">
            {author.imageUrl && (
              <img 
                src={author.imageUrl} 
                alt={author.name} 
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-100 grayscale hover:grayscale-0 transition-all duration-500"
              />
            )}
            <h4 className="font-serif font-bold text-xl text-axis-charcoal">{author.name}</h4>
            <p className="text-xs font-bold text-axis-maroon uppercase tracking-wider mt-1 mb-3">{author.role}</p>
            <p className="font-body text-sm text-gray-600 leading-relaxed italic">
              "{author.bio}"
            </p>
          </div>
        </div>
      )}

      {/* Subscription Box - Always visible */}
      <div className="bg-axis-navy text-white p-8 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-serif font-bold text-2xl mb-2">Subscribe to Axis</h3>
          <p className="font-body text-sm text-gray-300 mb-6 leading-relaxed">
            Support independent, slow journalism. Get unlimited access to our archive and weekly curated briefings.
          </p>
          <button className="w-full py-3 bg-white text-axis-navy font-bold uppercase tracking-widest text-xs hover:bg-axis-cream transition-colors duration-300">
            Start Free Trial
          </button>
          <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest">Cancel anytime</p>
        </div>
        
        {/* Decorative circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
      </div>

      {/* Recommended/Trending (Simulated) */}
      <div className="hidden lg:block">
        <h3 className="font-serif font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Trending Now</h3>
        <ul className="space-y-4">
          <li className="group cursor-pointer">
            <span className="text-axis-maroon font-bold text-lg mr-2">1</span>
            <span className="font-serif font-bold text-axis-charcoal group-hover:text-axis-maroon transition-colors">The End of the Open Office</span>
          </li>
          <li className="group cursor-pointer">
            <span className="text-axis-maroon font-bold text-lg mr-2">2</span>
            <span className="font-serif font-bold text-axis-charcoal group-hover:text-axis-maroon transition-colors">Philosophy in the Age of AI</span>
          </li>
          <li className="group cursor-pointer">
            <span className="text-axis-maroon font-bold text-lg mr-2">3</span>
            <span className="font-serif font-bold text-axis-charcoal group-hover:text-axis-maroon transition-colors">Minimalism as a Service</span>
          </li>
        </ul>
      </div>

    </aside>
  );
};

export default Sidebar;