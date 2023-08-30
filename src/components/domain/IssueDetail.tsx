import { useEffect, useState } from "react";
import { getIssueDetail } from "api/octokitService";
import { useParams } from "react-router-dom";
import { formatDateString } from "utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IssueDetail } from "api/type";

const IssueDetailPage = () => {
  const [issue, setIssue] = useState<IssueDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchIssueDetail = async () => {
      setIsLoading(true);
      try {
        const res = await getIssueDetail(+id);
        setIssue(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssueDetail();
  }, [id]);

  return (
    <main>
      <h2>이슈 디테일 페이지</h2>
      {isLoading && <p>로딩 중...</p>}
      {!isLoading && !issue && <p>데이터가 없습니다.</p>}
      {!isLoading && issue && (
        <>
          <div>
            <div>
              <img src={issue.authorAvatar} alt={issue.authorName} />
            </div>
            <div>
              <p>
                <span>#{issue.number}</span>
                <span>{issue.title}</span>
              </p>
              <p>
                <span>작성자 {issue.authorName}</span>
                <span>작성일 {formatDateString(issue.createdAt)}</span>
              </p>
            </div>
          </div>
          {typeof issue.body === "string" && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {issue.body}
            </ReactMarkdown>
          )}
        </>
      )}
    </main>
  );
};

export default IssueDetailPage;
