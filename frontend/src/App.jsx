import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./ui/Loader";
const Login = lazy(() => import("./features/user/Login"));
const AppLayout = lazy(() => import("./ui/AppLayout"));
const Error = lazy(() => import("./ui/Error"));
const InfoCard = lazy(() => import("./ui/InfoCard"));
const Register = lazy(() => import("./features/user/Register"));
const Profile = lazy(() => import("./features/user/Profile"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <InfoCard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />;
    </Suspense>
  );
};

export default App;
