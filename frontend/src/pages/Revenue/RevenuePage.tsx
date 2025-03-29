import React, { useState } from "react";
import { Card, CardContent, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const API_URL = "https://quanlyquananapi-production.up.railway.app/api/doanhthu";

const RevenuePage: React.FC = () => {
//   const [month, setMonth] = useState<Dayjs | null>(dayjs());
//   const [startDate, setStartDate] = useState<Dayjs | null>(null);
//   const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [revenueData, setRevenueData] = useState<{ total_tongtien: number; total_sl_hd: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!startDate || !endDate) {
          alert("Vui lòng chọn ngày bắt đầu và ngày kết thúc!");
          return;
        }
        setLoading(true);
        setError(null);

        const formattedStartDate = startDate.format("YYYY-MM-DD");
        const formattedEndDate = endDate.format("YYYY-MM-DD");
        const url = `${API_URL}?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;

        try {
            const response = await fetch(url);
            if (!response.ok) 
            {
                throw new Error("Lỗi khi lấy dữ liệu từ API");
            }
            const data = await response.json();
            setRevenueData(data);
        } 
        catch (err) 
        {
            setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
        } 
        finally 
        {
            setLoading(false);
        }
};


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="p-4 space-y-4">
            <div className="flex gap-4">
                <DatePicker label="Từ ngày" value={startDate} onChange={setStartDate} />
                <DatePicker label="Đến ngày" value={endDate} onChange={setEndDate} />
                {/* <DatePicker views={["year", "month"]} label="Chọn tháng năm" value={month}
                    onChange={(newValue) => setMonth(newValue ? dayjs(newValue) : null)}/> */}

{/* <DatePicker label="Từ ngày" value={startDate} onChange={(newValue) => setStartDate(newValue ? dayjs(newValue) : null)} />
<DatePicker label="Đến ngày" value={endDate} onChange={(newValue) => setEndDate(newValue ? dayjs(newValue) : null)} /> */}
        
                <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
                    {loading ? "Đang tải..." : "Tìm kiếm"}
                </Button>
            </div>

            {/* Hiển thị doanh thu */}
            {error && <p className="text-red-500">{error}</p>}
            {revenueData && (
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardContent>
                            <h2 className="text-xl font-bold">Tổng doanh thu</h2>
                            <p className="text-lg">{revenueData.total_tongtien.toLocaleString()} VND</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <h2 className="text-xl font-bold">Tổng số hóa đơn</h2>
                            <p className="text-lg">{revenueData.total_sl_hd}</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>    
    </LocalizationProvider>
  );
};

export default RevenuePage;