import { getIssues } from "api/octokitService";
import { useEffect, useState } from "react";
import { IssueItem } from "components";
import { Issue } from "../../api/type";

const IssueList = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const res = await getIssues();
      setIssues(res);
    };

    fetchIssues();
  }, []);

  return (
    <ul>
      {issues.map((issue: Issue, idx: number) => (
        <IssueItem issue={issue} idx={idx} key={issue.id} />
      ))}
    </ul>
  );
};

export default IssueList;
