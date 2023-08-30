const IssueItem = ({ issue, idx }: any) => {
  const { number, comments, createdAt, title, author } = issue;
  const isFifthIdx = (idx + 1) % 5 === 0;

  return (
    <>
      <li>
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
