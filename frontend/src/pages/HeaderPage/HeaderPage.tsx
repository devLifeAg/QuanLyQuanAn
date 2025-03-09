import { Button, Menu, MenuItem } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import './HeaderPage.css';
import { useNavigate } from 'react-router-dom';

export const HeaderPage = () => {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => { 
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <div className='header'>
      <Button className='menuButton' onClick={handleMenuOpen}> 
        <MenuIcon className='menuIcon' fontSize={'medium'} /> 
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleNavigate('/order')}>Đặt hàng</MenuItem>
        <MenuItem onClick={() => handleNavigate('/payment')}>Thanh toán</MenuItem>
        <MenuItem onClick={() => handleNavigate('/about')}>Giới thiệu</MenuItem>
      </Menu>

      <div className='logoTitle'>
        <h1 className='headerTitle'>Quán ăn ngon lành</h1>
      </div>

      {searchOpen && (
        <input className='searchInput' placeholder='Tìm kiếm món ăn...' value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <Button className='searchButton' onClick={() => setSearchOpen(!searchOpen)}>
        <Search className='searchIcon' fontSize={'medium'}/>
      </Button>
    </div>
  );
};
