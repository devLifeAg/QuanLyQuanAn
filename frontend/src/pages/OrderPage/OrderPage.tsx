import { useState } from 'react'

const categories = [
  { id: 1, name: "Món chính"},
  { id: 2, name: "Khai vị"},
  { id: 3, name: "Tráng miệng"},
  { id: 4, name: "Đồ uống"},
  { id: 5, name: "Món Thái"},
  { id: 6, name: "Món Trung Quốc"},
  { id: 7, name: "Món Pháp"},
  { id: 8, name: "Món Lào"},
  { id: 9, name: "Món Ấn Độ"},
];
const foodItem = [];
export const OrderPage = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
    const filteredItems: any[] = []; // hoặc gán với dữ liệu phù hợp
    const [categories, setCategories] = useState<Category[]>([]);
  return (
    <>
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
              )
              )
            }
          </div>
          </>
  )
}


