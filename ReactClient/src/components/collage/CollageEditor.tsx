// import { useEffect, useRef, useState } from "react";
// import * as fabric from "fabric";
// import { useDropzone } from "react-dropzone";
// import html2canvas from "html2canvas";
// import axios from "axios";
// import { uploadCollageToS3 } from "./UpLoad";


// const CollageEditor = () => {
//   const canvasRef = useRef<fabric.Canvas | null>(null);
//   const [frame, setFrame] = useState(false); // סטייט למעקב אחרי מסגרת

//   // אתחול הקנבס
//   useEffect(() => {
//     const canvas = new fabric.Canvas("collageCanvas", {
//       width: 600,
//       height: 400,
//       backgroundColor: "#f3f3f3",
//     });

//     canvasRef.current = canvas;

//     return () => {
//       canvas.dispose();
//     };
//   }, []);

//   // הוספת תמונה לקנבס
//   const addImageToCanvas = (imageSrc: string, file: File) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const imgElement = new Image();
//     imgElement.src = imageSrc;
//     imgElement.onload = () => {
//       const img = new fabric.Image(imgElement, {
//         left: Math.random() * 300,
//         top: Math.random() * 200,
//         scaleX: 0.5,
//         scaleY: 0.5,
//         selectable: true,
//       });
//       canvas.add(img);
//       canvas.setActiveObject(img);
//       canvas.renderAll();
//     };
//   };

//   // Drag & Drop
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: { "image/*": [] },
//     onDrop: (acceptedFiles) => {
//       acceptedFiles.forEach((file) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           if (reader.result) addImageToCanvas(reader.result.toString(), file);
//         };
//         reader.readAsDataURL(file);
//       });
//     },
//   });

//   // הוספת טקסט
//   const addTextToCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const text = new fabric.Textbox("טקסט חדש", {
//       left: 150,
//       top: 150,
//       fontSize: 24,
//       fill: "black",
//       fontFamily: "Arial",
//       backgroundColor: "white",
//       padding: 5,
//     });

//     canvas.add(text);
//     canvas.setActiveObject(text);
//     canvas.renderAll();
//   };

//   // מחיקת האלמנט הנבחר
//   const deleteSelected = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const activeObject = canvas.getActiveObject();
//     if (activeObject) {
//       canvas.remove(activeObject);
//       canvas.renderAll();
//     }
//   };

//   // הוספת מסגרת
//   const addFrame = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || frame) return;

//     const rect = new fabric.Rect({
//       left: 0,
//       top: 0,
//       width: canvas.getWidth(),  // וודא שמוגדר רוחב נכון
//       height: canvas.getHeight(), // וודא שמוגדר גובה נכון
//       fill: "transparent",
//       stroke: "red",
//       strokeWidth: 10,
//       selectable: false,
//       evented: false, // מונע אפשרות לגרור את המסגרת
//     });

//     canvas.add(rect);
//     // rect.sendToBack(); // מעביר את המסגרת לרקע
//     setFrame(true);
//     canvas.renderAll();
//   };

//   // שמירת הקולאז' כתמונה
//   const saveCollage = async () => {
//     const canvasElement = document.getElementById("collageCanvas") as HTMLCanvasElement;
//     if (!canvasElement) return;

//     const imgData = await html2canvas(canvasElement).then((canvas) => canvas.toDataURL("image/png"));

//     const byteString = atob(imgData.split(',')[1]);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const uintArray = new Uint8Array(arrayBuffer);
//     for (let i = 0; i < byteString.length; i++) {
//       uintArray[i] = byteString.charCodeAt(i);
//     }
//     const file = new File([uintArray], `collage_${Math.random().toString(36).substring(2, 15)}.png`, { type: "image/png" });

//     // await uploadCollageToS3(file);
//     const a = document.createElement("a");
//     a.href = imgData;
//     a.download = "collage.png";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h2>עורך קולאז'</h2>

//       {/* אזור העלאת תמונות */}
//       <div
//         {...getRootProps()}
//         style={{
//           border: "2px dashed gray",
//           padding: "20px",
//           cursor: "pointer",
//           marginBottom: "10px",
//         }}
//       >
//         <input {...getInputProps()} />
//         גרור ושחרר כאן תמונות או לחץ לבחירת קובץ
//       </div>

