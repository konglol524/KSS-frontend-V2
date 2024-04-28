"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPortrait, setIsPortrait] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.75,
        delay: 0.5,
      }}
    >
      {isPortrait && isMobile ? (
        <div className="w-[100vw] h-[100vh] bg-gray-300 flex flex-col items-center justify-center font-bold text-4xl">
          <p className="z-10">Please rotate your device</p>
          <Image
            src="/gif/rotMobile.gif"
            alt="rotate"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full absolute"
          />
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
}
