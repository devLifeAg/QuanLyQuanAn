import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";

interface CreatePageProps {
    openCreate: boolean;
    onClose: () => void;
    onAdd: (newFood: any) => void;
}
export const CreatePage: React.FC<CreatePageProps> = ({ openCreate, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    pl_id: "",
    mon_tenmon: "",
    mon_giamon: "",
    mon_mota: "",
    mon_hinhmon: null as File | null,
  });
const [previewImage, setPreviewImage] = useState<string | null>(null);
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({ ...prev, [name]: file }));

      if (file) {
        setPreviewImage(URL.createObjectURL(file)); // Tạo URL xem trước ảnh
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("pl_id", formData.pl_id);
    formDataToSend.append("mon_tenmon", formData.mon_tenmon);
    formDataToSend.append("mon_giamon", formData.mon_giamon);
    formDataToSend.append("mon_mota", formData.mon_mota);
    
    if (formData.mon_hinhmon) {
        formDataToSend.append("mon_hinhmon", formData.mon_hinhmon);
      }
    
    try {
      const response = await fetch("https://quanlyquananapi-production.up.railway.app/api/themmonan", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Món ăn được thêm thành công!");
        onAdd(data.monan);
        onClose();
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (error) {
      // alert("Có lỗi xảy ra khi thêm món ăn!");
      console.error("Lỗi khi thêm món ăn:", error);
      alert("Có lỗi xảy ra khi thêm món ăn! Xem chi tiết trong console.");
    }
  };

  return (
    <Dialog open={openCreate} onClose={onClose}>
      <DialogTitle>Thêm Món Ăn</DialogTitle>
      <DialogContent>
        <TextField
          label="Phân Loại Món Ăn" name="pl_id" select fullWidth margin="dense" value={formData.pl_id} onChange={handleInputChange}>
           <MenuItem value="1">Cơm</MenuItem>
           <MenuItem value="2">Mì</MenuItem>
           <MenuItem value="3">Canh</MenuItem>
           <MenuItem value="4">Tráng miệng</MenuItem>
           <MenuItem value="5">Nước</MenuItem>        
        </TextField>
        <TextField label="Tên Món" name="mon_tenmon" fullWidth margin="dense" onChange={handleInputChange} />
        <TextField label="Giá Món" name="mon_giamon"  fullWidth margin="dense" onChange={handleInputChange} />
        <TextField label="Mô Tả" name="mon_mota" fullWidth margin="dense" onChange={handleInputChange} />

      <label htmlFor="mon_hinhmon">
          <input id="mon_hinhmon" type="file" name="mon_hinhmon" accept="image/*" style={{ display: "none" }} onChange={handleInputChange} />
        <Button variant="contained" component="span">Chọn hình ảnh</Button>
      </label>

        {previewImage && (
          <div>
            <img src={previewImage} alt="Hình ảnh đã chọn" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 5 }} />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Hủy</Button>
        <Button onClick={handleSubmit} color="primary">Thêm</Button>
      </DialogActions>
    </Dialog>
  );
};
