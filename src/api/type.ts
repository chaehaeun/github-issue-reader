export type Issue = {
  id: number;
  title: string;
  number: number;
  comments: number;
  createdAt: string;
  author: string | undefined;
};

export type IssueDetail = {
  authorAvatar: string | undefined;
  authorName: string | undefined;
  body: string | undefined | null;
  comments: number;
  createdAt: string;
  number: number;
  title: string;
};
