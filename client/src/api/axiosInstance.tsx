import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  timeout: 50 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.response.use(
//   (response) => response, // If the response is successful, return it
//   (error) => {
//     if (error.response) {
//       console.log("response", error.response);
//       if (error.response.status === 401) {
//         toast.error("Session expired. Please login again.");
//         return Promise.reject("Unauthorized access. Please login.");
//       } else if (error.response.status === 500) {
//         return Promise.reject("Server error. Please try again later.");
//       }

//       return Promise.reject(
//         `Error: ${error.response.status} - ${
//           error.response.data.message || "An error occurred"
//         }`
//       );
//     } else if (error.request) {
//       return Promise.reject(
//         "Network error. Please check your internet connection."
//       );
//     } else {
//       return Promise.reject(`Error: ${error.message}`);
//     }
//   }
// );

export default axiosInstance;
