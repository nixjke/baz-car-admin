import { Outlet, createBrowserRouter } from "react-router-dom";

import { Navigation } from "@/components";
import { LoginForm, RegistrationPage } from "@/pages";
import { CatalogCarsPage } from "@/pages/catalog-cars";
import { ProtectedRoute } from "@/shared/lib/ProtectedRoute";

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
        element: <></>,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/catalog-cars",
        element: (
          <ProtectedRoute>
            <CatalogCarsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);


