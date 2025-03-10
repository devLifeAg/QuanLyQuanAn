import { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Grid, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import './FoodManagementPage.css';
import { HeaderPage } from '../../components/HeaderPage/HeaderPage';

type foodItem = {
  id: number;
  name: string;
  categoryId: number;
  image: string;
};

// const foodItem = [
const foodItems: foodItem[] = [
  { id: 1, name: "Cơm chiên lá é với tôm", categoryId: 1, image: "/anh_mon/com-chien-la-e-voi-tom.jpg" },
  { id: 2, name: "Rau má", categoryId: 2, image: "/anh_mon/nuoc-rau-ma.jpg" },
  { id: 3, name: "Bún riêu", categoryId: 3, image: "/anh_mon/bun-rieu.jpg" },
  { id: 4, name: "Phở", categoryId: 1, image: "/anh_mon/pho.jpg" },
  { id: 5, name: "Cua lột bơ tỏi", categoryId: 2, image: "/anh_mon/cua-lot-bo-toi.jpg" },
  { id: 6, name: "Combo khai vị", categoryId: 3, image: "/anh_mon/combo-khai-vi.jpg" },
  { id: 7, name: "Cơm bò lúc lắc", categoryId: 1, image: "/anh_mon/com-bo-luc-lac.jpg" },
  { id: 8, name: "Lẩu hải sản", categoryId: 2, image: "/anh_mon/lau-hai-san.jpg" },
  { id: 9, name: "Gỏi ngó sen tôm thịt", categoryId: 3, image: "/anh_mon/goi-ngo-sen-tom-thit.jpg" },
  { id: 10, name: "Bún mắm", categoryId: 1, image: "/anh_mon/bun-mam.jpg" },
  { id: 11, name: "Bún thịt nướng chả giỏ hải sản", categoryId: 2, image: "/anh_mon/bun-thit-nuoc-cha-gio-hai-san.jpg" },
  { id: 12, name: "Cà ri xanh rau củ chay", categoryId: 3, image: "/anh_mon/ca-ri-xanh-rau-cu-chay.jpg" },
];

export const FoodManagementPage = () => {
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<foodItem | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOpenDialog = (item: foodItem) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  return (
    <>
      <HeaderPage />
      <Box className="container mx-auto mb-8">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className="!mb-6 !mt-6"
        >
          Thêm món ăn
        </Button>

        <Grid container spacing={2}>
          {foodItems.map((item) => (
            <Grid item xs={6} md={3} lg={2} key={item.id}>
              <Card className="food-item-card">
                <CardMedia component="img" image={item.image} alt={item.name} className="food-item-img" />
                <CardContent>
                  {/* Giới hạn tiêu đề chỉ 1 dòng */}
                  <Typography
                    variant="h6"
                    sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center" }}
                  >
                    {item.name}
                  </Typography>

                  {/* Căn giữa các icon trong button */}
                  <Box display="flex" justifyContent="space-between" gap={1} mt={2}>
                    <Button variant="contained" color="primary" sx={{ minWidth: "40px", display: "flex", justifyContent: "center" }}>
                      <EditIcon />
                    </Button>
                    <Button variant="contained" color="secondary" sx={{ minWidth: "40px", display: "flex", justifyContent: "center" }}>
                      <DeleteIcon />
                    </Button>
                    <Button variant="contained" color="warning" sx={{ minWidth: "40px", display: "flex", justifyContent: "center" }}>
                      <VisibilityOffIcon />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

    </>
  )
}
