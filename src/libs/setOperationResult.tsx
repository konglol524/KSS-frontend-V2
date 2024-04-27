import { Dispatch, SetStateAction } from "react";

export default function setOperationResult(
  resultChildren: Array<OperationResult>,
  setResultChildren: Dispatch<SetStateAction<OperationResult[]>>,
  responseData: { success: boolean; text: string }
) {
  const key = Date.now(); // Use the current timestamp as the unique key
  const newResult = {
    key,
    isVisible: false, // Initially set isVisible to false
    props: { valid: responseData.success, text: responseData.text },
  };

  setResultChildren((prevChildren) => [...prevChildren, newResult]);

  // Show the new result after a short delay
  setTimeout(() => {
    setResultChildren((prevChildren) =>
      prevChildren.map((result) =>
        result.key === key ? { ...result, isVisible: true } : result
      )
    );
  }, 300);

  setTimeout(() => {
    setResultChildren((prevChildren) => prevChildren.slice(1));
  }, 3300); // Change the delay to 1800ms
}