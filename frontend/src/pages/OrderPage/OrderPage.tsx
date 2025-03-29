import { useEffect, useState } from 'react';
import { HeaderPage } from '../../components/HeaderPage/HeaderPage';
import './OrderPage.css';

// Kiểu dữ liệu cho danh mục và món ăn
type Category = {
  pl_id: number;
  pl_tenphanloai: string;
  pl_tenhinh: string;

};

type FoodItem = {
  mon_id: number;
  pl_id: number;
  mon_tenmon: string;
  mon_giamon: string;
  mon_mota: string;
  mon_hinhmon: string;
  mon_trangthai: string;

};
export const OrderPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categoryList, setCategorieList] = useState<Category[]>([]);
  const [FoodItem, setFoodItem] = useState<FoodItem[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://quanlyquananapi-production.up.railway.app/api/phanloaivamonan"
          );
          const data = await response.json();
  
          if (data.result === 1) {
            // Lấy danh sách danh mục từ API
            const categoryList: Category[] = data.phanloai.map((cat: any) => ({
              pl_id: cat.pl_id,
              pl_tenphanloai: cat.pl_tenpl,
              pl_tenhinh: cat.pl_tenhinh,
            }));
  
            // Lấy danh sách món ăn từ API
            const foodList: FoodItem[] = data.phanloai.flatMap((cat: any) =>
              cat.monan.map((mon: any) => ({
                mon_id: mon.mon_id,
                pl_id: cat.pl_id, // Gán id danh mục vào món ăn
                mon_tenmon: mon.mon_tenmon,
                mom_giamon: mon.mon_giamon,
                mon_mota: mon.mon_mota,
                mon_hinhmon: mon.mon_hinhmon,
                mon_trangthai: mon.mon_trangthai,
              }))
            );
  
            setCategorieList(categoryList);
            setFoodItem(foodList);
          }
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
        }
      };
  
      fetchData();
    }, []);

    // Lọc món ăn theo danh mục được chọn
  const filteredItems = selectedCategory
  ? FoodItem.filter((item) => item.pl_id === selectedCategory)
  : FoodItem;


  return (
    <>
    <HeaderPage/>
      <div className='container mx-auto'>
        {/* Phân loại món ăn */}
      <div className="categoryList" >
      <div
            key={0}
            className={`categoryItem ${selectedCategory === 0 ? "active" : ""}`}
            onClick={() => setSelectedCategory(0)}>
            {/* <img src={cat.pl_tenhinh} alt={cat.pl_tenhinh} className="categoryImage" /> */}
            <p className="categoryName">Tất cả món ăn</p>
          </div>
        {categoryList.map((cat) => (
          <div
            key={cat.pl_id}
            className={`categoryItem ${selectedCategory === cat.pl_id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.pl_id)}>
            <img src={cat.pl_tenhinh} alt={cat.pl_tenhinh} className="categoryImage" />
            <p className="categoryName">{cat.pl_tenphanloai}</p>
          </div>
        ))}
      </div>

      {/* Danh sách món ăn */}
      <div className="foodList">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.mon_id} className="foodItem">
              <img src={item.mon_hinhmon} alt={item.mon_tenmon} className="foodImage" />
              <p className="foodName">{item.mon_tenmon}</p>
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
