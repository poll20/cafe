
import { useState } from 'react';
import { motion } from 'framer-motion';

const menuItems = [
  { id: 1, category: 'Coffee', name: 'Signature Espresso', price: '$3.50', desc: 'Bright, bold, and perfectly extracted.' },
  { id: 2, category: 'Coffee', name: 'Vanilla Bean Latte', price: '$5.00', desc: 'Real vanilla bean syrup, steamed milk.' },
  { id: 3, category: 'Coffee', name: 'Pour Over', price: '$4.50', desc: 'Single-origin rotation, clean and complex.' },
  { id: 4, category: 'Coffee', name: 'Macchiato', price: '$4.00', desc: 'Traditional. Espresso marked with foam.' },
  { id: 5, category: 'Beverages', name: 'Matcha Latte', price: '$5.50', desc: 'Ceremonial grade matcha, lightly sweetened.' },
  { id: 6, category: 'Beverages', name: 'Iced Peach Tea', price: '$4.00', desc: 'Refreshing black tea with peach nectar.' },
  { id: 7, category: 'Snacks', name: 'Avocado Toast', price: '$9.00', desc: 'Sourdough, chili flakes, microgreens.' },
  { id: 8, category: 'Snacks', name: 'Smoked Salmon Bagel', price: '$11.00', desc: 'Cream cheese, dill, capers.' },
  { id: 9, category: 'Desserts', name: 'Almond Croissant', price: '$4.50', desc: 'Twice-baked, almond frangipane.' },
  { id: 10, category: 'Desserts', name: 'Tiramisu', price: '$7.00', desc: 'Espresso soaked ladyfingers, mascarpone.' },
];

const categories = ['All', 'Coffee', 'Beverages', 'Snacks', 'Desserts'];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMenu = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="pt-10 pb-16 sm:pb-24 bg-[var(--color-stone-50)] min-h-screen">
      <div className="container mx-auto px-5 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-serif font-bold text-[var(--color-cafe-dark)] mb-3 sm:mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm sm:text-base"
          >
            Crafted with passion, served with love.
          </motion.p>
        </div>

        {/* Filters — horizontally scrollable on mobile */}
        <div className="mb-10 sm:mb-16">
          <div className="flex gap-2 sm:gap-4 sm:flex-wrap sm:justify-center overflow-x-auto pb-2 px-1 -mx-1 scrollbar-hide snap-x snap-mandatory">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 font-medium whitespace-nowrap flex-shrink-0 snap-start touch-manipulation ${activeCategory === cat
                  ? 'bg-[var(--color-cafe-dark)] text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-cafe-accent)] hover:text-[var(--color-cafe-accent)]'
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-6 sm:gap-y-10 max-w-5xl mx-auto">
          {filteredMenu.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className="group flex justify-between items-start border-b border-gray-200 pb-5 sm:pb-6 cursor-pointer"
            >
              <div className="pr-4 sm:pr-6">
                <h3 className="text-base sm:text-xl font-serif font-bold text-[var(--color-cafe-dark)] group-hover:text-[var(--color-cafe-accent)] transition-colors mb-1 sm:mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
              <div className="text-[var(--color-cafe-dark)] font-semibold text-base sm:text-lg shrink-0">
                {item.price}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Menu;