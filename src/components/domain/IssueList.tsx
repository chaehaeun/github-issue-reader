import { getIssues } from "api/octokitService";
import styled from "styled-components";
import { a11yHidden } from "globalStyles";
import { useCallback, useEffect, useRef, useState } from "react";
import { IssueItem } from "components";
import { Issue } from "api/type";
import { Link } from "react-router-dom";

const IssueList = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const isFifth = (idx: number) => (idx + 1) % 5 === 0;

  const lastIssueElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching]
  );

  useEffect(() => {
    const fetchIssues = async () => {
      setIsFetching(true);
      const res = await getIssues("facebook", "react", 20, page);
      setIssues((prevIssues) => [...prevIssues, ...res]);
      setIsFetching(false);
    };

    fetchIssues();
  }, [page]);

  return (
    <IssueListWrapper>
      <HiddenHeading>이슈 리스트 페이지</HiddenHeading>
      <ul>
        {issues.map((issue: Issue, idx: number) =>
          isFifth(idx) ? (
            <li>
              <Add
                aria-label="광고 바로가기"
                to="https://www.wanted.co.kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/portfolio-49c62.appspot.com/o/1500x500.jpg?alt=media&token=99487ca8-67ba-4a6b-af9c-d25b56fdaeb8"
                  alt=""
                />
              </Add>
            </li>
          ) : (
            <IssueItem issue={issue} key={issue.number} />
          )
        )}
      </ul>
      <div ref={lastIssueElementRef}>{isFetching ? "로딩 중..." : ""}</div>
    </IssueListWrapper>
  );
};

const HiddenHeading = styled.h1`
  ${a11yHidden}
`;

const IssueListWrapper = styled.main`
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    list-style: none;
  }
  p {
    margin: 0;
  }
`;
const Add = styled(Link)`
  display: block;
  width: 100%;
  height: 200px;
  background-color: #e1e4e8;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default IssueList;
