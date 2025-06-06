// import { useState } from "react";
// import { Box, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
// import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
// import { useNavigate } from "react-router-dom";
// // import ChatBot from "./BackgroundRecommenderChat";
// import BackgroundRecommenderChat from "./BackgroundRecommenderChat";
// // import ChatWidget from "./BackgroundRecommenderChat";
// const BackgroundSelector = () => {
//     const backgrounds = [`images/backgrounds/color1.png`, 'images/backgrounds/color2.png', 'images/backgrounds/color3.png', 'images/backgrounds/color4.png', 'images/backgrounds/brown1.png', 'images/backgrounds/brown2.png', 'images/backgrounds/full1.png', 'images/backgrounds/full2.png', 'images/backgrounds/full3.png', 'images/backgrounds/green1.png', 'images/backgrounds/green2.png', 'images/backgrounds/memo1.png', 'images/backgrounds/memo2.png', 'images/backgrounds/memo3.png', 'images/backgrounds/empty.png'];
//     // const backgrounds = [`/images/backgrounds/color1.png`, '/images/backgrounds/color2.png', '/images/backgrounds/color3.png', '/images/backgrounds/color4.png', '/images/backgrounds/brown1.png', '/images/backgrounds/brown2.png', '/images/backgrounds/full1.png', '/images/backgrounds/full2.png', '/images/backgrounds/full3.png', '/images/backgrounds/green1.png', '/images/backgrounds/green2.png', '/images/backgrounds/memo1.png', '/images/backgrounds/memo2.png', '/images/backgrounds/memo3.png', '/images/backgrounds/empty.png'];
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isSelect, setIsSelect] = useState(true);
//     const navigate = useNavigate();
//     const [open, setOpen] = useState(true)

//     const handleSelectBackground = () => {
//         const selectedBackgroundName = backgrounds[currentIndex].split("/").pop() ?? "";
//         navigate(`/collage/${encodeURIComponent(selectedBackgroundName)}`);
//         setIsSelect(false);
//     };

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
//     };

//     const handlePrev = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === 0 ? backgrounds.length - 1 : prevIndex - 1
//         );
//     };

//     return isSelect && (
//         <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
//             <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
//                 <IconButton onClick={handlePrev}>
//                     <NavigateBeforeIcon fontSize="large" />
//                 </IconButton>

//                 <Box component="img" src={backgrounds[currentIndex]} alt="Background"
//                     sx={{ width: "1200px", height: "400px", objectFit: "cover", borderRadius: 2, cursor: "pointer", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }} onClick={handleSelectBackground} />
//                 <IconButton onClick={handleNext}>
//                     <NavigateNextIcon fontSize="large" />
//                 </IconButton>
//             </Box>

//             <Box display="flex" justifyContent="center" gap={1} mt={2} flexWrap="wrap">
//                 {backgrounds.map((bg, index) => (
//                     <Box key={index} component="img" src={bg} alt={`Background ${index}`} onClick={() => setCurrentIndex(index)}
//                         sx={{ width: 70, height: 50, objectFit: "cover", borderRadius: 1, cursor: "pointer", border: index === currentIndex ? "3px solid grey" : "2px solid #ccc", opacity: index === currentIndex ? 1 : 0.7, transition: "border 0.2s, opacity 0.2s" }} />))}
//             </Box>

//             <BackgroundRecommenderChat />

//             <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiDialog-paper': { width: '600px', height: '100px', borderRadius: '12px' } }}>
//                 <DialogContent sx={{ textAlign: 'center', marginTop: 0 }} >
//                     <Typography>.בחר את התבנית בה תרצה לעצב את הקולא'ז שלך</Typography>
//                 </DialogContent>
//                 <IconButton sx={{ position: "absolute", top: 50, right: 280, color: "black" }} onClick={() => setOpen(false)}>
//                     <ThumbUpAltIcon />
//                 </IconButton>
//             </Dialog>
//         </Box>
//     );
// };

// export default BackgroundSelector;





import { useState } from "react";
import { Box, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";
import BackgroundRecommenderChat from "./BackgroundRecommenderChat";

const BackgroundSelector = () => {
    const backgrounds = [`images/backgrounds/color1.png`, 'images/backgrounds/color2.png', 'images/backgrounds/color3.png', 'images/backgrounds/color4.png', 'images/backgrounds/brown1.png', 'images/backgrounds/brown2.png', 'images/backgrounds/full1.png', 'images/backgrounds/full2.png', 'images/backgrounds/full3.png', 'images/backgrounds/green1.png', 'images/backgrounds/green2.png', 'images/backgrounds/memo1.png', 'images/backgrounds/memo2.png', 'images/backgrounds/memo3.png', 'images/backgrounds/empty.png'];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSelect, setIsSelect] = useState(true);
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    // const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleSelectBackground = () => {
        const selectedBackgroundName = backgrounds[currentIndex].split("/").pop() ?? "";
        navigate(`/collage/${encodeURIComponent(selectedBackgroundName)}`);
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

    const getImageName = (imagePath: string) => {
        return imagePath.split("/").pop()?.replace(".png", "") || "";
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
                    <Box 
                        key={index} 
                        sx={{ 
                            position: "relative",
                            width: 70, 
                            height: 50,
                            borderRadius: 1,
                            cursor: "pointer",
                            border: index === currentIndex ? "3px solid grey" : "2px solid #ccc",
                            opacity: index === currentIndex ? 1 : 0.7,
                            transition: "border 0.2s, opacity 0.2s",
                            overflow: "hidden"
                        }}
                        onClick={() => setCurrentIndex(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <Box 
                            component="img" 
                            src={bg} 
                            alt={`Background ${index}`}
                            sx={{ 
                                width: "100%", 
                                height: "100%", 
                                objectFit: "cover"
                            }} 
                        />
                        {hoveredIndex === index && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "10px",
                                        textAlign: "center"
                                    }}
                                >
                                    {getImageName(bg)}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>

            <BackgroundRecommenderChat />

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