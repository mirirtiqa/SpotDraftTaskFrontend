import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import ShareButton from './ShareButton';


export default function PDFoptions({ pdf }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuPdf, setMenuPdf] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event, pdf) => {
    setAnchorEl(event.currentTarget);
    setMenuPdf(pdf);
    };

    const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuPdf(null);
    };

    return <>
    
    <IconButton onClick={(e) => handleMenuOpen(e, pdf)}>
                        <MoreVertIcon />
    </IconButton>


    <Menu
  anchorEl={anchorEl}
  open={menuOpen}
  onClose={handleMenuClose}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  >
  <MenuItem>
    <ShareButton pdfId={pdf._id} />
  </MenuItem>
  </Menu>


</>
}