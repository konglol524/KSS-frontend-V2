"use client";

import { motion, AnimatePresence } from "framer-motion";

export default async function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence initial={true}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.75,
          delay: 0.5,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
