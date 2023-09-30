import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "../contexts/UserContext";
import ContentLayout from "./ContentLayout";
const AppLayout = () => {
  return (
    <UserProvider>
      <div className="flex h-screen w-screen flex-col items-center justify-start bg-slate-50">
        <Navbar />
        <ContentLayout />
        <ToastContainer />
      </div>
    </UserProvider>
  );
};
export default AppLayout;
