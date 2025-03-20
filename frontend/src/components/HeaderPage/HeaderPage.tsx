import { Button, List, ListItem, ListItemButton, ListItemText, Drawer, Avatar, Typography, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import './HeaderPage.css';
import { useNavigate } from 'react-router-dom';

export const HeaderPage = () => {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => { 
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const handleNavigate = (path: string) => {
    navigate(path);
    // handleMenuClose();
    setDrawerOpen(false);
  };

  return (
    <>
      <div className='header'>
        {/* Nút mở Drawer */}
        <Button className="menuButton" onClick={() => setDrawerOpen(true)}>
          <MenuIcon className="menuIcon" fontSize="medium" />
        </Button>

        {/* Drawer (Thanh sidebar) */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}
          sx={{ '& .MuiDrawer-paper': { width: 280 } }} // Điều chỉnh chiều rộng
        >
          <Box sx={{ textAlign: 'center', p: 2 }} className="bg-red-500">
            <Avatar sx={{ width: 60, height: 60, margin: "0 auto" }} src="/avatar.jpg" />
            <Typography variant="h6" sx={{ mt: 1 }}>Nguyễn Văn A</Typography>
            <Typography sx={{ mt: 1 }}>Admin</Typography>
          </Box>

          <List>
          <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate('/  ')}>
                <ListItemText primary="Trang Chủ" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate('/TTQ')}>
                <ListItemText primary="Thông Tin Quán" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate('/QLMA')}>
                <ListItemText primary="Quản Lý Món Ăn" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate('/QLTK')}>
                <ListItemText primary="Tài Khoản" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate('/QLKC')}>
                <ListItemText primary="Kết Ca" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate('/QLDT')}>
                <ListItemText primary="Doanh Thu" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate('/DX')}>
                <ListItemText primary="Đăng Xuất" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <div className='logoTitle'>
          <h1 className='headerTitle'>Quán ăn ngon lành</h1>
        </div>

        {searchOpen && (
          <input className='searchInput' placeholder='Tìm kiếm món ăn...' value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        <Button className='searchButton' onClick={() => setSearchOpen(!searchOpen)}>
          <Search className='searchIcon' fontSize={'medium'} />
        </Button>
      </div>
    </>
  );
};
