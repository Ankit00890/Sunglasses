import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OurStory = ({ setIsNavOpen }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="relative w-full bg-zinc-950 text-white selection:bg-yellow-400 selection:text-zinc-950 overflow-x-hidden">
      <Navbar setIsNavOpen={setIsNavOpen} />

      {/* HERO SECTION */}
      <section className="relative w-full h-[90vh] flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/our_story_hero.png"
            alt="Urban Requisite Hero"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>

        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-none"
          >
            Urban <br />
            <span className="text-yellow-400">Requisite</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 text-sm md:text-lg font-bold tracking-[0.3em] uppercase text-zinc-400"
          >
            Seen in shadows. Defined by light.
          </motion.p>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-yellow-400 to-transparent"></div>
        </motion.div>
      </section>

      {/* NARRATIVE SECTION: THE GENESIS */}
      <section className="py-32 px-6 md:px-24 grid md:grid-cols-2 gap-16 items-center border-t border-zinc-900">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black italic uppercase italic">
            01. <br />
            The Urban Genesis
          </motion.h2>
          <motion.div variants={itemVariants} className="h-[2px] w-24 bg-yellow-400"></motion.div>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
            Founded in the heart of the concrete jungle, Urban Requisite was born from a simple observation: eyewear had become a mask, not a statement.
          </motion.p>
          <motion.p variants={itemVariants} className="text-lg text-zinc-500 leading-relaxed">
            We didn't set out to follow the light. We set out to master it. Our frames are designed for the navigators of the urban landscape—those who request more than just utility from their aesthetic.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative aspect-square md:aspect-auto md:h-[600px] overflow-hidden group"
        >
          <img
            src="/images/our_story_vision.png"
            alt="The Vision"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 border-[12px] border-zinc-950 p-6 pointer-events-none">
             <div className="w-full h-full border border-yellow-400/30"></div>
          </div>
        </motion.div>
      </section>

      {/* CORE PHILOSOPHY */}
      <section className="bg-zinc-900/30 py-32 px-6 md:px-24">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-yellow-400 font-bold uppercase tracking-[0.5em] text-xs"
          >
            The Requisite Ethos
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black italic leading-tight"
          >
            "WE DON'T JUST SELL GLASSES. WE DEFINE HOW THE WORLD SEES YOU."
          </motion.h3>
        </div>
      </section>

      {/* CRAFT SECTION */}
      <section className="py-32 px-6 md:px-24 border-t border-zinc-900">
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-2xl font-black italic uppercase text-yellow-400">Materials</h4>
            <p className="text-zinc-500 leading-relaxed">
              Aerospace-grade titanium and handcrafted Japanese acetate. Built to endure the friction of city life.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-2xl font-black italic uppercase text-yellow-400">Optics</h4>
            <p className="text-zinc-500 leading-relaxed">
               Polarized clarity that cuts through the metropolis haze. Every lens is laser-etched with the Requisite seal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-2xl font-black italic uppercase text-yellow-400">Philosophy</h4>
            <p className="text-zinc-500 leading-relaxed">
              Each piece is limited. We don't mass-produce compliance. We engineer rebellion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="pb-32 pt-16 px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="border-2 border-yellow-400 p-12 md:p-24 inline-block relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-yellow-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          <Link to="/collections" className="relative z-10 text-4xl md:text-7xl font-black italic uppercase tracking-tighter group-hover:text-zinc-950 transition-colors">
            SHOP THE STORY
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default OurStory;

