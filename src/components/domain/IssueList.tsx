import { getIssues } from "api/octokitService";
import styled from "styled-components";
import { a11yHidden } from "globalStyles";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { IssueItem } from "components";
import { Issue } from "api/type";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const isFourth = (idx: number) => (idx + 1) % 4 === 0;

const IssueList = () => {
  const [data, setData] = useState<{
    issues: Issue[];
    hasNext: boolean;
  }>({
    issues: [],
    hasNext: true,
  });
  const { issues, hasNext } = data;
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
      if (!hasNext) return;
      setIsFetching(true);
      try {
        const fetchedIssues = await getIssues(20, page);

        const newHasNext = fetchedIssues.length === 20;
        setData((prevData) => ({
          issues: [...prevData.issues, ...fetchedIssues],
          hasNext: newHasNext,
        }));
      } catch {
        alert("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchIssues();
  }, [page, hasNext]);

  return (
    <IssueListWrapper>
      <HiddenHeading>이슈 리스트 페이지</HiddenHeading>
      <ul>
        {issues.map((issue: Issue, idx: number) => (
          <Fragment key={`${issue.number}-${idx}`}>
            <IssueItem issue={issue} />
            {isFourth(idx) && (
              <li>
                <Ad
                  aria-label="광고 바로가기"
                  to="https://www.wanted.co.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/portfolio-49c62.appspot.com/o/1500x500.jpg?alt=media&token=99487ca8-67ba-4a6b-af9c-d25b56fdaeb8"
                    alt="광고 이미지"
                  />
                </Ad>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
      <div ref={lastIssueElementRef}>
        {isFetching ? (
          <Loading>
            <ClipLoader color="#000" loading size={10} />
            로딩 중...
          </Loading>
        ) : null}
      </div>
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
const Ad = styled(Link)`
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

const Loading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 1rem;
`;

export default IssueList;
