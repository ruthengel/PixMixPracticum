import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/Store";
import { setCollages, removeCollage } from "../stores/CollageSlice";
import CollageStore from "../stores/CollageStore";
import { IconButton, Dialog, DialogActions, Card, CardMedia, CardActions, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const UserCollages = () => {
    const dispatch = useDispatch();
    const collages = useSelector((state: RootState) => state.collages.collages);
    const userId = useSelector((state: RootState) => state.token.user?.userId);
    const token = useSelector((state: RootState) => state.token.token);
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [hoveredCollage, setHoveredCollage] = useState<string | null>(null);
    const [fade, setFade] = useState(false);


    useEffect(() => {
        if (userId) {
            CollageStore.getUserCollages(userId, token).then((data) => {
                dispatch(setCollages(data));
            });
        }
    }, [userId, dispatch, token]);

    useEffect(() => {
        const fetchUrls = async () => {
            const urls: { [key: string]: string } = {};
            for (const collage of collages) {
                try {
                    const url = await CollageStore.getDownloadUrl(collage.name, token);
                    urls[collage.id] = url;
                } catch (error) {
                    console.error(`Failed to fetch URL for ${collage.name}:`, error);
                }
            }
            setImageUrls(urls);
        };

        if (collages.length > 0) {
            fetchUrls();
        }
    }, [collages, token]);

    const handleDelete = async (collageId: string, name: string) => {
        try {
            const res1 = await CollageStore.deleteCollage(collageId, token);
            const res2 = await CollageStore.deleteCollageFromS3(name, token);
            if (res1 && res2)
                dispatch(removeCollage(collageId));
        } catch (error) {
            console.error("Failed to delete collage:", error);
        }
    };

    const handleDownload = async (name: string) => {
        const res = await CollageStore.downloadCollageFromS3(name, token);
        const blobUrl = URL.createObjectURL(res);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    };

    const openImage = (index: number) => {
        setSelectedIndex(index);
        setFade(true);
    };

    const closeImage = () => {
        setSelectedIndex(null);
    };

    const nextImage = () => {
        if (selectedIndex !== null && selectedIndex < collages.length - 1) {
            setFade(false);
            setTimeout(() => {
                setSelectedIndex(selectedIndex + 1);
                setFade(true);
            }, 200);
        }
    };

    const prevImage = () => {
        if (selectedIndex !== null && selectedIndex > 0) {
            setFade(false);
            setTimeout(() => {
                setSelectedIndex(selectedIndex - 1);
                setFade(true);
            }, 200);
        }
    };

    return (
        <div >
            <h2 style={{ background: "linear-gradient(270deg, #00A0A8, #7D2AE8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", position: "relative" }}>הקולאז'ים שלי</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", justifyContent: "center", maxWidth: "1100px", margin: "0 auto" }}>
                {collages.map((collage, index) => (
                    <div key={collage.id} style={{ position: "relative", width: "250px", height: "250px" }} onMouseEnter={() => setHoveredCollage(collage.id)} onMouseLeave={() => setHoveredCollage(null)}                    >
                        <Card style={{ width: "100%", height: "100%", position: "relative" }}>
                            <CardMedia component="img" height="100%" image={imageUrls[collage.id]} alt={collage.name} style={{ objectFit: "cover", cursor: "pointer", opacity: hoveredCollage === collage.id ? 0.5 : 1, transition: "opacity 0.3s ease-in-out", }} onClick={() => openImage(index)} />
                            {hoveredCollage === collage.id && (
                                <CardActions
                                    style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", gap: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "10px", borderRadius: "10px", opacity: 1, visibility: "visible", transition: "opacity 0.3s ease-in-out", }}                               >
                                    <Tooltip title="Download" arrow>
                                        <IconButton onClick={() => handleDownload(collage.name)} style={{ color: "white" }}>
                                            <DownloadIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete" arrow>
                                        <IconButton onClick={() => handleDelete(collage.id, collage.name)} style={{ color: "white" }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            )}
                        </Card>
                    </div>
                ))}
            </div>

            {selectedIndex !== null && (
                <Dialog
                    open={selectedIndex !== null}
                    onClose={closeImage}
                    maxWidth="xl"
                    fullScreen
                    PaperProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex", justifyContent: "center", alignItems: "center", }, }}               >
                    <DialogActions style={{ position: "absolute", top: 0, right: 0 }}>
                        <IconButton onClick={closeImage} style={{ color: "white" }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>

                    {selectedIndex > 0 && (
                        <IconButton onClick={prevImage} style={{ position: "absolute", left: "3%", color: "white", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "50px", padding: "10px" }}                        >
                            <ArrowBackIosNewIcon fontSize="large" />
                        </IconButton>
                    )}

                    <img src={imageUrls[collages[selectedIndex].id]} alt="Selected" style={{ width: "90%", height: "90%", objectFit: "contain", opacity: fade ? 1 : 0, transition: "opacity 0.3s ease-in-out" }} />
                    {selectedIndex < collages.length - 1 && (
                        <IconButton onClick={nextImage} style={{ position: "absolute", right: "3%", color: "white", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "50px", padding: "10px" }}                       >
                            <ArrowForwardIosIcon fontSize="large" />
                        </IconButton>
                    )}
                </Dialog>


            )}

        </div>
    );
};

export default UserCollages;
