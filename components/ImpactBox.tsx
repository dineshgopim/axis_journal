import React from 'react';

interface ImpactBoxProps {
  text: string;
}

const ImpactBox: React.FC<ImpactBoxProps> = ({ text }) => {
  return (
    <div className="impact-box my-12 md:my-16 relative group">
      <div className="bg-white border-y-[6px] border-axis-navy p-10 md:p-14 relative overflow-hidden shadow-sm">
        
        {/* Decorative Quote Mark */}
        <span className="absolute -top-4 -left-2 text-[14rem] text-axis-navy opacity-[0.03] font-serif leading-none select-none italic">
          &ldquo;
        </span>

        <blockquote className="relative z-10 text-center">
          <p className="font-serif font-black text-2xl md:text-3xl lg:text-4xl leading-[1.3] text-axis-navy tracking-tight italic">
            {text}
          </p>
        </blockquote>

        {/* Small Detail */}
        <div className="flex justify-center items-center mt-8 space-x-4 opacity-30">
          <div className="w-12 h-px bg-axis-navy"></div>
          <div className="w-2 h-2 rounded-full bg-axis-maroon"></div>
          <div className="w-12 h-px bg-axis-navy"></div>
        </div>
      </div>
      
      {/* Subtle outer border decoration */}
      <div className="absolute -inset-2 border border-axis-navy/5 -z-10 group-hover:scale-105 transition-transform duration-700"></div>
    </div>
  );
};

export default ImpactBox;