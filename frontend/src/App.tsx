import './components/HeaderPage/HeaderPage.css';
// import { HeaderPage } from './components/HeaderPage/HeaderPage'
import { OrderPage } from './pages/OrderPage/OrderPage';
import Home from "./pages/Home.tsx";
import Login from "./pages/Login";
import { FoodManagementPage } from './pages/FoodManagementPage/FoodManagementPage';
import { ManageQuanPage } from './pages/ManageQuan/ManageQuanPage';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "nprogress/nprogress.css";
import Revenue from './pages/Revenue/RevenuePage.tsx';
import RevenuePage from './pages/Revenue/RevenuePage.tsx';

function LoadingBar() {
  const location = useLocation();



  return null; // Không render gì cả, chỉ xử lý hiệu ứng
}

function App() {
  return (
    <>
    {/* <HeaderPage/> */}
    {/* <div className='container-main'> */}
      {/* <OrderPage/> */}
      
      {/* <FoodManagementPage/> */}
      <BrowserRouter>
      <LoadingBar/>
      <div className="">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/TTQ" element={<ManageQuanPage />} />
        <Route path="/QLMA" element={<FoodManagementPage />} />
        <Route path="/QLDT" element={<RevenuePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    {/* </div> */}
    </>
  )
}

export default App