//       {/* הקנבס */}
//       <canvas id="collageCanvas"></canvas>

//       {/* כפתורים לשליטה */}
//       <div style={{ marginTop: "10px" }}>
//         <button onClick={addTextToCanvas} style={{ marginRight: "10px" }}>
//           ✏️ הוסף טקסט
//         </button>
//         <button onClick={deleteSelected} style={{ marginRight: "10px" }}>
//           🗑️ מחק אלמנט
//         </button>
//         <button onClick={addFrame} style={{ marginRight: "10px" }}>
//           🖼️ הוסף מסגרת
//         </button>
//         <button onClick={saveCollage}>💾 שמור קולאז'</button>
//       </div>
//     </div>
//   );
// };

// export default CollageEditor;



// import { useEffect, useRef, useState } from "react";
// import * as fabric from "fabric";
// import { useDropzone } from "react-dropzone";
// import html2canvas from "html2canvas";
// import { uploadCollageToS3 } from "./UpLoad";

// const backgrounds = ["#f3f3f3", "#ffebcd", "#add8e6", "#90ee90", "#ffcccb"];
// const emojis = ["😀", "🎉", "❤️", "🌟", "🔥"];

// const CollageEditor = () => {
//   const canvasRef = useRef(null);
//   const [frame, setFrame] = useState(false);
//   const [background, setBackground] = useState(backgrounds[0]);
//   const [isDraggingOver, setIsDraggingOver] = useState(false);

//   useEffect(() => {
//     const canvas = new fabric.Canvas("collageCanvas", {
//       width: 600,
//       height: 400,
//       backgroundColor: background,
//     });

//     canvasRef.current = canvas;
//     return () => canvas.dispose();
//   }, [background]);

//   const addImageToCanvas = (imageSrc) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     fabric.Image.fromURL(imageSrc, (img) => {
//       img.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5, selectable: true });
//       canvas.add(img);
//     });
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: { "image/*": [] },
//     onDragEnter: () => setIsDraggingOver(true),
//     onDragLeave: () => setIsDraggingOver(false),
//     onDrop: (acceptedFiles) => {
//       setIsDraggingOver(false);
//       acceptedFiles.forEach((file) => {
//         const reader = new FileReader();
//         reader.onload = () => reader.result && addImageToCanvas(reader.result.toString());
//         reader.readAsDataURL(file);
//       });
//     },
//   });

//   const addTextToCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const text = new fabric.Textbox("טקסט חדש", {
//       left: 150,
//       top: 150,
//       fontSize: 24,
//       fill: "black",
//       fontFamily: "Arial",
//       backgroundColor: "white",
//       padding: 5,
//     });

//     canvas.add(text);
//   };

//   const addEmojiToCanvas = (emoji) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const text = new fabric.Text(emoji, {
//       left: Math.random() * 300,
//       top: Math.random() * 200,
//       fontSize: 50,
//     });

//     canvas.add(text);
//   };

//   const deleteSelected = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const activeObject = canvas.getActiveObject();
//     if (activeObject) {
//       canvas.remove(activeObject);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h2>עורך קולאז'</h2>
//       <div>
//         <label>בחר רקע:</label>
//         {backgrounds.map((bg) => (
//           <button
//             key={bg}
//             style={{ backgroundColor: bg, width: 30, height: 30, margin: 5 }}
//             onClick={() => setBackground(bg)}
//           />
//         ))}
//       </div>
//       <div
//         {...getRootProps()}
//         style={{
//           border: `2px ${isDraggingOver ? "solid blue" : "dashed gray"}`,
//           padding: "20px",
//           cursor: "pointer",
//           marginBottom: "10px",
//         }}
//       >
//         <input {...getInputProps()} />
//         גרור ושחרר כאן תמונות או לחץ לבחירת קובץ
//       </div>
//       <canvas id="collageCanvas"></canvas>
//       <div style={{ marginTop: "10px" }}>
//         <button onClick={addTextToCanvas}>✏️ הוסף טקסט</button>
//         <button onClick={deleteSelected}>🗑️ מחק אלמנט</button>
//       </div>
//       <div>
//         <label>הוסף אימוג'י:</label>
//         {emojis.map((emoji) => (
//           <button key={emoji} onClick={() => addEmojiToCanvas(emoji)}>{emoji}</button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CollageEditor;

