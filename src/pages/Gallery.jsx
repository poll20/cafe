
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
];

const Gallery = () => {
  const [activeIdx, setActiveIdx] = useState(null);
  const [direction, setDirection] = useState(0);

  const isOpen = activeIdx !== null;

  const open = (idx) => {
    document.body.style.overflow = 'hidden';
    setDirection(0);
    setActiveIdx(idx);
  };

  const close = () => {
    document.body.style.overflow = '';
    setActiveIdx(null);
  };

  const navigate = (dir) => {
    setDirection(dir);
    setActiveIdx((prev) => (prev + dir + images.length) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, activeIdx]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir === 0 ? 0 : dir > 0 ? '100%' : '-100%',
      opacity: dir === 0 ? 0 : 1,
      scale: dir === 0 ? 0.82 : 1,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 1,
      scale: 1,
    }),
  };

  return (
    <div className="pt-10 pb-16 sm:pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-5 sm:px-6">

        <div className="text-center mb-10 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-serif font-bold text-[var(--color-cafe-dark)] mb-3 sm:mb-4"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm sm:text-base"
          >
            Glimpses of life at Aura.
          </motion.p>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-3 sm:gap-6 space-y-3 sm:space-y-6">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="break-inside-avoid overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 cursor-zoom-in"
              onClick={() => open(idx)}
            >
              <img
                src={src}
                alt={`Gallery photo ${idx + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
            />

            {/* Fullscreen shell */}
            <div className="fixed inset-0 z-50 flex flex-col ">

              {/* Top bar */}
              <motion.div
                className="flex items-center justify-between px-4 pt-safe-top pt-4 pb-2 relative z-10 border "
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <span className="text-white/50 text-sm tabular-nums">
                  {activeIdx + 1} / {images.length}
                </span>
                <motion.button
                  onClick={close}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/22 border border-white/20 flex items-center justify-center text-white touch-manipulation"
                  whileTap={{ scale: 0.88 }}
                  aria-label="Close"
                >
                  <X size={20} />
                </motion.button>
              </motion.div>

              {/* Swipeable image area */}
              <div className="flex-1  relative overflow-hidden flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIdx}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 320, damping: 34, mass: 0.9 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -55) navigate(1);
                      else if (info.offset.x > 55) navigate(-1);
                    }}
                    className="absolute inset-0 flex items-center justify-center  sm:px-20 select-none "
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={images[activeIdx]}
                      alt={`Gallery photo ${activeIdx + 1}`}
                      className="w-full h-full rounded-lg sm:rounded-2xl object-cover shadow-2xl"
                      style={{ maxHeight: 'calc(100dvh - 120px)' }}
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Desktop arrow buttons */}
                <button
                  onClick={() => navigate(-1)}
                  className="hidden sm:flex absolute left-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 items-center justify-center text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="hidden sm:flex absolute right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 items-center justify-center text-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Dot indicators */}
              <motion.div
                className="flex justify-center items-center gap-1.5 py-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
              >
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > activeIdx ? 1 : -1); setActiveIdx(i); }}
                    className={`rounded-full transition-all duration-300 touch-manipulation ${i === activeIdx
                      ? 'w-5 h-2 bg-white'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                      }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </motion.div>

            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;