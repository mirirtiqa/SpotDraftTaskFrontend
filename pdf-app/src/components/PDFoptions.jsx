import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';


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
  <MenuItem
    // onClick={() => {
    //   if (menuPdf) {
    //     const shareUrl = `${window.location.origin}/shared/${menuPdf.shareToken || menuPdf._id}`;
    //     navigator.clipboard.writeText(shareUrl);
    //     alert('Share link copied!');
    //   }
    //   handleMenuClose();
    // }}
  >
    Share
  </MenuItem>

  <MenuItem
    onClick={() => {
      if (menuPdf) {
        const link = document.createElement('a');
        link.href = menuPdf.filePath;
        link.download = menuPdf.fileName;
        link.click();
      }
      handleMenuClose();
    }}
  >
    Download
  </MenuItem>

  <MenuItem
    // onClick={() => {
    //   if (menuPdf) {
        
    //     const token = localStorage.getItem('token');
    //     axios
    //       .delete(`http://localhost:5000/api/pdf/delete/${menuPdf._id}`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then(() => {
    //         setPdfs((prev) => prev.filter((p) => p._id !== menuPdf._id));
    //         setFiltered((prev) => prev.filter((p) => p._id !== menuPdf._id));
    //         alert('PDF deleted');
    //       })
    //       .catch((err) => {
    //         alert('Failed to delete');
    //         console.error(err);
    //       });
    //   }
    //   handleMenuClose();
    // }}
  >
    Delete
  </MenuItem>
</Menu>


</>
}