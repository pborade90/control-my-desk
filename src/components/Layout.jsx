import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

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
        <h1 className="text-xl font-bold">User Management</h1>
        <div className="flex items-center space-x-4">
          {currentUser && (
            <>
              <span className="text-sm">{currentUser.email}</span>
              <button
                onClick={handleLogout}
                className="bg-highlight py-1 px-3 rounded hover:bg-red-600"
              >
                Logout
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
