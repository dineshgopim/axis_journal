import React from 'react';

interface ImpactBoxProps {
  text: string;
}

const ImpactBox: React.FC<ImpactBoxProps> = ({ text }) => {
  return (
    <div className="my-2 md:my-3 p-4 md:p-6 bg-axis-gray border border-gray-200 text-center shadow-sm max-w-[80%] mx-auto">
      {/* 
        Typography matches the body font (Lora) and is sized 15% larger than base text.
        Container padding and max-width reduced for a more compact look.
      */}
      <p className="font-body font-bold text-[1.3rem] md:text-[1.45rem] text-axis-maroon leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default ImpactBox;