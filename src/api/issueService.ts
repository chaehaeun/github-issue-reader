import { axiosInstance } from "api";

export const getIssues = async () => {
  const res = await axiosInstance.get("/issues", {
    params: {
      state: "open",
      sort: "comments",
    },
  });
  return res.data;
};
