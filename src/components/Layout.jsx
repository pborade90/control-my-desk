// React Router DOM imports for navigation functionality
import { useNavigate } from "react-router-dom";

// Importing custom authentication context
import { useAuth } from "../context/AuthContext";

// Importing external libraries
import { toast } from "react-toastify"; // For user notifications
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid"; // Icon for logout button

/**
 * Layout Component
 * This is a layout wrapper component that includes:
 * - A persistent navigation bar
 * - A dynamic main content area (children)
 * - Authentication context integration
 */
const Layout = ({ children }) => {
  // Accessing authentication-related functionality from the custom AuthContext
  const { currentUser, logout } = useAuth();

  // React Router's navigation function
  const navigate = useNavigate();

  /**
   * Handle logout functionality:
   * - Logs out the user
   * - Displays a success toast
   * - Navigates back to the login page
   */
  const handleLogout = () => {
    logout(); // Clear user data from context
    toast.success("Logged out successfully!"); // Show logout notification
    navigate("/"); // Redirect to the home/login page
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Section */}
      <nav className="bg-primary text-white p-4 flex justify-between items-center">
        {/* App Title: Shows full name on larger screens and short name (CMD) on smaller screens */}
        <h1 className="p-2 text-xl font-sans font-bold antialiased border-2 border-solid border-white rounded-2xl">
          <span className="hidden sm:inline">ControlMyDesk</span> {/* Visible on screens `sm` and larger */}
          <span className="inline sm:hidden">CMD</span> {/* Visible on smaller screens */}
        </h1>

        {/* User and Logout Button */}
        <div className="flex items-center space-x-4">
          {/* Display email of logged-in user if user is authenticated */}
          {currentUser && (
            <>
              {/* Display current user's email */}
              <span className="text-sm">{currentUser.email}</span>

              {/* Logout Button */}
              <button
                onClick={handleLogout} // Logout logic when button is clicked
                className="flex items-center gap-2 bg-highlight py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
              >
                {/* Logout Icon */}
                <ArrowRightStartOnRectangleIcon width={20} />
                {/* Button Label */}
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content Section */}
      <main className="flex-grow p-6 bg-background">
        {/* Dynamic children content passed to the Layout component */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
