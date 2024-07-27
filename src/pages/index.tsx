import { createHashRouter, RouterProvider } from "react-router-dom";
import { defaultTheme, Provider as ThemeProvider } from "@adobe/react-spectrum";
import { Home } from "./home";
import { Error } from "./error";
import { About } from "./about";
import { Layout } from "./layout";
import "../styles/global.css";

// Since this is a client-only application, use `createHashRouter
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export function App(): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
