import React from 'react';
import { Author } from '../types';

interface SidebarProps {
  author?: Author;
}

const Sidebar: React.FC<SidebarProps> = ({ author }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      
      {/* Author Bio Section - Text Only */}
      {author && (
        <div className="bg-white border-l-4 border-axis-navy p-10 shadow-sm">
          <h3 className="font-serif font-bold text-xs uppercase tracking-[0.4em] text-axis-maroon mb-6">About the Author</h3>
          <div className="flex flex-col">
            <h4 className="font-serif font-bold text-3xl text-axis-charcoal mb-2 italic">{author.name}</h4>
            <p className="text-[10px] font-bold text-axis-navy uppercase tracking-[0.3em] mb-6">{author.role}</p>
            <p className="font-body text-base text-gray-600 leading-relaxed">
              {author.bio}
            </p>
          </div>
        </div>
      )}

      {/* Subscription Box - High Contrast Typographic */}
      <div className="bg-axis-navy text-white p-12 text-center relative overflow-hidden flex flex-col justify-center min-h-[300px]">
        <div className="relative z-10">
          <h3 className="font-serif font-bold text-3xl mb-4 tracking-tight">The Axis Newsletter</h3>
          <p className="font-body text-base text-gray-300 mb-8 leading-relaxed max-w-sm mx-auto">
            Rigorous investigation delivered to your inbox every Sunday morning. Support independent slow journalism.
          </p>
          <div className="flex flex-col gap-4">
            <button className="w-full py-4 bg-white text-axis-navy font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-axis-cream transition-colors duration-300">
              Join the Dispatch
            </button>
            <p className="text-[9px] text-gray-400 uppercase tracking-[0.4em]">Privacy First &bull; No Tracking</p>
          </div>
        </div>
        
        {/* Abstract watermark decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Sidebar;