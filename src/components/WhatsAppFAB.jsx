
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppFAB = () => {
  return (
    <motion.a
      href="https://wa.me/1234567890?text=Hi,%20I'd%20like%20to%20visit%20your%20café"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-500 text-white rounded-full shadow-lg transition-colors hover:bg-green-600 touch-manipulation"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.6)",
            "0 0 0 16px rgba(34, 197, 94, 0)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute inset-0 rounded-full"
      />
      <MessageCircle fill="currentColor" strokeWidth={1.5} className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
    </motion.a>
  );
};

export default WhatsAppFAB;