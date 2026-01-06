import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import FormInput from "../components/FormInput";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email address";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign Up"
      footer={
        <>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </>
      }
    >
      {errors.api && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md">
          {errors.api}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          error={errors.name}
          required
        />

        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          error={errors.email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          error={errors.password}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
