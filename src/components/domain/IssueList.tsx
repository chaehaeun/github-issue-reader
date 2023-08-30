import { getIssues } from "api/octokitService";
import styled from "styled-components";
import { a11yHidden } from "globalStyles";
import { useCallback, useEffect, useRef, useState } from "react";
import { IssueItem } from "components";
import { Issue } from "api/type";

const IssueList = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);
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
        {issues.map((issue: Issue, idx: number) => (
          <IssueItem issue={issue} idx={idx} key={idx} />
        ))}
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
  }
  p {
    margin: 0;
  }
`;

export default IssueList;
