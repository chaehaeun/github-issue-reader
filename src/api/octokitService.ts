import { Octokit } from "@octokit/rest";
import { Issue } from "./type";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN,
});

export const getIssues = async (
  owner = "facebook",
  repo = "react"
): Promise<Issue[]> => {
  try {
    const response = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: "open",
      sort: "comments",
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getIssueDetail = async (
  issueNumber: number,
  owner = "facebook",
  repo = "react"
) => {
  try {
    const response = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number: issueNumber,
    });
    return response.data;
  } catch (error) {
    console.error(`#${issueNumber}:`, error);
    throw error;
  }
};
