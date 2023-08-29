import { getIssues } from "api";
import { useEffect, useState } from "react";

interface IssueItemProps {}

const IssueItem = ({}: IssueItemProps) => {
  // const [issues, setIssues] = useState([]);
  // useEffect(() => {
  //   const fetchIssues = async () => {
  //     try {
  //       const res = await getIssues();
  //       setIssues(res);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchIssues();
  // }, []);

  return (
    <li>
      <div>
        <p>Hooks + multiple instances of React </p>
        <span>2132154</span>
        <span>opened on DATE</span>
        <span>author</span>
      </div>
      <span>comments</span>
    </li>
  );
};

export default IssueItem;
