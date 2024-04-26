import axios from "axios";

export default async function addFeedback(
  promoID: string,
  token: string,
  data: object
) {
    console.log(token);
    console.log(JSON.stringify(data));
    
  const response = await axios({
    method: "POST",
    url: `${process.env.BACKEND_URL}/api/v1/feedbacks/${promoID}`,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data),
  });

  if (!(response.status >= 200 && response.status < 300)) {
    console.log(response.status);
    throw new Error("Failed to add new booking");
  }
  return response.data;
}
