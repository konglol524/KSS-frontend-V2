'use client'
import React, { useState } from "react";
import addFeedback from "@/libs/addFeedback";
import { Rating} from '@mui/material';

const FeedbackForm = ({ promoID, token }:{promoID:string,token:string}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(5);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addFeedback(promoID, token, { comment, rating });
      // If feedback is successfully added, clear the form and call onSuccess
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error adding feedback:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row">
      <div className="flex flex-col flex-grow">
        <div className="relative">
          <textarea
            className="bg-white w-[50vw] rounded-lg mt-4 flex flex-row p-[25px] border border-gray-300"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback..."
          />
          <div className="absolute bottom-0 right-0 mr-4 mb-4">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="bg-[#FA4EAB] rounded-lg shadow-xl py-3 text-xl text-white ml-4 self-center mt-4">Submit Feedback</button>
    </form>
  );
  
};

export default FeedbackForm;
