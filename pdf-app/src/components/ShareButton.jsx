import ShareDialog from './SharePDFdialog';
import { useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import { Button } from '@mui/material';
import { getShareLink } from '../../utils/apis';

export default function ShareButton({ pdfId}) {
    const [openShare, setOpenShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');

    const handleButtonClick = async () => {
        const link = await getShareLink(pdfId);
        setShareUrl(link);
        console.log("share link is", link);
        setOpenShare(true);
    }



    
    return(
        <>
        <Button
        variant="outlined"
        startIcon={<ShareIcon />}
        onClick={handleButtonClick}
        >
        Share
        </Button>

        <ShareDialog
        open={openShare}
        onClose={() => setOpenShare(false)}
        shareUrl={shareUrl}
        pdfId={pdfId}
        />

        </>


    );

    }

