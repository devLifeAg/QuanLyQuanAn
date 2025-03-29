import { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

type FoodItem = {
    mon_id: number;
    pl_id: number;
    mon_tenmon: string;
    mon_giamon: number;
    mon_mota: string | null;
    mon_hinhmon: string;
    mon_trangthai: number;
  };

type EditPageProps = {
    openEdit: boolean;
    setOpenEdit: (open: boolean) => void;
    fetchFoods: () => void;
    selectedFood: FoodItem | null;
};
 
export const EditPage = ({openEdit, setOpenEdit, fetchFoods, selectedFood}: EditPageProps) => {
    const [monTen, setMonTen] = useState("");
    const [monGia, setMonGia] = useState(0);
    const [monLoai, setMonLoai] = useState(1);
    const [monHinh, setMonHinh] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);


    useEffect(() => {
        // console.log("Dữ liệu món ăn được chọn:", selectedFood);
        if (openEdit && selectedFood) {
            setMonTen(selectedFood.mon_tenmon);
            setMonGia(selectedFood.mon_giamon);
            setMonLoai(selectedFood.pl_id);
            setPreview(selectedFood.mon_hinhmon);
            setMonHinh(null);
        }
        // else {
        //     console.log("Không có dữ liệu món ăn");
        // }
    }, [openEdit,selectedFood]);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        setMonHinh(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpdateFood = async () => {
        console.log("Cập nhật món ăn:", { monTen, monGia, monHinh, monLoai });
        // Nếu không có dữ liệu, quay về trang quản lý món ăn
        if (!selectedFood) {
            return alert("Không có dữ liệu món ăn!");
        }
        
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("pl_id", monLoai.toString());
        formData.append("mon_tenmon", monTen);
        formData.append("mon_giamon", monGia.toString());
        formData.append("mon_mota", "Mô tả món ăn mặc định");
        if (monHinh) formData.append("mon_hinhmon", monHinh);

        try {
            const response = await fetch(`https://quanlyquananapi-production.up.railway.app/api/suamonan/${selectedFood.mon_id}`,{
                method: "POST",
                body: formData,
            });

            const resultText = await response.text(); // Lấy toàn bộ response dưới dạng text
            console.log("Response:", resultText);
            alert("Cập nhật món ăn thành công!");
            setOpenEdit(false);
            fetchFoods();
        } catch (error) {
            console.error("Lỗi khi cập nhật món ăn:", error);
            alert("Cập nhật món ăn thất bại!");
        }
    };

    return (
    <>
    <Dialog open={openEdit} onClose={()=> setOpenEdit(false)} maxWidth="sm" fullWidth>
        
        <DialogTitle textAlign="center">Chỉnh sửa món ăn</DialogTitle>
        <DialogContent>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField fullWidth label="Tên món ăn" variant="outlined" value={monTen} 
                    onChange={(e) => setMonTen(e.target.value)} />
                <TextField fullWidth label="Giá món ăn" variant="outlined" type="number" value={monGia} 
                    onChange={(e) => setMonGia(Number(e.target.value))} />
                    
                <FormControl fullWidth>
                    <InputLabel>Phân loại món ăn</InputLabel>
                    <Select value={monLoai} onChange={(e) => setMonLoai(Number(e.target.value))}>
                        <MenuItem value={1}>Cơm</MenuItem>
                        <MenuItem value={2}>Mì</MenuItem>
                        <MenuItem value={   3}>Canh</MenuItem>
                        <MenuItem value={4}>Tráng miệng</MenuItem>
                        <MenuItem value={5}>Nước</MenuItem>
                    </Select>
                </FormControl>

                <Box textAlign="center">
                    <input type="file" accept="image/*" id="upload" style={{ display: "none" }} 
                        onChange={handleFileChange} />
                    <label htmlFor="upload">
                        <Button variant="contained" component="span">Chọn hình ảnh</Button>
                    </label>
                </Box>
                    {preview && <img src={preview} alt="Xem trước" style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }} />}
            </Box>
        </DialogContent>
        <DialogActions>
                <Button variant="contained" color="primary" onClick={handleUpdateFood} fullWidth>Cập nhật</Button>
                <Button variant="outlined" color="secondary" onClick={() => setOpenEdit(false)} fullWidth>Hủy</Button>
            </DialogActions>
    </Dialog>
    </>
    );
};