"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import TextAnim from "./TextAnim";
import { motion } from "framer-motion";
import PopMenu from "./PopMenu";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: "100%" },
};

export default function Faq() {
  const [interaction, setInteraction] = useState("idle");
  const [change, setChange] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVolume, setIsVolume] = useState("0");
  const [text, setText] = useState(
    "Welcome to DekBanJarnKim Car Rental System, where renting a car is as easy as a few clicks."
  );
  const [isFinished, setIsFinished] = useState(true);
  const [duration, setDuration] = useState(7);
  const [sound, setSound] = useState("d1");

  const audioRef = useRef<any>(null);

  let interact: NodeJS.Timeout;

  const handleInteraction = () => {
    setInteraction((prevInteraction) =>
      prevInteraction === "idle" ? "speak" : "idle"
    );
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(`/sound/${sound}.wav`);
    if (isVolume === "0") {
      audio.volume = 0;
    } else {
      audio.volume = 0.5;
    }
    audioRef.current = audio;

    if (change) {
      interact = setInterval(handleInteraction, 200);
      audio.play();
    } else {
      clearInterval(interact);
      setInteraction("idle");
    }
    return () => {
      clearInterval(interact);
    };
  }, [change]);

  useEffect(() => {
    if (audioRef.current) {
      if (isVolume === "0") {
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = 0.5;
      }
    }
  }, [isVolume]);

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={{ duration: 0.5 }}
      className="w-[400px] h-[400px] rounded-lg fixed z-30 bg-bl right-0 bottom-0  flex flex-col items-center bgz"
    >
      <div className="z-50 flex flex-col h-full justify-between absolute left-[-15%]">
        <div
          className={`flex flex-col gap-y-8 transition duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <PopMenu
            setDuration={setDuration}
            setSound={setSound}
            isFinished={isFinished}
            setIsFinished={setIsFinished}
            setText={setText}
            setChange={setChange}
            header="HELP"
            content={[
              {
                content: "What is this website?",
                text: "This website is a simple and user-friendly car rental booking system, allowing users to easily reserve cars that suit their needs.",
                sFile: "d9",
                dur: 9,
              },
              {
                content: "How do I book a car?",
                text: "To book a car, head to the car page using the top-right navigation. From there, select the car you're interested in, and you'll be directed to the booking page seamlessly.",
                sFile: "d6",
                dur: 11,
              },
              {
                content: "How do I cancel a booking?",
                text: "To cancel a booking, go to your user page using the navigation at the top right. Then, choose the booking you want to cancel and click the delete button next to it.",
                sFile: "d7",
                dur: 10,
              },
              {
                content: "How can i choose a promotion?",
                text: "To choose a promotion, pick a provider that offers the promotion when booking. Then, you can select the promotion during the booking.",
                sFile: "d8",
                dur: 8,
              },
            ]}
            icon="icon/question.svg"
          />
          <PopMenu
            setDuration={setDuration}
            setSound={setSound}
            isFinished={isFinished}
            setIsFinished={setIsFinished}
            setText={setText}
            setChange={setChange}
            header="About Me"
            content={[
              {
                content: "Who are you?",
                text: "It's wonderful to meet you! I'm Hikari Rei, your friendly guide through this enchanting website.",
                sFile: "d2",
                dur: 6,
              },
              {
                content: "What are you doing here?",
                text: "I'm here to assist you. Whether it's booking a car or answering any questions you have about our website, just let me know.",
                sFile: "d3",
                dur: 8,
              },
              {
                content: "How can I contact you?",
                text: "Curious how to reach out? 💌 Unfortunately, that's a bit beyond my abilities right now. But fear not! I'll remain your reliable assistant",
                sFile: "d4",
                dur: 10,
              },
              {
                content: "I'm going now.",
                text: "Thanks for stopping by and spending some time with me. Remember, I'm here whenever you need assistance or just want to chat.",
                sFile: "d5",
                dur: 8,
              },
            ]}
            icon="/icon/bubble.svg"
          />
          <button
            onClick={() =>
              setIsVolume((prev) => {
                if (prev === "0") return "1";
                return "0";
              })
            }
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center"
          >
            <Image
              src={`/icon/volume${isVolume}.svg`}
              width={24}
              height={24}
              alt="volume"
            />
          </button>
        </div>
        <button
          onClick={() => {
            if (!isOpen) {
              setText(
                "Welcome to DekBanJarnKim Car Rental System, where renting a car is as easy as a few clicks."
              );
              setSound("d1");
              setDuration(7);
              setChange(true);
            } else {
              setChange(false);
            }

            setIsOpen((isOpen) => !isOpen);
          }}
          className="w-12 h-12 mb-2 bg-white rounded-full border-2 border-pink-300 flex items-center justify-center"
        >
          <Image
            src={"/icon/help.svg"}
            width={0}
            height={0}
            alt="help"
            className="w-4/5 h-4/5"
          />
        </button>
      </div>
      <Image
        src={`/girl/${interaction}.png`}
        width={0}
        height={0}
        sizes="100vw"
        alt="faq"
        className="absolute h-4/5 w-auto bottom-[25%]"
      />
      <TextAnim
        duration={duration}
        setChange={setChange}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        text={text}
        change={change}
        className="h-[28%] w-4/5 absolute bottom-0 bg-slate-500 border-2 border-white rounded-xl p-2 text-white text-center"
      />
      {/* <button
        className="z-40"
        onClick={() => {
          setChange((prevChange) => !prevChange);
        }}
      >
        {change ? "Stop" : "Start"}
      </button> */}
    </motion.div>
  );
}
