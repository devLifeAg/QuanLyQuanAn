import './pages/HeaderPage/HeaderPage.css';
import { HeaderPage } from './pages/HeaderPage/HeaderPage'
import { OrderPage } from './pages/OrderPage/OrderPage';
import FoodMenu from './pages/FoodManagementPage/FoodManagementPage';

function App() {
  return (
    <>
    {/* <HeaderPage/> */}
    <div className='container-main'>
      {/* <OrderPage/> */}
      <FoodMenu/>
    </div>
    </>
  )
}

export default App
