import { useNavigate } from "react-router-dom";
import { Issue } from "api/type";
interface IssueListProps {
  issue: Issue;
  idx: number;
}

const IssueItem = ({ issue, idx }: IssueListProps) => {
  const { number, comments, createdAt, title, author } = issue;

  const navigate = useNavigate();
  const isFifthIdx = (idx + 1) % 5 === 0;

  const navigateToIssueDetail = () => {
    navigate(`/issues/${number}`);
  };

  return (
    <>
      <li onClick={navigateToIssueDetail}>
        <div>
          <p>{title}</p>
          <span>#{number}</span>
          <span>{createdAt}</span>
          <span>{author}</span>
        </div>
        <span>{comments}개</span>
      </li>
      {isFifthIdx && <div>광고</div>}
    </>
  );
};

export default IssueItem;
