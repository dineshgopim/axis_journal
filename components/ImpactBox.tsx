import React from 'react';

interface ImpactBoxProps {
  text: string;
}

const ImpactBox: React.FC<ImpactBoxProps> = ({ text }) => {
  return (
    <div className="my-5 md:my-6 p-8 md:p-12 bg-axis-gray border border-gray-200 text-center shadow-sm">
      <p className="font-sans font-bold text-lg md:text-xl text-axis-maroon leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default ImpactBox;