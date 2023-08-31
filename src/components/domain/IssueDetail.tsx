import { useEffect, useState } from "react";
import styled from "styled-components";
import { getIssueDetail } from "api/octokitService";
import { useParams } from "react-router-dom";
import { formatDateString } from "utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IssueDetail } from "api/type";
import { a11yHidden } from "globalStyles";

const IssueDetailPage = () => {
  const [issue, setIssue] = useState<IssueDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchIssueDetail = async () => {
      setIsLoading(true);
      try {
        const res = await getIssueDetail(id);
        setIssue(res);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssueDetail();
  }, [id]);

  return (
    <IssueDetailWrapper>
      <HiddenHeading>이슈 디테일 페이지</HiddenHeading>
      {isLoading && <AlertMessage>로딩 중...</AlertMessage>}
      {!isLoading && !issue && <AlertMessage>{error}</AlertMessage>}
      {!isLoading && issue && (
        <>
          <IssueDetailHeaderWrap>
            <IssueDetailHeader>
              <AuthorAvatar>
                <img src={issue.authorAvatar} alt={issue.authorName} />
              </AuthorAvatar>
              <div>
                <IssueDetailHeaderTitle>
                  <span>#{issue.number}</span>
                  <span>{issue.title}</span>
                </IssueDetailHeaderTitle>
                <IssueDetailSub>
                  <span>작성자 {issue.authorName}</span>
                  <span>작성일 {formatDateString(issue.createdAt)}</span>
                </IssueDetailSub>
              </div>
            </IssueDetailHeader>
            <Comment>{issue.comments}개</Comment>
          </IssueDetailHeaderWrap>
          {typeof issue.body === "string" && (
            <IssueDetailBody>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {issue.body}
              </ReactMarkdown>
            </IssueDetailBody>
          )}
        </>
      )}
    </IssueDetailWrapper>
  );
};

const HiddenHeading = styled.h1`
  ${a11yHidden}
`;

const IssueDetailWrapper = styled.main`
  height: 100%;
`;

const IssueDetailHeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e1e4e8;
`;

const IssueDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  p {
    margin: 0;
  }
`;

const AuthorAvatar = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    max-width: 100%;
  }
`;

const IssueDetailHeaderTitle = styled.p`
  font-size: 24px;
  span {
    margin-right: 0.5rem;
  }
`;

const IssueDetailSub = styled.p`
  font-size: 14px;
  display: flex;
  gap: 0.5rem;
`;

const IssueDetailBody = styled.div`
  padding: 1rem;
  img {
    width: 100%;
  }
`;

const AlertMessage = styled.p`
  text-align: center;
  margin-top: 2rem;
`;

const Comment = styled.span`
  flex-shrink: 0;
`;

export default IssueDetailPage;
