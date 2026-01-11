import React from 'react';

interface ImpactBoxProps {
  text: string;
}

const ImpactBox: React.FC<ImpactBoxProps> = ({ text }) => {
  return (
    <div className="impact-box my-10 relative">
      <div className="bg-gray-100 border-y-2 border-axis-maroon/20 p-8 md:p-10 relative overflow-hidden group">
        
        {/* Decorative quote mark background */}
        <span className="absolute top-0 left-4 text-8xl text-axis-maroon opacity-5 font-serif leading-none select-none">
          &ldquo;
        </span>

        <blockquote className="relative z-10 text-center">
          <p className="font-serif font-bold text-xl md:text-2xl leading-relaxed text-axis-maroon tracking-wide">
            {text}
          </p>
        </blockquote>

        {/* Bottom decorative element */}
        <div className="w-16 h-1 bg-axis-maroon mx-auto mt-6 opacity-30 rounded-full"></div>
      </div>
    </div>
  );
};

export default ImpactBox;