// React imports
import { useState } from "react";

// Library imports
import axios from "axios"; // For making HTTP requests
import { toast } from "react-toastify"; // For showing notifications

/**
 * EditUserModal Component
 * A modal that allows editing a user's details (first name, last name, and email).
 *
 * Props:
 * - `user`: The user object containing current details.
 * - `onClose`: Function to close the modal.
 * - `onSave`: Function to handle the saving of updated user details.
 */
const EditUserModal = ({ user, onClose, onSave }) => {
  // State to manage form data for editing the user
  const [formData, setFormData] = useState({
    first_name: user.first_name, // Initial first name from user prop
    last_name: user.last_name,   // Initial last name from user prop
    email: user.email,           // Initial email from user prop
  });

  /**
   * Handle input changes in the form.
   * Updates the corresponding field in the `formData` state.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submission.
   * - Sends an HTTP PUT request to update the user details.
   * - Displays success or error notifications using `toast`.
   * - Calls `onSave` with the updated details and closes the modal.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    try {
      // Making an API call to update user details
      await axios.put(`https://reqres.in/api/users/${user.id}`, formData);

      // Show success message
      toast.success("User updated successfully");

      // Pass updated user details to parent component
      onSave(user.id, formData);

      // Close the modal
      onClose();
    } catch (error) {
      // Show error message on failure
      toast.error("Failed to update user");
    }
  };

  return (
    // Modal container (covers the entire screen with a semi-transparent background)
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {/* Modal content */}
      <div className="bg-background p-6 rounded-md w-96 shadow-lg">
        {/* Modal Header */}
        <h3 className="text-2xl font-bold text-primary mb-4">Edit User</h3>

        {/* Form for editing user details */}
        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="mb-4">
            <label className="block text-sm text-secondary mb-1">First Name</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Last Name Field */}
          <div className="mb-4">
            <label className="block text-sm text-secondary mb-1">Last Name</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm text-secondary mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Save Changes Button */}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded w-full hover:bg-highlight transition"
          >
            Save Changes
          </button>
        </form>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="mt-4 bg-secondary text-white py-2 px-4 rounded w-full hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;
