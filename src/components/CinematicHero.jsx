import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const heroImages = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000",

];

const CinematicHero = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="dark-hero relative w-full min-h-screen flex flex-col font-sans overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 w-full h-full z-0 bg-black">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImg}
            src={heroImages[currentImg]}
            alt="Cafe Background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Glassmorphic Navigation */}
      <nav className="relative z-20 flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-1">
          {/* <span className="text-3xl tracking-tight text-white font-display" style={{ fontFamily: "var(--font-display)" }}>
            Aura Café
          </span> */}
          <sup className="text-xs text-white/70">®</sup>
        </div>

        {/* <div className="hidden md:flex items-center gap-8">
          {["Home", "Menu", "Gallery", "About", "Contact"].map((link) => (
            <Link
              key={link}
              to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
              className={`text-sm tracking-wide ${link === "Home" ? "text-white font-medium" : "text-[hsl(var(--muted-foreground))]"} hover:text-white transition-colors uppercase`}
            >
              {link}
            </Link>
          ))}
        </div> */}

        {/* <Link to="/contact" className="hidden sm:inline-flex liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] transition-transform lowercase tracking-wide font-medium">
          begin journey
        </Link> */}
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-6 pb-20">
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-[1200px] animate-fade-rise"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <em className="not-italic text-[hsl(var(--muted-foreground))] text-white">Where </em>
          <span className='text-yellow-500'>dreams rise</span>
          <br className="hidden md:block" />
          <em className="not-italic text-[hsl(var(--muted-foreground))] text-white"> through the silence.</em>
        </h1>

        <p className="text-[hsl(var(--muted-foreground))] text-white text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay font-light">
          A sanctuary for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we brew perfect moments and craft warm spaces for absolute focus.
        </p>

        <Link
          to="/menu"
          className="liquid-glass rounded-full px-14 py-5 text-base text-white mt-12 hover:scale-[1.03] cursor-pointer transition-transform animate-fade-rise-delay-2 uppercase tracking-widest"
        >
          Explore Menu
        </Link>
      </div>
    </section>
  );
};

export default CinematicHero;
