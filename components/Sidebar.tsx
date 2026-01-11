import React from 'react';
import { Author } from '../types';

interface SidebarProps {
  author?: Author;
}

const Sidebar: React.FC<SidebarProps> = ({ author }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      
      {/* Author Bio Section */}
      {author && (
        <div className="bg-white border-l-4 border-axis-navy p-8 shadow-sm flex flex-col sm:flex-row md:flex-col gap-6">
          {author.imageUrl && (
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-20 md:h-20 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
              <img 
                src={author.imageUrl} 
                alt={author.name} 
                className="w-full h-full object-cover rounded-sm border border-axis-charcoal/10"
              />
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="font-serif font-bold text-[9px] uppercase tracking-[0.4em] text-axis-maroon mb-4">About the Author</h3>
            <h4 className="font-serif font-bold text-2xl text-axis-charcoal mb-1 italic">{author.name}</h4>
            <p className="text-[9px] font-bold text-axis-navy uppercase tracking-[0.3em] mb-4">{author.role}</p>
            <p className="font-body text-sm text-gray-600 leading-relaxed">
              {author.bio}
            </p>
          </div>
        </div>
      )}

      {/* Subscription Box */}
      <div className="bg-axis-navy text-white p-10 text-center relative overflow-hidden flex flex-col justify-center min-h-[280px]">
        <div className="relative z-10">
          <h3 className="font-serif font-bold text-2xl mb-3 tracking-tight">The Axis Newsletter</h3>
          <p className="font-body text-sm text-gray-300 mb-6 leading-relaxed max-w-xs mx-auto">
            Rigorous investigation delivered to your inbox every Sunday morning.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/10 border border-white/20 px-4 py-3 text-sm font-sans focus:outline-none focus:bg-white/20 transition-all placeholder:text-gray-400"
            />
            <button className="w-full py-3 bg-white text-axis-navy font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-axis-cream transition-colors duration-300">
              Join the Dispatch
            </button>
            <p className="text-[8px] text-gray-500 uppercase tracking-[0.4em] mt-2">No Tracking &bull; Unsubscribe anytime</p>
          </div>
        </div>
        
        {/* Abstract watermark decoration */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 border border-white/5 rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Sidebar;