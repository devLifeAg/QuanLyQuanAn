import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Đảm bảo đường dẫn đúng
import "./index.css"; // Nếu có file CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
