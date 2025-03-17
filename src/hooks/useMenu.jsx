import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  // const [menu, setMenu] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //     fetch("https://bistro-boss-server-alpha-nine.vercel.app/menu")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setLoading(false);
  //         setMenu(data);
  //       });
  // }, [])

  const {
    data: menu = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu");
      return res.data;
    },
  });
  return [menu, loading, refetch];
};

export default useMenu;
