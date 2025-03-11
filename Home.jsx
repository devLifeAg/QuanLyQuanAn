import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import TableList from "../components/TableList";
import FloorList from "../components/FloorList";

const floorsData = [
  { id: 1, name: "Tầng 1" },
  { id: 2, name: "Tầng 2" },
  { id: 3, name: "Tầng 3" },
  { id: 4, name: "Tầng 4" },
  { id: 5, name: "Tầng 5" },
  { id: 6, name: "Tầng 6" },
];

const tablesData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  status: Math.random() > 0.5 ? "available" : "occupied",
}));

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Header + Login Card */}
      <Card className="w-96 shadow-lg mb-6">
        <CardContent className="p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-gray-600 mb-4">Explore our amazing collections.</p>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </Link>
        </CardContent>
      </Card>

      {/* Danh sách tầng */}
      <h2 className="text-2xl font-semibold mb-4">Danh sách tầng</h2>
      <FloorList floors={floorsData} />

      {/* Danh sách bàn */}
      <h2 className="text-2xl font-semibold my-4">Danh sách bàn</h2>
      <TableList tables={tablesData} />
    </div>
  );
};

export default Home;
