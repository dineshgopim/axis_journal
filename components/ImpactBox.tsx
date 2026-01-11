import React from 'react';

interface ImpactBoxProps {
  text: string;
}

const ImpactBox: React.FC<ImpactBoxProps> = ({ text }) => {
  return (
    <div className="my-3 md:my-4 p-5 md:p-8 bg-axis-gray border border-gray-200 text-center shadow-sm max-w-[90%] mx-auto">
      {/* 
        Updated to font-body (Serif/Lora) as requested previously. 
        Size remains increased by 15% from base, but the container is now smaller.
      */}
      <p className="font-body font-bold text-[1.3rem] md:text-[1.45rem] text-axis-maroon leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default ImpactBox;