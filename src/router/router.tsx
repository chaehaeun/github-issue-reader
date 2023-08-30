import App from "App";
import { createBrowserRouter } from "react-router-dom";
import { IssueListPage, IssueDetailPage, NotFound } from "pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <IssueListPage />,
      },
      {
        path: "issues/:id",
        element: <IssueDetailPage />,
      },
    ],
  },
]);

export default router;
