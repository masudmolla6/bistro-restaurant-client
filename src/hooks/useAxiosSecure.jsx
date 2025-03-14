import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Request Interceptors
  axiosSecure.interceptors.request.use(function(config){
    const token = localStorage.getItem("access-token");
    // console.log("Request Stooped By interceptors Before Adding Token",token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },function(error){
    return Promise.reject(error);
  })

  // Response Interceptors
  axiosSecure.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    console.log("status error", error.response.status);
    const status = error.response.status;
    if (status === 401 || status === 403) {
      await logOut();
      navigate("/login")
    }
    return Promise.reject(error);
  })

    return axiosSecure;
};

export default useAxiosSecure;