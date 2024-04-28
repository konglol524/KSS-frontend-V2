"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function TextAnim({
  text,
  className,
  change,
  isFinished,
  setChange,
  setIsFinished,
  duration,
}: {
  text: string;
  className?: string;
  change: boolean;
  isFinished: boolean;
  setChange: Function;
  setIsFinished: Function;
  duration: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest: any) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  const controlRef = useRef<any>(null);

  useEffect(() => {
    if (change) {
      setIsFinished(false);
      count.set(0);
      controlRef.current = animate(count, text.length, {
        type: "tween",
        duration: duration,
        onComplete: () => {
          setChange(false);
          setIsFinished(true);
        },
      });
    } else {
      if (controlRef.current) {
        controlRef.current.stop();
      }
    }

    return () => {
      if (controlRef.current) {
        controlRef.current.stop();
      }
    };
  }, [change]);

  return <motion.span className={className}>{displayText}</motion.span>;
}
