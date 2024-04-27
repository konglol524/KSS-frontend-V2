"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="h-[90vh] w-screen flex flex-col items-center justify-center select-none">
      <motion.div
        className="flex flex-col items-center justify-center rounded-full h-[60vh] w-[60vh] border-4 border-dashed border-pink-400 absolute"
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
      ></motion.div>
      <motion.svg
        id="cut-circle"
        viewBox={"0 0 100 100"}
        className="flex flex-col items-center justify-center rounded-full h-[50vh] w-[50vh] absolute"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "linear",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="50"
          stroke="#f42e9b"
          strokeWidth={4}
          fill="none"
        ></circle>
      </motion.svg>
      <div className="flex text-9xl font-bold text-zinc-800">
        <span className="">キ</span>
        <span className="">ム</span>
      </div>
      <div className="flex text-8xl gap-x-6 font-bold text-zinc-800">
        <span className="">先</span>
        <span className="">生</span>
      </div>
      <div className="text-3xl pt-2 dekbanjarnkim animate-text-gradient">
        Loading...
      </div>
    </div>
  );
}