// import { useEffect, useRef, useState } from "react";
// import * as fabric from "fabric";
// import { useDropzone } from "react-dropzone";
// import html2canvas from "html2canvas";
// import CollageStore from "../stores/CollageStore";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../stores/Store";


// const CollageEditor = ({ selectedBackground, isOpen }: { selectedBackground: string, isOpen: boolean }) => {

//   const dispatch = useDispatch()
//   const userId = useSelector((state: RootState) => state.token.user?.userId)
//   const token = useSelector((state: RootState) => state.token.token)
//   const canvasRef = useRef<fabric.Canvas | null>(null);
//   const [frame, setFrame] = useState(false);

//   useEffect(() => {
//     console.log(isOpen);
//     console.log(selectedBackground);
//     const image = new Image();
//     image.src = selectedBackground;
//     const canvas = new fabric.Canvas("collageCanvas", {
//       width: 1200,
//       height: 400,
//     });
//     canvasRef.current = canvas;
//     image.onload = () => {
//       const fabricImage = new fabric.Image(image, {
//         scaleX: canvas.width / image.width,
//         scaleY: canvas.height / image.height,
//       });
//       canvas.backgroundImage = fabricImage
//       canvas.renderAll()
//     };
//     return () => {
//       canvas.dispose();
//     };
//   }, [selectedBackground]);

//   const addImageToCanvas = (imageSrc: string, file: File) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const imgElement = new Image();
//     imgElement.src = imageSrc;
//     imgElement.onload = () => {
//       const img = new fabric.Image(imgElement, {
//         left: Math.random() * 300,
//         top: Math.random() * 200,
//         scaleX: 0.5,
//         scaleY: 0.5,
//         selectable: true,
//       });
//       canvas.add(img);
//       canvas.setActiveObject(img);
//       canvas.renderAll();
//     };
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: { "image/*": [] },
//     onDrop: (acceptedFiles) => {
//       acceptedFiles.forEach((file) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           if (reader.result) addImageToCanvas(reader.result.toString(), file);
//         };
//         reader.readAsDataURL(file);
//       });
//     },
//   });

//   const addTextToCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const text = new fabric.Textbox("טקסט חדש", {
//       left: 150,
//       top: 150,
//       fontSize: 24,
//       fill: "black",
//       fontFamily: "Arial",
//       backgroundColor: "white",
//       padding: 5,
//     });

//     canvas.add(text);
//     canvas.setActiveObject(text);
//     canvas.renderAll();
//   };

//   const addEmoji = (emoji: string) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const text = new fabric.Text(emoji, {
//       left: Math.random() * 300,
//       top: Math.random() * 200,
//       fontSize: 40,
//     });

//     canvas.add(text);
//     canvas.renderAll();
//   };

//   const deleteSelected = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const activeObject = canvas.getActiveObject();
//     if (activeObject) {
//       canvas.remove(activeObject);
//       canvas.renderAll();
//     }
//   };

//   const addFrame = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || frame) return;

//     const rect = new fabric.Rect({
//       left: 0,
//       top: 0,
//       width: canvas.getWidth(),
//       height: canvas.getHeight(),
//       fill: "transparent",
//       stroke: "red",
//       strokeWidth: 10,
//       selectable: false,
//       evented: false,
//     });

//     canvas.add(rect);
//     setFrame(true);
//     canvas.renderAll();
//   };

//   const saveCollage = async () => {
//     const canvasElement = document.getElementById("collageCanvas") as HTMLCanvasElement;
//     if (!canvasElement) return;
//     const imgData = await html2canvas(canvasElement).then((canvas) => canvas.toDataURL("image/png"));
//     const byteString = atob(imgData.split(',')[1]);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const uintArray = new Uint8Array(arrayBuffer);
//     for (let i = 0; i < byteString.length; i++) {
//       uintArray[i] = byteString.charCodeAt(i);
//     }

//     const file = new File([uintArray], `collage_${Math.random().toString(36).substring(2, 15)}.png`, { type: "image/png" });
//     const url = await CollageStore.uploadCollageToS3(file, token);
//     await CollageStore.addCollage(file, token, userId, url, dispatch);

//     const a = document.createElement("a");
//     a.href = imgData;
//     a.download = "collage.png";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   return isOpen && (
//     <div style={{ textAlign: "center" }}>
//       <h2>עורך קולאז'</h2>


