import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./context/AuthContext";

// Layout component that provides AuthContext
const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> }
    ]
  }
]);

export default function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}