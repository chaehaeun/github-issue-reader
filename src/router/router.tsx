import App from "App";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { IssueListPage, NotFound } from "pages";

const LazyDetail = lazy(() => import("pages/IssueDetailPage"));

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
        element: (
          <Suspense fallback={<p>loading...</p>}>
            <LazyDetail />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
