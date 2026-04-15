import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#0a0a0a] border-t border-zinc-900 pt-20 pb-12 w-full mt-12 px-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left Side: Brand & Contact Info */}
        <div className="max-w-xl">
          <div className="mb-6">
            <img src="/images/logo.png" alt="Urban Requister Logo" className="h-16 md:h-28 lg:h-36 w-auto object-contain drop-shadow-xl" />
          </div>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-sm">
            Premium luxury eyewear and bespoke styling from the heart of Faridabad. Elevating your aesthetic step by step.
          </p>

          <div className="space-y-6">
            {/* WhatsApp Contact */}
            <a href="https://wa.me/917042159193" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
              <div className="w-10 h-10 bg-[#111] border border-zinc-800 rounded-full flex items-center justify-center group-hover:border-green-500 transition-colors">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </div>
              <span className="font-bold tracking-widest text-sm">+91 7042159193</span>
            </a>

            {/* Email Contact */}
            <a href="mailto:example@gmail.com" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
              <div className="w-10 h-10 bg-[#111] border border-zinc-800 rounded-full flex items-center justify-center group-hover:border-yellow-400 transition-colors">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span className="font-bold tracking-widest text-sm uppercase">example@gmail.com</span>
            </a>

            {/* Address */}
            <div className="flex items-center gap-4 text-zinc-300">
              <div className="w-10 h-10 bg-[#111] border border-zinc-800 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span className="font-bold tracking-widest text-sm uppercase">Faridabad, India</span>
            </div>
          </div>
        </div>

        {/* Right Side: Newsletter */}
        <div className="bg-[#111] p-10 rounded-3xl border border-zinc-800 lg:ml-auto w-full max-w-lg">
          <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-3 text-white">Join The VIP Club</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Get early access to exclusive drops and insider editorial content. No spam, just fashion.
          </p>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="bg-[#1a1a1a] border border-zinc-800 rounded-xl px-6 py-4 w-full text-[12px] font-bold tracking-[0.15em] text-white outline-none focus:border-yellow-400 transition-colors uppercase placeholder:text-zinc-600"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 rounded-xl text-black px-10 py-5 text-xs font-black tracking-[0.2em] uppercase transition-colors text-center w-full shadow-[0_0_20px_rgba(250,204,21,0.2)]">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-zinc-600 uppercase">
        <p>© 2026 Urban Requister. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
