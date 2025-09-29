import { Outlet, createBrowserRouter } from "react-router-dom";

import { Navigation } from "@/components";
import { HomePage, LoginForm, RegistrationPage } from "@/pages";

const RootLayout = () => {
  return (
    <div className="app">
      <Navigation />
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
    ],
  },
]);


