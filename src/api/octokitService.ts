import { Octokit } from "@octokit/rest";

const REPO = "react";
const OWNER = "facebook";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN,
});

export const getIssues = async (perPage = 20, page = 1) => {
  const response = await octokit.rest.issues.listForRepo({
    owner: OWNER,
    repo: REPO,
    state: "open",
    sort: "comments",
    per_page: perPage,
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

export const getIssueDetail = async (issueNumber: number) => {
  try {
    const response = await octokit.rest.issues.get({
      owner: OWNER,
      repo: REPO,
      issue_number: issueNumber,
    });

    switch (true) {
      case response.status !== 200:
        throw new Error("해당 이슈를 불러올 수 없거나 잘못된 접근입니다.");
      case !!response.data.pull_request:
        throw new Error("해당 페이지는 이슈가 아닙니다.");
      case response.data.state !== "open":
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
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error("잘못된 접근입니다.");
    }
    throw error;
  }
};
