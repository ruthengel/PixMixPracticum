import { useState } from "react";
import { Box, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import color1 from "../../assets/backgrounds/color1.png";
import color2 from "../../assets/backgrounds/color2.png";
import color3 from "../../assets/backgrounds/color3.png";
import color4 from "../../assets/backgrounds/color4.png";
import brown1 from "../../assets/backgrounds/brown1.png";
import brown3 from "../../assets/backgrounds/brown3.png";
import full1 from "../../assets/backgrounds/full1.png";
import full2 from "../../assets/backgrounds/full2.png";
import full3 from "../../assets/backgrounds/full3.png";
import green1 from "../../assets/backgrounds/green1.png";
import green2 from "../../assets/backgrounds/green2.png";
import memo1 from "../../assets/backgrounds/memo1.png";
import memo2 from "../../assets/backgrounds/memo2.png";
import memo3 from "../../assets/backgrounds/memo3.png";
import empty from "../../assets/backgrounds/empty.png";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const BackgroundSelector = () => {
    const backgrounds = [color1, color2, color3, color4, brown1, brown3, full1, full2, full3, green1, green2, memo1, memo2, memo3, empty];
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

            <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiDialog-paper': { width: '600px', height: '100px', borderRadius: '12px' } }}>
                <IconButton sx={{ position: "absolute", top: 10, right: 10, color: "black" }} onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ textAlign: 'center', marginTop: 3 }} >
                    <Typography>.בחר את התבנית בה תרצה לעצב את הקולא'ז שלך</Typography>
                </DialogContent>

            </Dialog>
        </Box>
    );
};

export default BackgroundSelector;

