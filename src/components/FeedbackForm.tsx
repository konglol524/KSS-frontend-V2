"use client";
import React, { useState } from "react";
import addFeedback from "@/libs/addFeedback";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { IoMdSend } from "react-icons/io";

const FeedbackForm = ({
  promoID,
  token,
}: {
  promoID: string;
  token: string;
}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(5);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addFeedback(promoID, token, { comment, rating });
      // If feedback is successfully added, clear the form and call onSuccess
      setComment("");
      setRating(0);
      router.refresh();
    } catch (error) {
      console.error("Error adding feedback:", error);
      // Handle error
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row w-[100%] h-[100%] ml-6"
    >
      <div className="w-[90%] h-[100%] text-left">
        <Rating
          name="simple-controlled"
          value={rating}
          precision={0.5}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <TextField
          className="bg-white w-[100%] border border-gray-300"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback..."
          id="standard-basic"
          variant="standard"
          fullWidth
          inputProps={{
            style: {
              padding: 0,
            },
          }}
        />
      </div>
      <div className="flex justify-center items-center w-[10%]">
        <button
          title="send"
          type="submit"
          className="bg-[#FA4EAB] rounded-lg shadow-xl text-center text-sm text-white w-9 h-9 flex items-center justify-center duration-200 hover:opacity-80 hover:scale-110"
        >
          <IoMdSend />
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
