import { useState } from "react";
import {Card, CardMedia, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Grid, Box} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { foodItem } from '../OrderPage/OrderPage';
import "./FoodManagementPage.css";


type foodItem = {
    id: number;
    name: string;
    categoryId: number;
    image: string;
};
  
// const foodItem = [
const foodItems: foodItem[] = [
    { id: 1, name: "Cơm chiên lá é với tôm", categoryId: 1, image: "/src/images/com-chien-la-e-voi-tom.jpg" },
    { id: 2, name: "Rau má", categoryId: 2, image: "/src/images/nuoc-rau-ma.jpg" },
    { id: 3, name: "Bánh flan", categoryId: 3, image: "/src/images/flan.jpg" },
    { id: 4, name: "Phở", categoryId: 1, image: "/src/images/pho.jpg" },
    { id: 5, name: "Cua lột bơ tỏi", categoryId: 2, image: "/src/images/cua-lot-bo-toi.jpg" },
    { id: 6, name: "Combo khai vị", categoryId: 3, image: "/src/images/combo-khai-vi.jpg" },
    { id: 7, name: "Cơm bò lúc lắc", categoryId: 1, image: "/src/images/com-bo-luc-lac.jpg" },
    { id: 8, name: "Hủ tiếu xào chay", categoryId: 2, image: "/src/images/sup-cua.jpg" },
    { id: 9, name: "Gỏi ngó sen tôm thịt", categoryId: 3, image: "/src/images/goi-ngo-sen-tom-thit.jpg" },
    { id: 10, name: "Bún mắm", categoryId: 1, image: "/src/images/bun-mam.jpg" },
    { id: 11, name: "Bún thịt nướng chả giỏ hải sản", categoryId: 2, image: "/src/images/bun-thit-nuoc-cha-gio-hai-san.jpg" },
    { id: 12, name: "Cà ri xanh rau củ chay", categoryId: 3, image: "/src/images/ca-ri-xanh-rau-cu-chay.jpg" },
];

export default function FoodMenu() {
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
    // <Box p={2}>
    //   Search
    //   <TextField
    //     fullWidth
    //     label="Tìm kiếm món ăn"
    //     variant="outlined"
    //     value={search}
    //     onChange={handleSearchChange}
    //     sx={{ mb: 2 }}
    //   />
    // </Box>

    <Box className="food-menu-container">
        <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className="addFood">Thêm món ăn
        </Button>

        <Grid container spacing={2} className="grid">
            {foodItems.map((item) => (
            <Grid item xs={6} sm={4} md={2} key={item.id}>
                <Card className="food-item-card">
                    <CardMedia component="img" image={item.image} alt={item.name} className="food-item-img" />
                    <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Box className="food-item-actions">
                            <Button className="edit" variant="contained" color="primary" startIcon={<EditIcon />}>Sửa
                            </Button>
                            <Button className="delete" variant="contained" color="secondary" startIcon={<DeleteIcon />}>Xóa
                            </Button>
                            <Button className="off" variant="contained" color="warning" startIcon={<VisibilityOffIcon />}>Tắt món
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
    </Box>
);
}
