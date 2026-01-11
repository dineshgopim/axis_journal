import React from 'react';

interface ImpactBoxProps {
  text: string;
}

const ImpactBox: React.FC<ImpactBoxProps> = ({ text }) => {
  return (
    <div className="my-5 md:my-6 p-8 md:p-12 bg-axis-gray border border-gray-200 text-center shadow-sm">
      {/* 
        Updated to font-body (Serif/Lora). 
        Increased font size by 15%: 
        text-lg (1.125rem) * 1.15 = 1.3rem
        text-xl (1.25rem) * 1.15 = 1.45rem
      */}
      <p className="font-body font-bold text-[1.3rem] md:text-[1.45rem] text-axis-maroon leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default ImpactBox;