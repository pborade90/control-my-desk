import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditUserModal from "../components/EditUserModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // New state for total pages
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages); // Update total pages
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  // Save updated user details
  const handleSave = (id, updatedData) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedData } : user)));
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div className="p-8 bg-background min-h-screen">
      <h2 className="text-3xl font-bold text-primary mb-6">Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center"
          >
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-primary">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-sm text-secondary">{user.email}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setEditingUser(user)}
                className="bg-accent text-white py-2 px-4 rounded hover:bg-highlight"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-highlight text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${page === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-accent text-white hover:bg-highlight"
            }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md ${page === totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-accent text-white hover:bg-highlight"
            }`}
        >
          Next
        </button>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Users;
