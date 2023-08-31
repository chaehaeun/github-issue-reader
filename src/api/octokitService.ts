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
  } catch (error) {
    console.error(`#${issueNumber}:`, error);
    throw error;
  }
};
