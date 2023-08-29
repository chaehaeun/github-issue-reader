import App from "App";
import { createBrowserRouter } from "react-router-dom";
import { IssueList, IssueDetail, NotFound } from "pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <IssueList />,
      },
      {
        path: "issuedetail/:id",
        element: <IssueDetail />,
      },
    ],
  },
]);

export default router;
