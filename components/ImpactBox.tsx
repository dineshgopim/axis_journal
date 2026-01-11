import React from 'react';

interface ImpactBoxProps {
  text: string;
}

const ImpactBox: React.FC<ImpactBoxProps> = ({ text }) => {
  return (
    <div className="my-8 md:my-12 p-8 md:p-10 bg-axis-gray border border-gray-200 text-center shadow-sm max-w-[90%] mx-auto rounded-sm ring-1 ring-black/5">
      <p className="font-body font-bold text-xl md:text-2xl text-axis-maroon leading-relaxed antialiased">
        "{text}"
      </p>
      <div className="w-12 h-0.5 bg-axis-maroon/20 mx-auto mt-6"></div>
    </div>
  );
};

export default ImpactBox;