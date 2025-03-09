import './pages/HeaderPage/HeaderPage.css';
import { HeaderPage } from './pages/HeaderPage/HeaderPage'
import { OrderPage } from './pages/OrderPage/OrderPage';
import { FoodManagementPage } from './pages/FoodManagementPage/FoodManagementPage';


function App() {
  return (
    <>
    {/* <HeaderPage/> */}
    <div className='container-main'>
      {/* <OrderPage/> */}
      <FoodManagementPage/>
    </div>
    </>
  )
}

export default App
