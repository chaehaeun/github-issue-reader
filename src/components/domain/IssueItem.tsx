import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Issue } from "api/type";
import { formatDateString } from "utils";
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
      <StyledIssueItem onClick={navigateToIssueDetail}>
        <div>
          <p>{title}</p>
          <span>#{number}</span>
          <span>{formatDateString(createdAt)}</span>
          <span>{author}</span>
        </div>
        <Comment>{comments}개</Comment>
      </StyledIssueItem>
      {isFifthIdx && <Add to="https://www.wanted.co.kr/">광고</Add>}
    </>
  );
};

const StyledIssueItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e1e4e8;
  cursor: pointer;
  div {
    p {
      font-weight: 500;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
    span {
      font-size: 0.8rem;
      margin-right: 0.8rem;
    }
  }
`;

const Add = styled(Link)`
  width: 100%;
  height: 100px;
  background-color: #e1e4e8;
`;

const Comment = styled.span`
  flex-shrink: 0;
`;

export default IssueItem;
