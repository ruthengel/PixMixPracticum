import { useState } from "react";
import { Box, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";

const BackgroundSelector = () => {
    const backgrounds = ['images/backgrounds/color1.png', 'images/backgrounds/color2.png', 'images/backgrounds/color3.png', 'images/backgrounds/color4.png', 'images/backgrounds/brown1.png', 'images/backgrounds/brown2.png', 'images/backgrounds/full1.png', 'images/backgrounds/full2.png', 'images/backgrounds/full3.png', 'images/backgrounds/green1.png', 'images/backgrounds/green2.png', 'images/backgrounds/memo1.png', 'images/backgrounds/memo2.png', 'images/backgrounds/memo3.png', 'images/backgrounds/empty.png'];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSelect, setIsSelect] = useState(true);
    const navigate = useNavigate();
    const [open, setOpen] = useState(true)

    const handleSelectBackground = () => {
        const selectedBackground = encodeURIComponent(backgrounds[currentIndex]);
        navigate(`/collage/${selectedBackground}`);
        setIsSelect(false);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? backgrounds.length - 1 : prevIndex - 1
        );
    };

    return isSelect && (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                <IconButton onClick={handlePrev}>
                    <NavigateBeforeIcon fontSize="large" />
                </IconButton>

                <Box component="img" src={backgrounds[currentIndex]} alt="Background"
                    sx={{ width: "1200px", height: "400px", objectFit: "cover", borderRadius: 2, cursor: "pointer", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }} onClick={handleSelectBackground} />
                <IconButton onClick={handleNext}>
                    <NavigateNextIcon fontSize="large" />
                </IconButton>
            </Box>

            <Box display="flex" justifyContent="center" gap={1} mt={2} flexWrap="wrap">
                {backgrounds.map((bg, index) => (
                    <Box key={index} component="img" src={bg} alt={`Background ${index}`} onClick={() => setCurrentIndex(index)}
                        sx={{ width: 70, height: 50, objectFit: "cover", borderRadius: 1, cursor: "pointer", border: index === currentIndex ? "3px solid grey" : "2px solid #ccc", opacity: index === currentIndex ? 1 : 0.7, transition: "border 0.2s, opacity 0.2s" }} />))}
            </Box>

            <ChatBot/>

            <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiDialog-paper': { width: '600px', height: '100px', borderRadius: '12px' } }}>              
                <DialogContent sx={{ textAlign: 'center', marginTop: 0 }} >
                    <Typography>.בחר את התבנית בה תרצה לעצב את הקולא'ז שלך</Typography>
                </DialogContent>
                <IconButton sx={{ position: "absolute", top: 50, right: 280, color: "black" }} onClick={() => setOpen(false)}>
                    <ThumbUpAltIcon />
                </IconButton>
            </Dialog>
        </Box>
    );
};

export default BackgroundSelector;

