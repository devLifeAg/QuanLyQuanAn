import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react';

type OffTheDishPageProps = {
    openOffTheDish: boolean;
    setOpenOffTheDish: (open: boolean) =>void;
    mon_id: number | null;
    mon_trangthai: number | null;
    onOffSuccess: () => void;
  };

export const OffTheDishPage = ({openOffTheDish, setOpenOffTheDish, mon_id, mon_trangthai, onOffSuccess}: OffTheDishPageProps) => {
  const [loading, setLoading] = useState(false);
  const handleToggleDish = async () => {
    if (!mon_id) return;
    setLoading(true);

    try {
      const response = await fetch(`https://quanlyquananapi-production.up.railway.app/api/tatmomon/${mon_id}`, {
        method: "PUT",
      });

      const data = await response.json();
      console.log(data.message);

      if (response.ok) {
        onOffSuccess(); // Cập nhật lại danh sách món ăn
        setOpenOffTheDish(false);
      } else {
        alert("Có lỗi xảy ra khi cập nhật món ăn.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };
  return (

    <Dialog open={openOffTheDish} onClose={() => setOpenOffTheDish(false)}>
        <DialogTitle>
            {mon_trangthai == 1 ? "Xác nhận tắt món" : "Xác nhận mở món"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
              {mon_trangthai == 1 ? "Mày có chắc tắt món này chưa? (Tắt sai thì trừ 3 tháng lương của mày!!!)" : "Mày có chắc mở món này chưa? (Mở sai thì trừ 3 tháng lương của mày!!!)"}
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <Button color='error' onClick={handleToggleDish} disabled={loading}>{loading ? "Đang xử lý..." : mon_trangthai === 1 ? "Tắt món" : "Mở món"}</Button>
            <Button color='info' onClick={() => setOpenOffTheDish(false)}>Hủy</Button>
        </DialogActions>
    </Dialog>

  )
}
