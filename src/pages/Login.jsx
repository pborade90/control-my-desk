import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import landingPage from "../assets/landing-page.svg";
import { UserPlusIcon } from "@heroicons/react/20/solid";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/login", formData);
      const user = { email: formData.email, token: response.data.token };
      login(user); // Set the user in context
      toast.success("Login successful!");
      navigate("/users");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center bg-background p-6 md:p-0">
      {/* Left Section - SVG and Header */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 md:p-8 space-y-6 md:space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
          Welcome to ControlMyDesk
        </h1>
        <img
          src={landingPage}
          alt="Three people having a conversation"
          className="w-full max-w-[55%] md:w-3/4"
        />
        <p className="text-center text-sm md:text-lg text-secondary">
          CMD is your ultimate solution for managing tasks and collaborating
          seamlessly. Simplify your workflows and achieve more together.
        </p>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex items-center justify-center w-full md:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">Login</h2>
          <p className="text-center text-xs md:text-sm text-secondary mb-4">
            Sign in to manage and connect with your team.
          </p>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 md:p-3 border rounded-lg"
              placeholder="eve.holt@reqres.in"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 md:p-3 border rounded-lg"
              placeholder="cityslicka"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-lg shadow-md transition duration-300 hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <UserPlusIcon width={24} className="shrink-0" />
            <span className="text-sm md:text-base font-medium">Login</span>
          </button>
          <p className="text-center text-xs md:text-sm text-secondary">
            Don’t have an account? <a href="/signup" className="text-primary underline">Sign up here</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
