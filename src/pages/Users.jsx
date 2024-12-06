// React imports
import { useState, useEffect } from "react";

// Library imports
import axios from "axios"; // For API calls
import { toast } from "react-toastify"; // For notifications

// Component imports
import EditUserModal from "../components/EditUserModal"; // Modal for editing user details

// Icon imports from Heroicons
import {
  ArrowLeftIcon, // Icon for the "Previous" button
  ArrowRightIcon, // Icon for the "Next" button
  PencilSquareIcon, // Icon for the "Edit" button
  TrashIcon, // Icon for the "Delete" button
} from "@heroicons/react/20/solid";

/**
 * Users Component
 * Displays a list of users with functionalities to edit, delete, and search users,
 * as well as paginate through the user list.
 */
const Users = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);
  // Current page of users
  const [page, setPage] = useState(1);
  // Total number of pages (from the API)
  const [totalPages, setTotalPages] = useState(1);
  // User currently being edited
  const [editingUser, setEditingUser] = useState(null);
  // Search term for filtering users
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Fetches users from the API for the current page.
   */
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data); // Update users list
      setTotalPages(response.data.total_pages); // Update total pages
    } catch (error) {
      toast.error("Failed to fetch users."); // Show error notification
    }
  };

  /**
   * Runs whenever `page` changes to fetch new users
   * and scrolls to the top of the page.
   */
  useEffect(() => {
    fetchUsers();
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Enables smooth scrolling to the top
    });
  }, [page]);

  /**
   * Deletes a user from the API and updates the state.
   * @param {number} id - ID of the user to delete.
   */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // Remove user from state
      toast.success("User deleted successfully!"); // Show success notification
    } catch (error) {
      toast.error("Failed to delete user."); // Show error notification
    }
  };

  /**
   * Saves the updated user details to the state.
   * @param {number} id - ID of the user being updated.
   * @param {object} updatedData - New user data.
   */
  const handleSave = (id, updatedData) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedData } : user)));
  };

  /**
   * Filters the users list based on the search term.
   */
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-background min-h-screen">
      <h2 className="text-3xl font-bold text-primary mb-6">Users</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-primary rounded-md"
        />
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center"
            >
              {/* User Avatar */}
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-20 h-20 rounded-full mb-4"
              />
              {/* User Name */}
              <h3 className="text-lg font-semibold text-primary">
                {user.first_name} {user.last_name}
              </h3>
              {/* User Email */}
              <p className="text-sm text-secondary">{user.email}</p>
              {/* Action Buttons: Edit and Delete */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setEditingUser(user)} // Open edit modal
                  className="flex items-center gap-2 bg-accent text-white py-2 px-4 rounded-lg hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  <PencilSquareIcon width={20} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(user.id)} // Delete user
                  className="flex items-center gap-2 bg-highlight text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
                >
                  <TrashIcon width={20} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-secondary">No users found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Go to previous page
          disabled={page === 1} // Disable if on first page
          className={`flex items-center gap-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-accent text-white hover:bg-highlight focus:ring-accent"
            }`}
        >
          <ArrowLeftIcon width={20} />
          <span>Previous</span>
        </button>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))} // Go to next page
          disabled={page === totalPages} // Disable if on last page
          className={`flex items-center gap-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-accent text-white hover:bg-highlight focus:ring-accent"
            }`}
        >
          <span>Next</span>
          <ArrowRightIcon width={20} />
        </button>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          user={editingUser} // Pass user to be edited
          onClose={() => setEditingUser(null)} // Close modal
          onSave={handleSave} // Save changes
        />
      )}
    </div>
  );
};

export default Users;
