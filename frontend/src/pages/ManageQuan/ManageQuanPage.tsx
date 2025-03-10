import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { HeaderPage } from "../../components/HeaderPage/HeaderPage";

export const ManageQuanPage = () => {
  const [floors, setFloors] = useState<{ id: number; name: string; status: string }[]>([
    { id: 1, name: "Tầng 1", status: "Hoạt động" },
    { id: 2, name: "Tầng 2", status: "Hoạt động" },
    { id: 3, name: "Tầng 3", status: "Hoạt động" },
    { id: 4, name: "Tầng 4", status: "Hoạt động" },
  ]);

  const [tables, setTables] = useState<{ id: number; name: string; status: string; floorId: number }[]>([
    { id: 101, name: "Bàn 1", status: "Hoạt động", floorId: 1 },
    { id: 102, name: "Bàn 2", status: "Hoạt động", floorId: 1 },
    { id: 201, name: "Bàn 1", status: "Hoạt động", floorId: 2 },
  ]);

  const [floorName, setFloorName] = useState("");
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [tableName, setTableName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editFloor, setEditFloor] = useState<{ id: number; name: string } | null>(null);
  const [editTable, setEditTable] = useState<{ id: number; name: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: "floor" | "table"; id: number } | null>(null);

  // Thêm tầng
  const handleAddFloor = () => {
    if (floorName.trim() !== "") {
      setFloors([...floors, { id: Date.now(), name: floorName, status: "Hoạt động" }]);
      setFloorName("");
    }
  };

  // Xác nhận xóa tầng
  const handleDeleteFloor = (id: number) => {
    setDeleteConfirm({ type: "floor", id });
  };

  // Xác nhận xóa bàn
  const handleDeleteTable = (id: number) => {
    setDeleteConfirm({ type: "table", id });
  };

  // Xử lý xóa sau khi xác nhận
  const confirmDelete = () => {
    if (deleteConfirm?.type === "floor") {
      setFloors(floors.filter((floor) => floor.id !== deleteConfirm.id));
      setTables(tables.filter((table) => table.floorId !== deleteConfirm.id));
      if (selectedFloor === deleteConfirm.id) setSelectedFloor(null);
    } else if (deleteConfirm?.type === "table") {
      setTables(tables.filter((table) => table.id !== deleteConfirm.id));
    }
    setDeleteConfirm(null);
  };

  // Chỉnh sửa tầng
  const handleEditFloor = (floor: { id: number; name: string }) => {
    setEditFloor(floor);
    setEditTable(null); // Đảm bảo editTable bị xóa khi chỉnh sửa tầng
    setFloorName(floor.name);
    setTableName(""); // Xóa giá trị tableName khi chỉnh sửa tầng
    setDialogOpen(true);
  };

  const handleSaveFloor = () => {
    setFloors(floors.map((f) => (f.id === editFloor?.id ? { ...f, name: floorName } : f)));
    setDialogOpen(false);
    setEditFloor(null);
    setFloorName("");
  };

  // Bật/tắt tầng
  const handleToggleFloorStatus = (id: number) => {
    setFloors(
      floors.map((floor) =>
        floor.id === id ? { ...floor, status: floor.status === "Hoạt động" ? "Đã tắt" : "Hoạt động" } : floor
      )
    );
  };

  // Chọn tầng để xem bàn
  const handleSelectFloor = (id: number) => {
    setSelectedFloor(id);
  };

  // Thêm bàn
  const handleAddTable = () => {
    if (tableName.trim() !== "" && selectedFloor !== null) {
      setTables([...tables, { id: Date.now(), name: tableName, status: "Hoạt động", floorId: selectedFloor }]);
      setTableName("");
    }
  };

  // Chỉnh sửa bàn
  const handleEditTable = (table: { id: number; name: string }) => {
    setEditTable(table);
    setEditFloor(null); // Đảm bảo editFloor bị xóa khi chỉnh sửa bàn
    setTableName(table.name);
    setFloorName(""); // Xóa giá trị floorName khi chỉnh sửa bàn
    setDialogOpen(true);
  };

  const handleSaveTable = () => {
    setTables(tables.map((t) => (t.id === editTable?.id ? { ...t, name: tableName } : t)));
    setDialogOpen(false);
    setEditTable(null);
    setTableName("");
  };

  // Bật/tắt bàn
  const handleToggleTableStatus = (id: number) => {
    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, status: table.status === "Hoạt động" ? "Đã tắt" : "Hoạt động" } : table
      )
    );
  };

  return (
    <>
      <HeaderPage />
      <Container className="mb-8">
        <Box className="mt-4" display="flex" gap={1} mb={2}>
          <TextField label="Tên tầng" value={floorName} onChange={(e) => setFloorName(e.target.value)} />
          <Button variant="contained" onClick={handleAddFloor} startIcon={<AddIcon />}>
            Thêm tầng
          </Button>
        </Box>

        <List sx={{ minHeight: 200, maxHeight: 200, overflowY: "auto", border: "1px solid #ddd", borderRadius: 1 }}>
          {floors.map((floor) => (
            <ListItem
              key={floor.id}
              sx={{
                background: selectedFloor === floor.id ? "#ddd" : "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemButton onClick={() => handleSelectFloor(floor.id)} sx={{ flexGrow: 1 }}>
                <ListItemText primary={`${floor.name} - ${floor.status}`} />
              </ListItemButton>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button onClick={() => handleToggleFloorStatus(floor.id)}>
                  <VisibilityOffIcon />
                </Button>
                <Button onClick={() => handleEditFloor(floor)} color="primary">
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDeleteFloor(floor.id)} color="error">
                  <DeleteIcon />
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>

        {selectedFloor !== null && (
          <>
            <Typography className="!mt-6" variant="h5" gutterBottom>
              Danh Sách Bàn {floors.find((f) => f.id === selectedFloor)?.name}
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <TextField label="Tên bàn" value={tableName} onChange={(e) => setTableName(e.target.value)} />
              <Button variant="contained" onClick={handleAddTable} startIcon={<AddIcon />}>
                Thêm bàn
              </Button>
            </Box>

            <List sx={{ minHeight: 200, maxHeight: 200, overflowY: "auto", border: "1px solid #ddd", borderRadius: 1 }}>
              {tables
                .filter((table) => table.floorId === selectedFloor)
                .map((table) => (
                  <ListItem key={table.id} sx={{ background: "#f5f5f5", mb: 1 }}>
                    <ListItemText primary={`${table.name} - ${table.status}`} />
                    <Button onClick={() => handleToggleTableStatus(table.id)}>
                      <VisibilityOffIcon />
                    </Button>
                    <Button onClick={() => handleEditTable(table)} color="primary">
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDeleteTable(table.id)} color="error">
                      <DeleteIcon />
                    </Button>
                  </ListItem>
                ))}
            </List>
          </>
        )}

        {/* Dialog chỉnh sửa tầng hoặc bàn */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>{editFloor ? "Chỉnh sửa tầng" : "Chỉnh sửa bàn"}</DialogTitle>
          <DialogContent>
            <TextField
            className="!mt-2"
              fullWidth
              label={editFloor ? "Tên tầng" : "Tên bàn"}
              value={editFloor ? floorName : tableName}
              onChange={(e) => (editFloor ? setFloorName(e.target.value) : setTableName(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setDialogOpen(false);
                setEditFloor(null);
                setEditTable(null);
                setFloorName("");
                setTableName("");
              }}
            >
              Hủy
            </Button>
            <Button onClick={editFloor ? handleSaveFloor : handleSaveTable} variant="contained">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog xác nhận xóa */}
        <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <Typography>
              Bạn có chắc chắn muốn xóa {deleteConfirm?.type === "floor" ? "tầng" : "bàn"} này không?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirm(null)}>Hủy</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ManageQuanPage;