//       <div
//         {...getRootProps()}
//         style={{
//           border: isDragActive ? "3px solid blue" : "2px dashed gray",
//           padding: "20px",
//           cursor: "pointer",
//           marginBottom: "10px",
//         }}
//       >
//         <input {...getInputProps()} />
//         גרור ושחרר כאן תמונות או לחץ לבחירת קובץ
//       </div>

//       <canvas id="collageCanvas" style={{ border: "2px solid black" }}></canvas>
//       <div style={{ marginTop: "10px" }}>
//         <button onClick={addTextToCanvas} style={{ marginRight: "10px" }}>✏️ הוסף טקסט</button>
//         <button onClick={deleteSelected} style={{ marginRight: "10px" }}>🗑️ מחק אלמנט</button>
//         <button onClick={addFrame} style={{ marginRight: "10px" }}>🖼️ הוסף מסגרת</button>
//         <button onClick={saveCollage}>💾 שמור קולאז'</button>
//       </div>
//       <div style={{ marginTop: "10px" }}>
//         <h4>בחר אימוג'י להוספה:</h4>
//         {["😀", "🎉", "❤️", "🌟", "🔥", "🚀"].map((emoji) => (
//           <button key={emoji} onClick={() => addEmoji(emoji)} style={{ fontSize: "24px", margin: "5px" }}>{emoji}</button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CollageEditor;

// import { useEffect, useRef, useState } from "react";
// import * as fabric from "fabric";
// import { useDropzone } from "react-dropzone";
// import html2canvas from "html2canvas";
// import CollageStore from "../stores/CollageStore";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../stores/Store";
// import { Button, IconButton, Stack } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import TextFieldsIcon from "@mui/icons-material/TextFields";
// import SaveAltIcon from "@mui/icons-material/SaveAlt";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import FrameIcon from "@mui/icons-material";


// const CollageEditor = ({ selectedBackground, isOpen }: { selectedBackground: string, isOpen: boolean }) => {

//   const dispatch = useDispatch()
//   const userId = useSelector((state: RootState) => state.token.user?.userId)
//   const token = useSelector((state: RootState) => state.token.token)
//   const canvasRef = useRef<fabric.Canvas | null>(null);
//   const [frame, setFrame] = useState(false);

//   useEffect(() => {
//     console.log(isOpen);
//     console.log(selectedBackground);
//     const image = new Image();
//     image.src = selectedBackground;
//     const canvas = new fabric.Canvas("collageCanvas", {
//       width: 1200,
//       height: 400,
//     });
//     canvasRef.current = canvas;
//     image.onload = () => {
//       const fabricImage = new fabric.Image(image, {
//         scaleX: canvas.width / image.width,
//         scaleY: canvas.height / image.height,
//       });
//       canvas.backgroundImage = fabricImage
//       canvas.renderAll()
//     };
//     return () => {
//       canvas.dispose();
//     };
//   }, [selectedBackground]);

//   const addImageToCanvas = (imageSrc: string, file: File) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const imgElement = new Image();
//     imgElement.src = imageSrc;
//     imgElement.onload = () => {
//       const img = new fabric.Image(imgElement, {
//         left: Math.random() * 300,
//         top: Math.random() * 200,
//         scaleX: 0.5,
//         scaleY: 0.5,
//         selectable: true,
//       });
//       canvas.add(img);
//       canvas.setActiveObject(img);
//       canvas.renderAll();
//     };
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: { "image/*": [] },
//     onDrop: (acceptedFiles) => {
//       acceptedFiles.forEach((file) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           if (reader.result) addImageToCanvas(reader.result.toString(), file);
//         };
//         reader.readAsDataURL(file);
//       });
//     },
//   });

//   const addTextToCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const text = new fabric.Textbox("טקסט חדש", {
//       left: 150,
//       top: 150,
//       fontSize: 24,
//       fill: "black",
//       fontFamily: "Arial",
//       backgroundColor: "white",
//       padding: 5,
//     });

//     canvas.add(text);
//     canvas.setActiveObject(text);
//     canvas.renderAll();
//   };

//   const addEmoji = (emoji: string) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const text = new fabric.Text(emoji, {
//       left: Math.random() * 300,
//       top: Math.random() * 200,
//       fontSize: 40,
//     });

