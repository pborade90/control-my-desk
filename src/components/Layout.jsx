import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-primary text-white p-4 flex justify-between items-center">
        {/* Responsive h1 for different screen sizes */}
        <h1 className="p-2 text-xl font-sans font-bold antialiased border-2 border-solid border-white rounded-2xl">
          <span className="hidden sm:inline">ControlMyDesk</span>
          <span className="inline sm:hidden">CMD</span>
        </h1>
        <div className="flex items-center space-x-4">
          {currentUser && (
            <>
              <span className="text-sm">{currentUser.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-highlight py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
              >
                <ArrowRightStartOnRectangleIcon width={20} />
                <span>Logout</span>
              </button>

            </>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow p-6 bg-background">{children}</main>
    </div>
  );
};

export default Layout;
