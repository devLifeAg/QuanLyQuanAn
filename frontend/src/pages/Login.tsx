import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, CardContent } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Sử dụng useNavigate

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert(`Logging in with: ${email}`);
    navigate("/"); // Chuyển hướng về trang chủ sau khi đăng nhập
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Login
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
