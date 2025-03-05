import { Button, Menu } from '@mui/material'
import { Search } from '@mui/icons-material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useState } from 'react'
import './HeaderPage.css';

export const HeaderPage = () => {
    const [count, setCount] = useState(0)
  
  const [openNavbar, setOpenNavbar] = useState(false);
  const [search, setSearch] = useState("");
  const [SearchOpen, setSearchOpen] = useState(false);
  return (
    
    <div className='header'>
        <Button className='menuButton' onClick={() => console.log("Open Navbar")}> 
          <MenuIcon size={24} /> 
        </Button>
        <h1>TocoToco</h1>
        {SearchOpen && (
          <input className="searchInput" placeholder="Tìm kiếm món ăn..." value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        <Button className="searchButton" onClick={() => setSearchOpen(!SearchOpen)}>
          <Search size={24} />
        </Button>

        </div>
  )
}
