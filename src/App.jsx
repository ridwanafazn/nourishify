import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signin from "./page/Signin";
import Hero from "./page/Hero";
import UserProfile from "./page/UserProfile";
import AdminSignin from "./page/admin/AdminSignin";
import AdminStudentOrder from "./page/admin/AdminStudentOrder";
import AdminMenu from "./page/admin/AdminMenu";
import AdminManage from "./page/admin/AdminManage";
import StudentDashboard from "./page/StudentDashboard";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
  },
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/admin/login",
    element: <AdminSignin />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminStudentOrder />,
  },
  {
    path: "/admin/menu",
    element: <AdminMenu />,
  },
  {
    path: "/admin/manage",
    element: <AdminManage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
