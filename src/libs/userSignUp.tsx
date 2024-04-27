import axios from "axios";

export default async function userSignUp(formData: Object) {
  let response;

  try {
    response = await axios({
      method: "POST",
      url: `${process.env.BACKEND_URL}/api/v1/auth/register`,
      data: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!(response.status >= 200 && response.status < 300)) {
      console.log(response.status);
      throw "Failed to register";
    }
    console.log(response.data);
    return response.data;
  } catch(error) {
    console.error("error:", error);
    throw "Please recheck your input and try again.";
  }
}

//test account
//u: testuser1@gmail.com
//p: TE5st@r+
