import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import './FoodManagementPage.css';
import { HeaderPage } from '../../components/HeaderPage/HeaderPage';
import { DeletePage } from "../DeletePage/DeletePage";
import { OffTheDishPage } from "../OffTheDishPage/OffTheDishPage";
import { CreatePage } from "../CreatePage/CreatePage";
import { EditPage } from "../EditPage/EditPage";
import Revenue from "../Revenue/RevenuePage";

type FoodItem = {
  mon_id: number;
  pl_id: number;
  mon_tenmon: string;
  mon_giamon: number;
  mon_mota: string | null;
  mon_hinhmon: string;
  mon_trangthai: number;
};

export const FoodManagementPage = () => {
  // const [search, setSearch] = useState("");
  // const [openDialog, setOpenDialog] = useState(false);
  const [FoodItem, setFoodItem] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openOffTheDish, setOpenOffTheDish] = useState(false);
  const [selectedMon_id, setSelectedMon_id] = useState<number | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
      
  // useEffect(() => {
  //   fetch("https://quanlyquananapi-production.up.railway.app/api/danhsachmonan")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.result === 1) {
  //         const foodList: FoodItem[] = data.monan.map((mon: any) => ({
  //           mon_id: mon.mon_id,
  //           pl_id: mon.pl_id,
  //           mon_tenmon: mon.mon_tenmon,
  //           mon_giamon: mon.mon_giamon,
  //           mon_mota: mon.mon_mota,
  //           mon_hinhmon: `${base_url}/anh_mon/${mon.mon_hinhmon}`, // Thêm base_url vào ảnh
  //           mon_trangthai: mon.mon_trangthai,
  //         }));
  //         setFoodItem(foodList);
  //       } else {
  //         console.error("Không thể lấy dữ liệu món ăn");
  //       }
  //     })
  //     .catch((error) => console.error("Lỗi khi gọi API:", error))
  //     .finally(() => setLoading(false));
  // }, []);

  const fetchFoodList = () => {
    fetch("https://quanlyquananapi-production.up.railway.app/api/danhsachmonan")
      .then((response) => response.json())
      .then((data) => {
        if (data.result === 1) {
          const foodList: FoodItem[] = data.monan.map((mon: any) => ({
            mon_id: mon.mon_id,
            pl_id: mon.pl_id,
            mon_tenmon: mon.mon_tenmon,
            mon_giamon: mon.mon_giamon,
            mon_mota: mon.mon_mota,
            mon_hinhmon: mon.mon_hinhmon, 
            mon_trangthai: mon.mon_trangthai,
          }));
          setFoodItem(foodList);
        } else {
          console.error("Không thể lấy dữ liệu món ăn");
        }
      })
      .catch((error) => console.error("Lỗi khi gọi API:", error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchFoodList();
  },
  []);

  return (
    <>
      <HeaderPage />
      <Box className="container mx-auto mb-8">
        <Button variant="contained" color="primary" startIcon={<AddIcon />} className="!mb-6 !mt-6" onClick={() => setOpenCreate(true)}>
          Thêm món ăn
        </Button>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <div className="loader"></div>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {FoodItem.map((item) => (
              <Grid item xs={6} md={3} lg={2} key={item.mon_id}>
                <Card className="food-item-card">
                  <CardMedia component="img" image={item.mon_hinhmon} alt={item.mon_tenmon} className="food-item-img" />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center" }}
                    >
                      {item.mon_tenmon}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" align="center">
                      {item.mon_giamon.toLocaleString()} VND
                    </Typography>

                    <Box display="flex" justifyContent="space-between" gap={1} mt={2}>
                      <Button variant="contained" color="primary" sx={{ minWidth: "40px" }} onClick={() => {console.log("Món ăn được chọn để chỉnh sửa:", item); setSelectedFood(item); setOpenEdit(true);}}>
                        <EditIcon />
                      </Button>
                      <Button variant="contained" color="secondary" sx={{ minWidth: "40px" }} onClick={() => {setSelectedMon_id(item.mon_id); setOpenDelete(true);}}>
                        <DeleteIcon />
                      </Button>
                      <Button variant="contained" color={item.mon_trangthai === 1 ? "success" : "warning"} sx={{ minWidth: "40px" }} onClick={() => {setSelectedMon_id(item.mon_id); setOpenOffTheDish(true);}}>
                      {item.mon_trangthai === 1 ? <VisibilityIcon/> : <VisibilityOffIcon />}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <CreatePage openCreate={openCreate} onClose={() => setOpenCreate(false)} onAdd={(newFood) => setFoodItem((prev) => [...prev, newFood])}/>
        <EditPage openEdit={openEdit} setOpenEdit={setOpenEdit} fetchFoods={fetchFoodList} selectedFood={selectedFood}/>
        <DeletePage openDelete={openDelete} setOpenDelete={setOpenDelete} mon_id={selectedMon_id} onDeleteSuccess={() => {fetchFoodList();}}/>
        <OffTheDishPage openOffTheDish={openOffTheDish} setOpenOffTheDish={setOpenOffTheDish}
          mon_id={selectedMon_id} mon_trangthai={FoodItem.find(item => item.mon_id === selectedMon_id)?.mon_trangthai || 0} 
          onOffSuccess={() => {fetchFoodList();}}/>
      </Box>

    </>
  )
}


