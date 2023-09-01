import { Octokit } from "@octokit/rest";

const REPO = "react";
const OWNER = "facebook";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN,
});

export const getIssues = async (per_page = 20, page = 1) => {
  const response = await octokit.rest.issues.listForRepo({
    owner: OWNER,
    repo: REPO,
    state: "open",
    sort: "comments",
    per_page,
    page,
  });

  const data = response.data.map((issue) => ({
    id: issue.id,
    title: issue.title,
    number: issue.number,
    author: issue.user?.login,
    comments: issue.comments,
    createdAt: issue.created_at,
  }));

  return data;
};

export const getIssueDetail = async (issueNumber: string) => {
  const issue_number = Number(issueNumber);
  if (isNaN(issue_number)) {
    throw new Error("잘못된 접근입니다.");
  }

  const response = await octokit.rest.issues.get({
    owner: OWNER,
    repo: REPO,
    issue_number,
  });

  if (response.status !== 200) {
    throw new Error("이슈를 불러오는데 실패했습니다.");
  }
  if (response.data.pull_request) {
    throw new Error("해당 페이지는 이슈가 아닙니다.");
  }
  if (response.data.state !== "open") {
    throw new Error("해당 이슈는 닫혀있습니다.");
  }

  const data = {
    number: response.data.number,
    title: response.data.title,
    authorName: response.data.user?.login,
    authorAvatar: response.data.user?.avatar_url,
    comments: response.data.comments,
    createdAt: response.data.created_at,
    body: response.data.body,
  };

  return data;
};
