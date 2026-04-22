import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Coffee, Leaf, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CinematicHero from '../components/CinematicHero';
import CoffeeShowcase from '../components/Coffeeshowcase';


const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="w-full ">

      {/* Cinematic Hero Section */}
      <CinematicHero />

      {/* Highlights Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
            {[
              { icon: Coffee, title: "Artisan Coffee", desc: "Ethically sourced beans roasted to perfection daily." },
              { icon: Leaf, title: "Organic Ingredients", desc: "Fresh, local produce for our handcrafted pastries." },
              { icon: Sun, title: "Cozy Ambience", desc: "A warm, sunlit space designed for your ultimate comfort." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--color-stone-100)] flex items-center justify-center text-[var(--color-cafe-accent)] mb-4 sm:mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold mb-2 sm:mb-3 text-[var(--color-cafe-dark)]">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base max-w-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 sm:py-24 bg-[var(--color-stone-50)] overflow-hidden">
        <div className="container mx-auto px-5 sm:px-6 flex flex-col md:flex-row items-center gap-10 sm:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative group overflow-hidden rounded-2xl shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000"
              alt="Pour over coffee"
              className="w-full h-72 sm:h-96 md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <p className="text-[var(--color-cafe-accent)] uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 font-semibold">Our Story</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 text-[var(--color-cafe-dark)] leading-tight">
              More than just coffee,<br /> it's an experience.
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base max-w-lg">
              Born from a passion for the perfect brew and a love for building community. We meticulously source our beans from sustainable farms and roast them in-house. Our space is designed to be your second home—whether you're working, reading, or connecting with friends.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 pb-1 border-b-2 border-[var(--color-cafe-accent)] text-[var(--color-cafe-dark)] font-medium hover:text-[var(--color-cafe-accent)] transition-colors group text-sm sm:text-base"
            >
              Discover Our Roots
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--color-cafe-dark)] mb-3 sm:mb-4">Taste the Craft</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">A selection of our most beloved offerings, made with love.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { name: "Signature Espresso", price: "$3.50", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600" },
              { name: "Vanilla Bean Latte", price: "$5.00", img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=600" },
              { name: "Matcha Blend", price: "$5.50", img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=600" },
              { name: "Almond Croissant", price: "$4.50", img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=600" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group cursor-pointer rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-[var(--color-stone-100)]"
              >
                <div className="h-36 sm:h-52 md:h-64 overflow-hidden relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-3 sm:p-6 bg-white text-center">
                  <h3 className="font-serif text-sm sm:text-xl font-bold mb-1 sm:mb-2 leading-tight">{item.name}</h3>
                  <p className="text-[var(--color-cafe-accent)] font-medium text-sm sm:text-base">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-16">
            <Link
              to="/menu"
              className="inline-block px-8 sm:px-10 py-3.5 sm:py-4 border border-[var(--color-cafe-dark)] text-[var(--color-cafe-dark)] rounded-full hover:bg-[var(--color-cafe-dark)] hover:text-white transition-colors uppercase tracking-widest text-xs sm:text-sm font-semibold touch-manipulation"
            >
              Explore Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── Coffee Showcase: GSAP scroll-pinned cinematic animation ── */}
      <CoffeeShowcase />

      {/* Gallery Section */}
      <section className="py-16 sm:py-24 bg-[var(--color-stone-50)]">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-3">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-cafe-dark)] mb-2 sm:mb-3">Moments at Aura</h2>
              <p className="text-gray-500 text-sm sm:text-base">Capture the serenity.</p>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-[var(--color-cafe-accent)] font-medium hover:text-[var(--color-cafe-dark)] transition-colors text-sm sm:text-base">
              View full gallery <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
            ].map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`overflow-hidden rounded-xl h-40 sm:h-56 md:h-64 ${idx === 1 || idx === 2 ? 'md:mt-8' : ''}`}
              >
                <img src={img} alt="Gallery image" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-[var(--color-cafe-dark)] text-white text-center px-5 sm:px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif mb-5 sm:mb-8 text-white leading-tight">Ready for a cup?</h2>
          <p className="text-white/70 max-w-md mx-auto mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed">
            Join us today and experience the calm, the coffee, and the aesthetic.
          </p>
          <Link
            to="/contact"
            className="px-8 sm:px-10 py-3.5 sm:py-4 bg-[var(--color-cafe-accent)] text-white font-semibold rounded-full hover:brightness-110 shadow-[0_0_20px_rgba(196,164,132,0.3)] hover:shadow-[0_0_30px_rgba(196,164,132,0.5)] transition-all inline-block uppercase tracking-widest text-xs sm:text-sm touch-manipulation"
          >
            Book a Table / Visit Us
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;