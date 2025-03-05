import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './pages/HeaderPage/HeaderPage.css';
import { Button, Menu } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { HeaderPage } from './pages/HeaderPage/HeaderPage'


const categories = [
  { id: 1, name: "Món chính", image: "/images/main_dish.jpg" },
  { id: 2, name: "Khai vị", image: "/images/appetizer.jpg" },
  { id: 3, name: "Tráng miệng", image: "/images/dessert.jpg" },
  { id: 4, name: "Đồ uống", image: "/images/drink.jpg" },
];
const foodItem = [];
function App() {
  const [count, setCount] = useState(0)
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filteredItems: any[] = []; // hoặc gán với dữ liệu phù hợp
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <>
    <div className='pageOrder'>
      <HeaderPage/>

      {/* Danh sách phân loại món ăn */}
      <div className="categoryList">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`categoryItem ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <img src={cat.image} alt={cat.name} className="categoryImage" />
            <p className="categoryName">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Danh sách món ăn */}
      <div className="food-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="foodItem">
            <img src={item.image} alt={item.name} className="foodImage" />
            <p className="foodName">{item.name}</p>
          </div>
        ))}
      </div>
    </div> 
    </>
  )
}

export default App
