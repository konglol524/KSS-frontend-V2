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
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
