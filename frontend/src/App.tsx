import './pages/HeaderPage/HeaderPage.css';
import { HeaderPage } from './pages/HeaderPage/HeaderPage'
import { OrderPage } from './pages/OrderPage/OrderPage';

function App() {
  return (
    <>
    <HeaderPage/>
    <div className='pageOrder'>
      <OrderPage/>
    </div> 
    </>
  )
}

export default App
