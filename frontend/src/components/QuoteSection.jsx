import React from 'react';

const QuoteSection = () => {
  return (
    <section className="py-24 md:py-32 px-8 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
      <div className="text-yellow-400 text-5xl md:text-6xl font-serif leading-none mb-6">"</div>
      <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black italic tracking-tight leading-[0.9] mb-10 text-zinc-100 uppercase">
        URBAN REQUISTER ISN'T JUST EYEWEAR.<br className="hidden md:block" /> IT'S THE ARMOR FOR THE MODERN<br className="hidden md:block" /> ANARCHIST.
      </h2>
      <p className="text-zinc-500 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase flex items-center gap-4">
        <span className="w-8 h-[1px] bg-zinc-700"></span>
        Vogue Editorial, 2024
        <span className="w-8 h-[1px] bg-zinc-700 md:hidden"></span>
      </p>
    </section>
  );
};

export default QuoteSection;
