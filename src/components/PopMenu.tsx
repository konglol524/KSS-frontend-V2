import React from "react";
import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
const PopMenu = ({
  icon,
  content,
  header,
  setText,
  setChange,
  setIsFinished,
  isFinished,
  setSound,
  setDuration,
}: {
  icon: string;
  content: Array<{ content: string; text: string; sFile: string; dur: number }>;
  header: string;
  setText: Function;
  setChange: Function;
  setIsFinished: Function;
  isFinished: boolean;
  setSound: Function;
  setDuration: Function;
}) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button
        className="rounded-full z-50 w-12 h-12 inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
        aria-label="Update dimensions"
      >
        <Image src={icon} alt="icon" width={24} height={24} />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="z-50 rounded-xl p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
        side="left"
        align="start"
      >
        <div className="flex flex-col gap-y-2">
          <h1 className="text-xl font-bold">{header}</h1>
          {content.map((item: any) => (
            <p
              key={item.text}
              onClick={() => {
                setDuration(item.dur);
                setText(item.text);
                setSound(item.sFile);
                if (!isFinished) {
                  setChange(false);
                  setTimeout(() => {
                    setChange(true);
                  });
                } else {
                  setChange(true);
                }
              }}
              className="text-md w-full select-none rounded-lg hover:bg-slate-200 active:bg-slate-300"
            >
              {item.content}
            </p>
          ))}
        </div>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default PopMenu;
