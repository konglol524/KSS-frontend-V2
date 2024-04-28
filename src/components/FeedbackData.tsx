'use client'
import Image from "next/image";
import Star from "@/components/Star";
import { useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import deleteUser from "@/libs/deleteUser";
import { useRouter } from "next/navigation";
import deleteFeedback from "@/libs/deleteFeedback";
import FeedbackPopover from "@/components/FeedbackPopover"; // Import the FeedbackPopover component

interface FeedbackDataProps {
  feedbackData: any[];
  id: string;
  token: string;
  role: string;
}

const FeedbackData: React.FC<FeedbackDataProps> = ({ feedbackData, id, token, role }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(Math.ceil(feedbackData.length / itemsPerPage));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbackData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded-md transition-colors duration-300 mx-2 ${
            currentPage === i
              ? 'bg-[#FA4EAB] text-white hover:bg-[#FA4EAB]'
              : 'bg-white text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const router = useRouter();

  return (
    <div>
      {feedbackData && (
        <div>
          {currentItems.map((feedback) => {
            const profilePic = "/img/profilePicture.png";
            return (
              <div className="bg-white w-[55vw] rounded-lg mt-4 flex flex-row p-[25px] items-center justify-between" key={feedback._id}>
                <div className="flex items-center">
                  <Image
                    src={profilePic}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                    width={0}
                    height={0}
                    draggable={false}/>
                  <div className="text-left ml-6">
                    <div className="text-lg text-black font-semibold">
                      {feedback.username}
                    </div>
                    <Star stars={feedback.rating} fontsize="sm" />
                    <div className="text-base text-wrap break-all">
                      {feedback.comment}
                    </div>
                  </div>
                </div>
                <div className="">
                  <FeedbackPopover feedback={feedback} id={id} token={token} role={role} />
                </div>
              </div>
            );
          })}

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md transition-colors duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <NavigateBeforeIcon />
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= feedbackData.length}
              className="p-2 rounded-md transition-colors duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <NavigateNextIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackData;