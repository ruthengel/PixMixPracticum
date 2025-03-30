import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";
import CollageStore from "../stores/CollageStore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/Store";
import { IconButton, Stack, Box, Paper, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CropIcon from "@mui/icons-material/Crop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

const CollageEditor = () => {

  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.token.user?.userId);
  const token = useSelector((state: RootState) => state.token.token);
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [isCrop, setIsCrop] = useState(false)
  const navigate = useNavigate()
  const { background } = useParams();
  const selectedBackground = decodeURIComponent(background || "");

  useEffect(() => {
    const image = new Image();
    image.src = selectedBackground;
    const canvas = new fabric.Canvas("collageCanvas", {
      width: 1200,
      height: 400,
    });
    canvasRef.current = canvas;
    image.onload = () => {
      const fabricImage = new fabric.Image(image, {
        scaleX: canvas.width / image.width,
        scaleY: canvas.height / image.height,
      });
      canvas.backgroundImage = fabricImage
      canvas.renderAll()
    };
    return () => {
      canvas.dispose();
    };
  }, [selectedBackground]);

  const addImageToCanvas = (imageSrc: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imgElement = new Image();
    imgElement.src = imageSrc;
    imgElement.onload = () => {
      const scaleFactor = Math.min(1, canvas.width / imgElement.width, canvas.height / imgElement.height);
      const img = new fabric.Image(imgElement, {
        left: Math.random() * 300,
        top: Math.random() * 200,
        scaleX: scaleFactor,
        scaleY: scaleFactor,
        selectable: true,
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) addImageToCanvas(reader.result.toString());
        };
        reader.readAsDataURL(file);
      });
    },
  });

  const addTextToCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const text = new fabric.Textbox("טקסט חדש", {
      left: 150,
      top: 150,
      fontSize: 24,
      fill: "black",
      fontFamily: "Arial",
      backgroundColor: "white",
      padding: 5,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const deleteSelected = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  };

  const saveCollage = async () => {
    const canvasElement = document.getElementById("collageCanvas") as HTMLCanvasElement;
    if (!canvasElement) return;
    const imgData = await html2canvas(canvasElement).then((canvas) => canvas.toDataURL("image/png"));
    const byteString = atob(imgData.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    const file = new File([uintArray], `collage_${Math.random().toString(36).substring(2, 15)}.png`, { type: "image/png" });
    const url = await CollageStore.uploadCollageToS3(file, token);
    await CollageStore.addCollage(file, token, userId, url, dispatch);
    
  };

  const download = async () => {
    const canvasElement = document.getElementById("collageCanvas") as HTMLCanvasElement;
    if (!canvasElement) return;
    const imgData = await html2canvas(canvasElement).then((canvas) => canvas.toDataURL("image/png"));
    const a = document.createElement("a");
    a.href = imgData;
    a.download = "collage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const cropImage = () => {
    setIsCrop(true)
    const canvas = canvasRef.current;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== "image") return;

    const cropRect = new fabric.Rect({
      left: activeObject.left! + 20,
      top: activeObject.top! + 20,
      width: (activeObject.width! * activeObject.scaleX!) - 40,
      height: (activeObject.height! * activeObject.scaleY!) - 40,
      fill: "rgba(255, 255, 255, 0.3)",
      stroke: "red",
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      hasBorders: true,
      lockRotation: true, 
    });

    canvas.add(cropRect);
    canvas.setActiveObject(cropRect);
    canvas.renderAll();
  };

  const applyCrop = () => {
    setIsCrop(false)
    const canvas = canvasRef.current;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== "image") return;

    const cropRect = canvas.getObjects().find((obj) => obj.type === "rect") as fabric.Rect;
    if (!cropRect) return;

    const image = activeObject as fabric.Image;
    const imgElement = image._element as HTMLImageElement;
    if (!imgElement) return;

    const { left: imgLeft, top: imgTop, scaleX, scaleY } = image;
    const { left: rectLeft, top: rectTop, width, height } = cropRect;

    const cropX = (rectLeft! - imgLeft!) / scaleX!;
    const cropY = (rectTop! - imgTop!) / scaleY!;
    const cropWidth = width! / scaleX!;
    const cropHeight = height! / scaleY!;

    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");
    if (!ctx) return;

    tempCanvas.width = cropWidth;
    tempCanvas.height = cropHeight;

    ctx.drawImage(
      imgElement,
      cropX, cropY, cropWidth, cropHeight, 
      0, 0, tempCanvas.width, tempCanvas.height 
    );

    const croppedImg = new Image();
    croppedImg.src = tempCanvas.toDataURL();

    croppedImg.onload = () => {
      const cropped = new fabric.Image(croppedImg, {
        left: rectLeft, 
        top: rectTop,
        scaleX: width! / cropWidth,
        scaleY: height! / cropHeight, 
      });

      canvas.remove(image, cropRect);
      canvas.add(cropped);
      canvas.setActiveObject(cropped);
      canvas.renderAll();
    };
  };

  return (
    <Box sx={{ display: "flex" }}>

      <Box sx={{ display: "flex" }}>
        
        <Stack direction="column" spacing={2} sx={{ alignItems: "flex-start", mr: 12, marginLeft: -8, marginTop: 5 }}>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "14px" }}>
            <IconButton onClick={() => navigate("/start")} sx={{ fontSize: 40, color: "black" }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }} >חזרה</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box
              {...getRootProps()}
              sx={{ border: isDragActive ? "3px solid blue" : "2px dashed gray", padding: "10px", cursor: "pointer", width: 13, height: 13, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mt: 2, backgroundColor: "transparent" }}>
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 30 }} />
            </Box>
            <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>העלאת תמונה</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={addTextToCanvas} sx={{ fontSize: 40, color: "black" }}>
              <TextFieldsIcon />
            </IconButton>
            <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>הוספת טקסט</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={cropImage} sx={{ fontSize: 40, color: "black" }}>
              <CropIcon />
            </IconButton>
            <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>חיתוך אלמנט</Typography>
          </Box>

          {isCrop && <Button onClick={applyCrop} sx={{ fontSize: 20, color: "black", position: "fixed", bottom: 40, left: "50%", transform: "translateX(-50%)", padding: "10px 20px", backgroundColor: "#f0f0f0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", cursor: "pointer" }}>בצע חיתוך</Button>}

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={deleteSelected} sx={{ fontSize: 40, color: "black" }}>
              <DeleteIcon />
            </IconButton>
            <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>מחיקת אלמנט</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={saveCollage} sx={{ fontSize: 40, color: "black",paddingRight:'17px' }}>
              <SaveIcon />
            </IconButton>
            <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }} >שמירה בחשבונך</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "19px" }}>
            <IconButton onClick={download} sx={{ fontSize: 40, color: "black" }}>
              <SaveAltIcon />
            </IconButton>
            <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>הורדה</Typography>
          </Box>
        </Stack>

        <Box sx={{ flex: 1, textAlign: "center", marginTop: 10 ,paddingRight:"50px"}}>
          <Paper sx={{ p: 2, display: "inline-block" }}>
            <canvas id="collageCanvas" style={{ border: "2px solid black", width: "100%", height: "400px" }}></canvas>
          </Paper>
        </Box>
      </Box>

    </Box>



  );
};

export default CollageEditor;
