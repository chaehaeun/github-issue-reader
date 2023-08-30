import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import GlobalStyles from "globalStyles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>
  // </React.StrictMode>
);
