import React from 'react'
import { useState } from 'react'

const categories = [
  { id: 1, name: "Món chính", image: "/images/main_dish.jpg" },
  { id: 2, name: "Khai vị", image: "/images/appetizer.jpg" },
  { id: 3, name: "Tráng miệng", image: "/images/dessert.jpg" },
  { id: 4, name: "Đồ uống", image: "/images/drink.jpg" },
];
export const OrderPage = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
    const filteredItems: any[] = []; // hoặc gán với dữ liệu phù hợp
    const [categories, setCategories] = useState<Category[]>([]);
  return (

  )
}
