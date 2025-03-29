import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';

type DeletePageProps = {
    openDelete: boolean;
    setOpenDelete: (open: boolean) => void;
    mon_id: number | null;
    onDeleteSuccess: () => void;
  };

export const DeletePage = ({openDelete, setOpenDelete, mon_id, onDeleteSuccess }: DeletePageProps) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
      // if (!mon_id) return;
      console.log("Giá trị mon_id:", mon_id); // Kiểm tra ID
      // if (mon_id == null) {
      //   console.error("Lỗi: mon_id không hợp lệ!");
      //   alert("Không tìm thấy món ăn để xóa.");
      //   return;
      // }
      setLoading(true);
  
      try {
        console.log(`Đang gửi yêu cầu xóa món ăn với ID: ${mon_id}`);
        const response = await fetch(`https://quanlyquananapi-production.up.railway.app/api/xoamonan/${mon_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          // throw new Error(`Lỗi ${response.status}: ${response.statusText}`);
          console.error(`Lỗi ${response.status}: ${response.statusText}`);
          alert(`Lỗi: Không tìm thấy món ăn (Mã lỗi: ${response.status})`);
          return;
        }
    
        const text = await response.text();
        const result = text ? JSON.parse(text) : null;
        console.log("Xóa món ăn thành công:", result);
    
        // Cập nhật giao diện sau khi xóa thành công
        onDeleteSuccess(); // Hàm callback (nếu có) để cập nhật danh sách món ăn
        setOpenDelete(false);
      } catch (error) {
        console.error("Lỗi khi xóa món ăn:", error);
        alert("Xóa món ăn thất bại!");
      } finally {
        setLoading(false);
      }
    };
  return (
    <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>
            Xác nhận xóa
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Mày chắc là xóa?
                (Xóa sai thì trừ nửa tháng lương của mày!!!)
            </DialogContentText>
        </DialogContent>

        <DialogActions>
        <Button color="error" onClick={handleDelete} disabled={loading}>
          {loading ? "Đang xử lý..." : "Xác nhận"}
        </Button>
            <Button onClick={() => setOpenDelete(false)}>Hủy</Button>
        </DialogActions>
    </Dialog>
  )
}
