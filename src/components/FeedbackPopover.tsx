import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import deleteUser from '@/libs/deleteUser';
import deleteFeedback from '@/libs/deleteFeedback';
import { useRouter } from 'next/navigation';

interface FeedbackPopoverProps {
  feedback: any;
  id: string;
  token: string;
  role: string;
}

const FeedbackPopover: React.FC<FeedbackPopoverProps> = ({ feedback, id, token, role }) => {
  const router = useRouter();
  const [showPopover, setShowPopover] = useState(false);

  const handleDeleteUser = async () => {
    await deleteUser(token, feedback.user);
    router.refresh();
  };

  const handleDeleteFeedback = async () => {
    await deleteFeedback(token, feedback._id);
    router.refresh();
  };

  return (
    <div className="relative">
      <button onClick={() => setShowPopover(!showPopover)}>
        <MoreHorizIcon className="text-gray-500 hover:text-gray-700 rotate-90" />
      </button>

      {showPopover && (
        <div className="ml-5 absolute z-10 bg-white rounded-md shadow-lg p-2">
          {role === 'admin' && feedback.user !== id && (
            <button
              className="w-full text-left px-2 py-1 hover:bg-gray-100 flex items-center"
              onClick={handleDeleteUser}
            >
              <PersonRemoveIcon className="mr-2" />
              Delete User
            </button>
          )}
          {(feedback.user === id || role === 'admin') && (
            <button
              className="w-full text-left px-2 py-1 hover:bg-gray-100 flex items-center"
              onClick={handleDeleteFeedback}
            >
              <DeleteIcon className="mr-2" />
              Delete Feedback
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackPopover;