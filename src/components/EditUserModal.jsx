import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, formData);
      toast.success("User updated successfully");
      onSave(user.id, formData);
      onClose();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background p-6 rounded-md w-96 shadow-lg">
        <h3 className="text-2xl font-bold text-primary mb-4">Edit User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-secondary mb-1">First Name</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-secondary mb-1">Last Name</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-secondary mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded w-full hover:bg-highlight transition"
          >
            Save Changes
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 bg-secondary text-white py-2 px-4 rounded w-full hover:bg-accent transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;
