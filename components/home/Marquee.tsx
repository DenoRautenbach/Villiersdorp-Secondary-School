import React from 'react';

const words = ['Shape Your Future', '✦', 'Vorm Jou Toekoms', '✦'];

export default function Marquee() {
  // Duplicate for seamless loop
  const repeated = [...words, ...words, ...words, ...words];

  return (
    <div
      className="py-10 bg-[#fd1b3d] overflow-hidden whitespace-nowrap flex items-center"
      aria-hidden="true"
    >
      <div className="flex items-center gap-10 animate-marquee">
        {repeated.map((word, i) => (
          <React.Fragment key={i}>
            {word === '✦' ? (
              <span className="text-white/50 text-xl flex-shrink-0">{word}</span>
            ) : (
              <span className="font-serif text-4xl md:text-5xl uppercase italic text-white flex-shrink-0 px-4">
                {word}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
