import { useState } from 'react';
import { HeaderPage } from '../HeaderPage/HeaderPage';
import './OrderPage.css';

// Danh sách danh mục món ăn
const categories = [
  { id: 1, name: "Món chính"},
  { id: 2, name: "Khai vị"},
  { id: 3, name: "Tráng miệng"},
  { id: 4, name: "Đồ uống"},
];

// Danh sách món ăn 
const foodItem = [
  { id: 1, name: "Cơm chiên lá é với tôm", categoryId: 1, image: "/src/images/com-chien-la-e-voi-tom.jpg" },
  { id: 2, name: "Rau má", categoryId: 2, image: "/src/images/nuoc-rau-ma.jpg" },
  { id: 3, name: "Bún riêu", categoryId: 3, image: "/src/images/bun-rieu.jpg" },
  { id: 4, name: "Phở", categoryId: 1, image: "/src/images/pho.jpg" },
  { id: 5, name: "Cua lột bơ tỏi", categoryId: 2, image: "/src/images/cua-lot-bo-toi.jpg" },
  { id: 6, name: "Combo khai vị", categoryId: 3, image: "/src/images/combo-khai-vi.jpg" },
  { id: 7, name: "Cơm bò lúc lắc", categoryId: 1, image: "/src/images/com-bo-luc-lac.jpg" },
  { id: 8, name: "Lẩu hải sản", categoryId: 2, image: "/src/images/lau-hai-san.jpg" },
  { id: 9, name: "Gỏi ngó sen tôm thịt", categoryId: 3, image: "/src/images/goi-ngo-sen-tom-thit.jpg" },
  { id: 10, name: "Bún mắm", categoryId: 1, image: "/src/images/bun-mam.jpg" },
  { id: 11, name: "Bún thịt nướng chả giỏ hải sản", categoryId: 2, image: "/src/images/bun-thit-nuoc-cha-gio-hai-san.jpg" },
  { id: 12, name: "Cà ri xanh rau củ chay", categoryId: 3, image: "/src/images/ca-ri-xanh-rau-cu-chay.jpg" },
];

export const OrderPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categoryList] = useState(categories);

  // Lọc món ăn theo danh mục được chọn
  const filteredItems = selectedCategory
    ? foodItem.filter(item => item.categoryId === selectedCategory)
    : foodItem;

  return (
    <>
    <HeaderPage/>
      <div className='containerOrder'>
        {/* Phân loại món ăn */}
      <div className="categoryList" >
        {categoryList.map((cat) => (
          <div
            key={cat.id}
            className={`categoryItem ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}>
            {/* <img src={cat.image} alt={cat.name} className="categoryImage" /> */}
            <p className="categoryName">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Danh sách món ăn */}
      <div className="foodList">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="foodItem">
              <img src={item.image} alt={item.name} className="foodImage" />
              <p className="foodName">{item.name}</p>
            </div>
          ))
        ) : (
          <p>Không có món ăn nào trong danh mục này.</p>
        )}
      </div>
    </div>
    </>
  );
};
