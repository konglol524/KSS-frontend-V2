import axios from "axios";

export default async function getProfilePicturebyId(uid: string) {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.BACKEND_URL}/api/v1/upload/profile/${uid}`,
    });

    if (!(response.status >= 200 && response.status < 300)) {
      console.log(response.status);
      throw new Error("Failed to fetch profile picture");
    }
    return response.data;
  } catch (error: any) {
      console.error("Profile picture not found, using default picture");
      return {
        data: {
          profilePic: "/img/profilePicture.png"
        }
      };
  }
}