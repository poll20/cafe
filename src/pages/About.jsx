
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-10 pb-16 sm:pb-20">
      <div className="container mx-auto px-5 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[var(--color-cafe-dark)] mb-4 sm:mb-6">Our Story</h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Every great cup of coffee has a beginning. Ours started with a simple dream: to create a space of serenity in a bustling world.
          </p>
        </motion.div>

        {/* Content Block */}
        <div className="flex flex-col md:flex-row gap-10 sm:gap-16 items-center mb-20 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <img
              src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=1000"
              alt="Coffee beans"
              className="rounded-2xl shadow-2xl w-full h-64 sm:h-96 md:h-[500px] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[var(--color-cafe-dark)] mb-4 sm:mb-6">A Passion for Purity</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              We travel the world to find the most ethical, sustainable, and pure coffee beans. We believe that behind every flavor profile is the hard work of farmers who care deeply for their crops.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Our roasting process is done in-house, ensuring that the natural aromas and oils are perfectly balanced, delivering a smooth, bright, and bold experience in every sip.
            </p>
          </motion.div>
        </div>

        {/* Quote Block */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--color-cafe-dark)] rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-20 text-center text-white"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-4 sm:mb-6">"Aura" — An Atmosphere</h2>
          <p className="max-w-2xl mx-auto text-white/80 leading-relaxed text-sm sm:text-base md:text-lg">
            We chose the name Aura because a café should be more than just a place to get caffeine. It should be a feeling. A warm, enveloping atmosphere that resets your mind and allows you to just be.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default About;