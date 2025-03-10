import './components/HeaderPage/HeaderPage.css';
// import { HeaderPage } from './components/HeaderPage/HeaderPage'
import { OrderPage } from './pages/OrderPage/OrderPage';
import { FoodManagementPage } from './pages/FoodManagementPage/FoodManagementPage';
import { ManageQuanPage } from './pages/ManageQuan/ManageQuanPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    {/* <HeaderPage/> */}
    {/* <div className='container-main'> */}
      {/* <OrderPage/> */}
      
      {/* <FoodManagementPage/> */}
      <BrowserRouter>
      <div className="">
        <Routes>
          <Route path="/" element={<OrderPage />} />
        <Route path="/TTQ" element={<ManageQuanPage />} />
          <Route path="/QLMA" element={<FoodManagementPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    {/* </div> */}
    </>
  )
}

export default App