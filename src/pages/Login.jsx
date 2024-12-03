import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      navigate("/users");
    } catch (error) {
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md p-8 rounded-lg space-y-4 w-80"
      >
        <h2 className="text-2xl font-bold text-primary text-center">Login</h2>
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="eve.holt@reqres.in"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="cityslicka"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