//     canvas.add(text);
//     canvas.renderAll();
//   };

//   const deleteSelected = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const activeObject = canvas.getActiveObject();
//     if (activeObject) {
//       canvas.remove(activeObject);
//       canvas.renderAll();
//     }
//   };

//   const addFrame = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || frame) return;

//     const rect = new fabric.Rect({
//       left: 0,
//       top: 0,
//       width: canvas.getWidth(),
//       height: canvas.getHeight(),
//       fill: "transparent",
//       stroke: "red",
//       strokeWidth: 10,
//       selectable: false,
//       evented: false,
//     });

//     canvas.add(rect);
//     setFrame(true);
//     canvas.renderAll();
//   };

//   const saveCollage = async () => {
//     const canvasElement = document.getElementById("collageCanvas") as HTMLCanvasElement;
//     if (!canvasElement) return;
//     const imgData = await html2canvas(canvasElement).then((canvas) => canvas.toDataURL("image/png"));
//     const byteString = atob(imgData.split(',')[1]);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const uintArray = new Uint8Array(arrayBuffer);
//     for (let i = 0; i < byteString.length; i++) {
//       uintArray[i] = byteString.charCodeAt(i);
//     }

//     const file = new File([uintArray], `collage_${Math.random().toString(36).substring(2, 15)}.png`, { type: "image/png" });
//     const url = await CollageStore.uploadCollageToS3(file, token);
//     await CollageStore.addCollage(file, token, userId, url, dispatch);

//     const a = document.createElement("a");
//     a.href = imgData;
//     a.download = "collage.png";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   return isOpen && (
//     <div style={{ display: "flex" }}>
//       <Stack direction="column" spacing={2} style={{ margin: "20px", alignItems: "center" }}>
//         <IconButton onClick={addTextToCanvas} color="primary" style={{ fontSize: 40 }}>
//           <TextFieldsIcon />
//         </IconButton>
//         <IconButton onClick={deleteSelected} color="secondary" style={{ fontSize: 40 }}>
//           <DeleteIcon />
//         </IconButton>
//         {/* <IconButton onClick={addFrame} color="primary" style={{ fontSize: 40 }}>
//           <FrameIcon />
//         </IconButton> */}
//         <IconButton onClick={saveCollage} color="primary" style={{ fontSize: 40 }}>
//           <SaveAltIcon />
//         </IconButton>
//         {/* <h4>בחר אימוג'י להוספה:</h4> */}
//         {/* {["😀", "🎉", "❤️", "🌟", "🔥", "🚀"].map((emoji) => (
//           <IconButton key={emoji} onClick={() => addEmoji(emoji)} style={{ fontSize: 40, margin: "5px" }}>
//             <EmojiEmotionsIcon />
//           </IconButton>
//         ))} */}
//       </Stack>

//       <div style={{ flex: 1, textAlign: "center" }}>
//         <div
//           {...getRootProps()}
//           style={{
//             border: isDragActive ? "3px solid blue" : "2px dashed gray",
//             padding: "20px",
//             cursor: "pointer",
//             marginBottom: "10px",
//           }}
//         >
//           <input {...getInputProps()} />
//           גרור ושחרר כאן תמונות או לחץ לבחירת קובץ
//         </div>

//         <canvas id="collageCanvas" style={{ border: "2px solid black" }}></canvas>
//       </div>
//     </div>
//   );
// };

// export default CollageEditor;


