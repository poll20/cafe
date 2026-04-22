
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-10 pb-16 sm:pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-5 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-serif font-bold text-[var(--color-cafe-dark)] mb-3 sm:mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm sm:text-base"
          >
            We'd love to hear from you.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 flex flex-col gap-6 sm:gap-8"
          >
            {[
              {
                icon: MapPin,
                title: "Visit Us",
                content: <p className="text-gray-600 text-sm sm:text-base">123 Serenity Lane,<br /> Brewville, CO 80202</p>
              },
              {
                icon: Phone,
                title: "Call Us",
                content: <p className="text-gray-600 text-sm sm:text-base">+1 (555) 123-4567</p>
              },
              {
                icon: Mail,
                title: "Email Us",
                content: <p className="text-gray-600 text-sm sm:text-base">hello@auracafe.com</p>
              }
            ].map(({ icon: Icon, title, content }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--color-stone-100)] flex items-center justify-center text-[var(--color-cafe-accent)] shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[var(--color-cafe-dark)] mb-1 sm:mb-2">{title}</h3>
                  {content}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3"
          >
            <form className="bg-[var(--color-stone-50)] p-6 sm:p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-cafe-accent)] focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Your Email</label>
                  <input
                    type="email"
                    className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-cafe-accent)] focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-cafe-accent)] focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="How can we help?"
                />
              </div>
              <div className="mb-6 sm:mb-8">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-cafe-accent)] focus:border-transparent transition-all text-sm sm:text-base resize-none"
                  placeholder="Tell us more..."
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 bg-[var(--color-cafe-dark)] text-white rounded-lg hover:bg-[var(--color-cafe-accent)] hover:shadow-lg transition-all duration-300 font-medium tracking-widest uppercase text-xs sm:text-sm group touch-manipulation"
              >
                Send Message
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;