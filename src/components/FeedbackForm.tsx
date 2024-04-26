'use client'
import React, { useState } from "react";
import addFeedback from "@/libs/addFeedback";

const FeedbackForm = ({ promoID, token }:{promoID:string,token:string}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

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
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your feedback..."
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.valueAsNumber)}
        min={0}
        max={5}
        step={0.5}
        placeholder="Rating (0-5)"
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