// import FrameIcon from "@mui/icons-material/Frame";

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

    // יצירת ריבוע חיתוך בגבולות קטנים יותר מהתמונה
    const cropRect = new fabric.Rect({
      left: activeObject.left! + 20,
      top: activeObject.top! + 20,
      width: (activeObject.width! * activeObject.scaleX!) - 40,
      height: (activeObject.height! * activeObject.scaleY!) - 40,
      fill: "rgba(255, 255, 255, 0.3)", // חצי שקוף
      stroke: "red",
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      hasBorders: true,
      lockRotation: true, // לא מאפשר סיבוב
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

    // חיפוש המסגרת האדומה (הריבוע)
    const cropRect = canvas.getObjects().find((obj) => obj.type === "rect") as fabric.Rect;
    if (!cropRect) return;

    // גישה למימדים ולמיקום של התמונה והמסגרת
    const image = activeObject as fabric.Image;
    const imgElement = image._element as HTMLImageElement;
    if (!imgElement) return;

    const { left: imgLeft, top: imgTop, scaleX, scaleY } = image;
    const { left: rectLeft, top: rectTop, width, height } = cropRect;

    // חישוב יחס החיתוך מהתמונה המקורית
    const cropX = (rectLeft! - imgLeft!) / scaleX!;
    const cropY = (rectTop! - imgTop!) / scaleY!;
    const cropWidth = width! / scaleX!;
    const cropHeight = height! / scaleY!;

    // יצירת קנבס זמני בגודל החיתוך
    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");
    if (!ctx) return;

    tempCanvas.width = cropWidth;
    tempCanvas.height = cropHeight;

    // חיתוך התמונה לפי החלק המסומן
    ctx.drawImage(
      imgElement,
      cropX, cropY, cropWidth, cropHeight, // מקור התמונה (x, y, רוחב, גובה)
      0, 0, tempCanvas.width, tempCanvas.height // מיקום בקנבס החדש
    );

    // יצירת תמונה חתוכה חדשה
    const croppedImg = new Image();
    croppedImg.src = tempCanvas.toDataURL();

    croppedImg.onload = () => {
      // הצגת התמונה החתוכה בגודל של המסגרת האדומה
      const cropped = new fabric.Image(croppedImg, {
        left: rectLeft, // הצגת התמונה במיקום של המסגרת
        top: rectTop,
        // השארת ה-scaleX וה-scaleY כפי שהם (אם יש צורך לשנות אותם ניתן לעשות זאת בהתאם)
        scaleX: width! / cropWidth, // התאמת הגודל לכל רוחב התמונה
        scaleY: height! / cropHeight, // התאמת הגובה של התמונה
      });

      // הסרת התמונה המקורית והריבוע מהקנבס
      canvas.remove(image, cropRect);
      canvas.add(cropped);
      canvas.setActiveObject(cropped);
      canvas.renderAll();
    };
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Box sx={{ position: "fixed", bottom: 0, left: 0, width: "100%", backgroundColor: "white", }}>
        <Box sx={{ flex: 1, textAlign: "center", marginTop: 10 }}>
          <Paper sx={{ p: 2, display: "inline-block" }}>
            <canvas id="collageCanvas" style={{ border: "2px solid black", width: "100%", height: "400px" }}></canvas>
          </Paper>
        </Box>
        <Stack direction="row" spacing={16} sx={{marginBottom:5, justifyContent: "center", alignItems: "center", marginTop: 5, display: "flex",  padding: "10px" }}>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={() => navigate("/start")} sx={{ fontSize: 40, color: "black" }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="caption">חזרה</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box
              {...getRootProps()}
              sx={{ border: isDragActive ? "3px solid blue" : "2px dashed gray",  cursor: "pointer", width: 40, height: 40, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mt: 1, backgroundColor: "transparent" }}>
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 30 }} />
            </Box>
            <Typography variant="caption">העלאת תמונה</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={addTextToCanvas} sx={{ fontSize: 40, color: "black" }}>
              <TextFieldsIcon />
            </IconButton>
            <Typography variant="caption">הוספת טקסט</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={cropImage} sx={{ fontSize: 40, color: "black" }}>
              <CropIcon />
            </IconButton>
            <Typography variant="caption">חיתוך אלמנט</Typography>
          </Box>

          {isCrop && <Button onClick={applyCrop} sx={{ fontSize: 20, color: "black", padding: "10px 20px", backgroundColor: "#f0f0f0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", cursor: "pointer" }}>בצע חיתוך</Button>}

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={deleteSelected} sx={{ fontSize: 40, color: "black" }}>
              <DeleteIcon />
            </IconButton>
            <Typography variant="caption">מחיקת אלמנט</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={saveCollage} sx={{ fontSize: 40, color: "black" }}>
              <SaveIcon />
            </IconButton>
            <Typography variant="caption">שמירה בחשבונך</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton onClick={download} sx={{ fontSize: 40, color: "black" }}>
              <SaveAltIcon />
            </IconButton>
            <Typography variant="caption">הורדה</Typography>
          </Box>
        </Stack>
      </Box> */}

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
