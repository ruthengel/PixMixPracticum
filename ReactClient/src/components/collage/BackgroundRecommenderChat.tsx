// import { useState } from "react";
// const myUrl = import.meta.env.VITE_SERVERURL
// export default function ChatBot() {
//     const [open, setOpen] = useState(false);
//     const [messages, setMessages] = useState([
//         {
//             sender: "bot",
//             text: `ברוך הבא! כתוב לי:
// - כמה תמונות יש לך לקולאז'
// - איזה צבעים או סגנון אתה מחפש
// - לאיזו מטרה הקולאז' (אירוע? זיכרון?)
// ואני אמליץ לך על רקע מתאים`
//         }
//     ]);
//     const [input, setInput] = useState("");

//     const sendMessage = async () => {
//         if (!input.trim()) return;

//         const newMessages = [...messages, { sender: "user", text: input }];
//         setMessages(newMessages);
//         setInput("");

//         const res = await fetch(`${myUrl}/api/ChatBot`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ messages: [{ role: "user", content: input }] })
//         });
//         const data = await res.json();

//         setMessages([...newMessages, { sender: "bot", text: data.reply }]);
//     };

//     return (
//         <>
//             <button
//                 onClick={() => setOpen(!open)}
//                 className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg"
//             >
//                 💬
//             </button>

//             {open && (
//                 <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-lg border p-3">
//                     <h3 className="text-lg font-bold mb-2">עוזר קולאז'</h3>
//                     <div className="h-48 overflow-y-auto border p-2 rounded bg-gray-50 mb-2 text-sm space-y-2">
//                         {messages.map((msg, idx) => (
//                             <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
//                                 <span className="inline-block px-2 py-1 rounded bg-gray-200">
//                                     {msg.text}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="flex">
//                         <input
//                             type="text"
//                             className="flex-1 border rounded p-1 text-sm"
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                             placeholder="כתוב פה את הבקשה שלך..."
//                         />
//                         <button
//                             onClick={sendMessage}
//                             className="ml-2 bg-blue-600 text-white px-3 rounded"
//                         >
//                             שלח
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import {Box,IconButton,Modal,CircularProgress,Typography,TextField,List,ListItem,Avatar,Fade,Paper,Tooltip} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import SendIcon from "@mui/icons-material/Send";
// import SmartToyIcon from "@mui/icons-material/SmartToy";
// import ChatIcon from "@mui/icons-material/Chat";
// import PersonIcon from "@mui/icons-material/Person";
// import React from "react";
// const apiUrl = import.meta.env.VITE_APP_API_URL;

// export default function ChatBot() {
//   const [open, setOpen] = useState(false);
//   const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showTypingIndicator, setShowTypingIndicator] = useState(false);
//   const messagesEndRef = useRef<null | HTMLDivElement>(null);

//   // Scroll to bottom when messages change
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chat]);

//   const handleOpen = async () => {
//     setOpen(true);
//     setChat([]); 
//     // await sendMessage("system", `אתה עוזר יצירתי באתר SIB, שבו יוצרים מעלים תמונות AI לפי אתגרים. דבר רק על האתר, האתגרים, השראה, יצירתיות ודירוגים.`);
//     // await sendMessage("user", `האתגר הנוכחי הוא: "${challengeTopic}". תיאור האתגר: "${challengeDescription}". תן לי רעיונות לפרומפטים.`);
//   };

//   const sendMessage = async (role: string, content: string) => {
//     setChat((prev) => [...prev, { role, content }]);
//     if (role === "user" || role === "system") {
//       setLoading(true);
//       setShowTypingIndicator(true);
//       try {
//         const response = await axios.post(`${apiUrl}/api/ChatBot`, {
//           messages: [...chat, { role, content }]
//         });

//         setTimeout(() => {
//           setShowTypingIndicator(false);
//           const botReply = response.data.reply;
//           setChat((prev) => [...prev, { role: "assistant", content: botReply }]);
//           setLoading(false);
//         }, 1000);
//       } catch (err) {
//         console.error("Error during chat:", err);
//         setShowTypingIndicator(false);
//         setLoading(false);
//         setChat((prev) => [...prev, { role: "assistant", content: "אירעה שגיאה בתקשורת. אנא נסה שוב מאוחר יותר." }]);
//       }
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim() || loading) return;
//     await sendMessage("user", input.trim());
//     setInput("");
//   };

//   const TypingIndicator = () => (
//     <Box sx={{ display: 'flex', gap: 0.5, p: 1, alignItems: 'center' }}>
//       <div className="dot" style={{ 
//         width: 5, 
//         height: 5, 
//         borderRadius: '50%', 
//         backgroundColor: '#f1535d',
//         opacity: 0.7,
//         animation: 'pulse 1.5s infinite',
//         animationDelay: '0s'
//       }}></div>
//       <div className="dot" style={{ 
//         width: 5, 
//         height: 5, 
//         borderRadius: '50%', 
//         backgroundColor: '#f1535d',
//         opacity: 0.7,
//         animation: 'pulse 1.5s infinite',
//         animationDelay: '0.3s'
//       }}></div>
//       <div className="dot" style={{ 
//         width: 5, 
//         height: 5, 
//         borderRadius: '50%', 
//         backgroundColor: '#f1535d',
//         opacity: 0.7,
//         animation: 'pulse 1.5s infinite',
//         animationDelay: '0.6s'
//       }}></div>
//       <style >{`
//         @keyframes pulse {
//           0% { transform: scale(0.8); opacity: 0.5; }
//           50% { transform: scale(1.2); opacity: 1; }
//           100% { transform: scale(0.8); opacity: 0.5; }
//         }
//       `}</style>
//     </Box>
//   );

//   return (
//     <>
//       <Tooltip title="Get Creative Ideas" placement="left">
//       <IconButton 
//   onClick={handleOpen} 
//   sx={{
//     position: 'fixed',
//     bottom: '20px',
//     right: '20px',
//     width: '65px',
//     height: '65px',
//     borderRadius: '50%',
//     backgroundColor: 'rgba(24, 24, 26, 0.95)',
//     color: 'white',
//     boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
//     zIndex: 1000,
//     transition: 'all 0.3s ease',
//     border: '1px solid rgba(255, 255, 255, 0.08)',
//     '&:hover': {
//       transform: 'scale(1.05)',
//       boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
//       backgroundColor: 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%) 1 ',
//       borderStyle: 'solid',
//       borderWidth: '2px'
//     }
//   }}
//   aria-label="Chat assistant"
// >
//   <ChatIcon sx={{ fontSize: 30 }} />
// </IconButton>
//       </Tooltip>

//       <Modal 
//         open={open} 
//         onClose={() => setOpen(false)}
//         closeAfterTransition
//       >
//         <Fade in={open}>
//           <Paper sx={{
//             width: { xs: '90%', sm: '420px' },
//             height: '520px',
//             maxHeight: '85vh',
//             position: 'fixed',
//             bottom: '90px',
//             right: '20px',
//             borderRadius: '18px',
//             overflow: 'hidden',
//             boxShadow: '0 5px 25px rgba(0,0,0,0.35)',
//             display: 'flex',
//             flexDirection: 'column',
//             background: '#111215',
//             border: '1px solid rgba(255, 255, 255, 0.06)'
//           }}>
//             {/* Header */}
//             <Box sx={{
//               p: 2,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderBottom: '1px solid rgba(255,255,255,0.06)',
//               background: 'rgba(0,0,0,0.3)',
//             }}>
//               <Box display="flex" alignItems="center" gap={1.8}>
//                 <Avatar sx={{ 
//                   bgcolor: 'transparent', 
//                   width: 36,
//                   height: 36,
//                   border: '1px solid rgba(255, 255, 255, 0.1)',
//                   background: 'rgba(15, 15, 17, 0.95)',
//                   position: 'relative',
//                   '&::before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: '-2px',
//                     left: '-2px',
//                     right: '-2px',
//                     bottom: '-2px',
//                     borderRadius: '50%',
//                     background: 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)',
//                     opacity: 0.7,
//                     zIndex: -1,
//                   }
//                 }}>
//                   <SmartToyIcon sx={{ color: '#fff', fontSize: '20px' }} />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="subtitle1" sx={{ 
//                     color: '#fff',
//                     fontWeight: 500,
//                     fontFamily: '"Poppins", "Roboto", sans-serif',
//                     fontSize: '16px',
//                     letterSpacing: '0.3px'
//                   }}>
//                     Creative Assistant
//                   </Typography>
//                   <Typography variant="caption" sx={{ 
//                     color: '#aaa', 
//                     fontFamily: '"Poppins", "Roboto", sans-serif',
//                     fontSize: '12px',
//                     letterSpacing: '0.2px'
//                   }}>
//                     Get inspiration for your challenge
//                   </Typography>
//                 </Box>
//               </Box>
//               <IconButton onClick={() => setOpen(false)} sx={{ 
//                 color: '#aaa', 
//                 padding: '6px',
//                 '&:hover': { color: '#fff' } 
//               }}>
//                 <CloseIcon fontSize="small" />
//               </IconButton>
//             </Box>

//             {/* Challenge Info Banner */}
//             <Box sx={{ 
//               p: 2, 
//               py: 1.2,
//               background: 'rgba(255, 255, 255, 0.02)',
//               borderBottom: '1px solid rgba(255,255,255,0.04)'
//             }}>
//               <Typography variant="caption" sx={{ 
//                 color: '#bbb',
//                 fontSize: '12px',
//                 fontFamily: '"Poppins", "Roboto", sans-serif',
//                 letterSpacing: '0.2px'
//               }}>
//                 {/* <span style={{ fontWeight: 600, color: '#eee' }}>Current Challenge:</span> {challengeTopic} */}
//               </Typography>
//             </Box>

//             {/* Messages Area */}
//             <List sx={{ 
//               flexGrow: 1, 
//               overflowY: 'auto', 
//               p: 2, 
//               display: 'flex', 
//               flexDirection: 'column', 
//               gap: 2,
//               '&::-webkit-scrollbar': {
//                 width: '4px',
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 backgroundColor: 'rgba(255, 255, 255, 0.15)',
//                 borderRadius: '4px',
//               },
//               '&::-webkit-scrollbar-track': {
//                 backgroundColor: 'rgba(0,0,0,0.1)',
//               }
//             }}>
//               {chat.filter(m => m.role !== 'system').map((message, i) => (
//                 <ListItem
//                   key={i}
//                   sx={{
//                     display: 'flex',
//                     p: 0,
//                     width: '100%',
//                     justifyContent: message.role === "user" ? "flex-end" : "flex-start",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       gap: 1.2,
//                       alignItems: 'flex-start',
//                       flexDirection: message.role === "user" ? 'row-reverse' : 'row',
//                       maxWidth: '92%',
//                     }}
//                   >
//                     <Avatar
//                       sx={{
//                         width: 28,
//                         height: 28,
//                         bgcolor: 'rgba(15, 15, 17, 0.95)',
//                         border: message.role === "user" 
//                           ? '1px solid rgba(255, 255, 255, 0.15)'
//                           : '1px solid rgba(241, 83, 93, 0.2)',
//                         position: 'relative',
//                         '&::before': {
//                           content: '""',
//                           position: 'absolute',
//                           top: '-1.5px',
//                           left: '-1.5px',
//                           right: '-1.5px',
//                           bottom: '-1.5px',
//                           borderRadius: '50%',
//                           background: message.role === "user"
//                             ? 'linear-gradient(to right, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2))'
//                             : 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)',
//                           opacity: 0.5,
//                           zIndex: -1,
//                         },
//                         fontSize: '14px'
//                       }}
//                     >
//                       {message.role === "user" ? (
//                         <PersonIcon sx={{ color: '#fff', fontSize: '15px' }} />
//                       ) : (
//                         <SmartToyIcon sx={{ color: '#fff', fontSize: '15px' }} />
//                       )}
//                     </Avatar>
//                     <Paper
//                       elevation={0}
//                       sx={{
//                         p: 1.8,
//                         borderRadius: 2.5,
//                         backgroundColor: message.role === "user" 
//                           ? 'rgba(255, 255, 255, 0.03)'
//                           : 'rgba(255, 255, 255, 0.01)',
//                         border: message.role === "user"
//                           ? '1px solid rgba(255, 255, 255, 0.08)'
//                           : '1px solid rgba(255, 255, 255, 0.04)',
//                         borderLeft: message.role === "assistant" ? '2px solid rgba(241, 83, 93, 0.25)' : undefined,
//                         borderRight: message.role === "user" ? '2px solid rgba(255, 255, 255, 0.15)' : undefined,
//                         color: '#fff',
//                         direction: 'rtl',
//                         maxWidth: '100%',
//                         wordBreak: 'break-word'
//                       }}
//                     >
//                       <Typography 
//                         variant="body2" 
//                         sx={{ 
//                           whiteSpace: 'pre-wrap',
//                           fontFamily: '"Assistant", "Heebo", sans-serif',
//                           fontSize: '14px',
//                           textAlign: 'right',
//                           lineHeight: 1.7,
//                           color: message.role === "user" ? '#fff' : '#eee',
//                         }}
//                       >
//                         {message.role === "assistant" 
//                           ? formatNumberedIdeas(message.content)
//                           : message.content
//                         }
//                       </Typography>
//                     </Paper>
//                   </Box>
//                 </ListItem>
//               ))}

//               {showTypingIndicator && (
//                 <ListItem sx={{ p: 0, justifyContent: "flex-start" }}>
//                   <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'flex-end' }}>
//                     <Avatar
//                       sx={{
//                         width: 28,
//                         height: 28,
//                         bgcolor: 'rgba(15, 15, 17, 0.95)',
//                         border: '1px solid rgba(241, 83, 93, 0.2)',
//                         position: 'relative',
//                         '&::before': {
//                           content: '""',
//                           position: 'absolute',
//                           top: '-1.5px',
//                           left: '-1.5px',
//                           right: '-1.5px',
//                           bottom: '-1.5px',
//                           borderRadius: '50%',
//                           background: 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)',
//                           opacity: 0.5,
//                           zIndex: -1,
//                         }
//                       }}
//                     >
//                       <SmartToyIcon sx={{ color: '#fff', fontSize: '15px' }} />
//                     </Avatar>
//                     <Paper
//                       elevation={0}
//                       sx={{
//                         borderRadius: 2.5,
//                         backgroundColor: 'rgba(255, 255, 255, 0.01)',
//                         border: '1px solid rgba(255, 255, 255, 0.04)',
//                         borderLeft: '2px solid rgba(241, 83, 93, 0.25)',
//                       }}
//                     >
//                       <TypingIndicator />
//                     </Paper>
//                   </Box>
//                 </ListItem>
//               )}
//               <div ref={messagesEndRef} />
//             </List>

//             {/* Input Area */}
//             <Box sx={{ 
//               p: 2, 
//               backgroundColor: 'rgba(0,0,0,0.25)',
//               borderTop: '1px solid rgba(255,255,255,0.04)',
//               display: 'flex',
//               gap: 1.2
//             }}>
//               <TextField
//                 fullWidth
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
//                 placeholder="שאל על רעיונות לפרומפט..."
//                 multiline
//                 maxRows={2}
//                 size="small"
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     color: 'white',
//                     borderRadius: 2.5,
//                     backgroundColor: 'rgba(255,255,255,0.02)',
//                     fontSize: '14px',
//                     '& fieldset': {
//                       borderColor: 'rgba(255,255,255,0.08)',
//                     },
//                     '&:hover fieldset': {
//                       borderColor: 'rgba(255,255,255,0.15)',
//                     },
//                     '&.Mui-focused fieldset': {
//                       borderColor: 'rgba(241, 83, 93, 0.35)',
//                       borderWidth: '1px',
//                     },
//                   },
//                   '& .MuiInputBase-input::placeholder': {
//                     color: 'rgba(255,255,255,0.4)',
//                     opacity: 1,
//                     fontSize: '14px',
//                   },
//                 }}
//                 InputProps={{
//                   sx: { 
//                     color: '#fff', 
//                     direction: 'rtl',
//                     fontFamily: '"Assistant", "Heebo", sans-serif',
//                     padding: '12px 14px',
//                   }
//                 }}
//               />
//               <Tooltip title="Send Message">
//                 <span>
//                   <IconButton 
//                     onClick={handleSend} 
//                     disabled={loading || !input.trim()} 
//                     sx={{
//                       height: '42px',
//                       width: '42px',
//                       backgroundColor: 'rgba(15, 15, 17, 0.95)',
//                       color: 'white',
//                       position: 'relative',
//                       border: '1px solid rgba(255, 255, 255, 0.06)',
//                       '&::before': {
//                         content: '""',
//                         position: 'absolute',
//                         top: '-1.5px',
//                         left: '-1.5px',
//                         right: '-1.5px',
//                         bottom: '-1.5px',
//                         borderRadius: '50%',
//                         background: 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)',
//                         opacity: 0.6,
//                         transition: 'opacity 0.3s ease',
//                         zIndex: -1,
//                       },
//                       '&:hover': { 
//                         backgroundColor: 'rgba(20, 20, 22, 0.95)',
//                         '&::before': {
//                           opacity: 0.8,
//                         }
//                       },
//                       '&.Mui-disabled': {
//                         backgroundColor: 'rgba(15, 15, 17, 0.6)',
//                         '&::before': {
//                           opacity: 0.2,
//                         },
//                         color: 'rgba(255,255,255,0.2)'
//                       }
//                     }}
//                   >
//                     {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <SendIcon fontSize="small" />}
//                   </IconButton>
//                 </span>
//               </Tooltip>
//             </Box>
//           </Paper>
//         </Fade>
//       </Modal>
//     </>
//   );
// }

// // Helper function to format numbered ideas
// function formatNumberedIdeas(content: string): React.ReactNode {
//   // Check if the content has numbered ideas like "1.", "2.", etc.
//   const lines = content.split('\n');
//   const numberedPattern = /^\d+\.\s/;

//   // If there are no numbered lines, return the content as is
//   if (!lines.some(line => numberedPattern.test(line))) {
//     return content;
//   }

//   // Process the text to properly format numbered ideas
//   return lines.map((line, index) => {
//     const match = line.match(numberedPattern);
//     if (match) {
//       return (
//         <React.Fragment key={index}>
//           {index > 0 && <br />}
//           <Box sx={{ display: 'flex', marginBottom: '10px' }}>
//             <Typography 
//               component="span" 
//               sx={{ 
//                 color: 'rgba(241, 83, 93, 0.9)', 
//                 fontWeight: 'bold', 
//                 marginRight: '10px',
//                 minWidth: '20px',
//                 fontSize: '14px'
//               }}
//             >
//               {match[0]}
//             </Typography>
//             <Typography component="span" sx={{ fontSize: '14px' }}>
//               {line.replace(numberedPattern, '')}
//             </Typography>
//           </Box>
//         </React.Fragment>
//       );
//     } else {
//       return (
//         <React.Fragment key={index}>
//           {index > 0 && <br />}
//           {line}
//         </React.Fragment>
//       );
//     }
//   });
// }

// ChatBot.tsx
// import { useState } from 'react';
// import { MessageCircle } from 'lucide-react';
// import { Button, Card, CardContent } from '@mui/material';

// interface ChatMessage {
//   role: 'user' | 'assistant';
//   content: string;
// }

// export default function ChatBot() {
//   const [showChat, setShowChat] = useState(false);
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState<ChatMessage[]>([]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];
//     setMessages(newMessages);
//     setInput('');

//     try {
//       const response = await fetch('/api/ChatBot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           messages: newMessages.map((m) => ({
//             role: m.role,
//             content: m.content,
//           })),
//         }),
//       });

//       const data = await response.json();

//       setMessages((prev) => [
//         ...prev,
//         // { role: 'user', content: input },
//         { role: 'assistant', content: data.reply },
//       ]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: 'שגיאה בשליחה לשרת. נסה שוב.',
//         },
//       ]);
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {!showChat ? (
//         <Button
//           onClick={() => setShowChat(true)}
//           className="rounded-full p-3 shadow-xl bg-blue-600 hover:bg-blue-700 text-white"
//         >
//           <MessageCircle className="h-6 w-6" />
//         </Button>
//       ) : (
//         <Card className="w-80 shadow-2xl">
//           <CardContent className="p-4">
//             <div className="mb-2 text-sm text-gray-500">
//               כתוב כמה תמונות יש לך ומה סוג הרקע שאתה רוצה.
//             </div>
//             <div className="space-y-2 max-h-64 overflow-y-auto mb-2">
//               {messages.map((msg, idx) => (
//                 <div
//                   key={idx}
//                   className={`p-2 rounded ${
//                     msg.role === 'user'
//                       ? 'bg-blue-100 text-right'
//                       : 'bg-gray-100 text-left'
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-2">
//               <input
//                 className="flex-1 border rounded px-2 py-1 text-sm"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="למשל: רקע ורוד ל-3 תמונות"
//               />
//               <Button size="small" onClick={sendMessage}>
//                 שלח
//               </Button>
//             </div>
//             <Button
//               variant="contained"
//               className="mt-2 text-xs text-gray-500"
//               onClick={() => setShowChat(false)}
//             >
//               סגור צ'אט
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

// import { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Box, Typography, Paper } from '@mui/material';
// const myUrl = import.meta.env.VITE_SERVERURL
// const BackgroundRecommenderChat = () => {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!prompt.trim()) return;
//     setLoading(true);
//     try {
//       const result = await axios.post(`${myUrl}/api/ChatBot`, {
//         messages: [{ role: 'user', content: prompt }],
//       });
//       if (result)
//         console.log("success") 
//       setResponse(result.data.reply);
//       console.log("result: ",result);     
//       console.log("result.data: ",result.data);     
//       console.log("result.data.reply :",result.data.reply);    
//     } catch (err) {
//       console.log("error");
//       setResponse('אירעה שגיאה בשליחה לשרת.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4, p: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         🔍 המלצת רקע חכמה
//       </Typography>
//       <TextField
//         fullWidth
//         label="תאר את הקולאז' שאתה רוצה"
//         variant="outlined"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         disabled={loading}
//         multiline
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSend}
//         disabled={loading || !prompt.trim()}
//         sx={{ mt: 2 }}
//       >
//         שלח
//       </Button>
//       {response && (
//         <Paper elevation={3} sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5' }}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//             ההמלצה:
//           </Typography>
//           <Typography>{response}</Typography>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default BackgroundRecommenderChat;


import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  IconButton,
  Modal,
  CircularProgress,
  Typography,
  TextField,
  List,
  ListItem,
  Avatar,
  Fade,
  Paper,
  Tooltip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

const apiUrl = import.meta.env.VITE_SERVERURL;

export default function BackgroundRecommenderChat() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleOpen = async () => {
    setOpen(true);
    setChat([]); // Reset chat
    await sendMessage("system", `אתה עוזר יצירתי באתר SIB, שבו יוצרים מעלים תמונות AI לפי אתגרים. דבר רק על האתר, האתגרים, השראה, יצירתיות ודירוגים.`);
    await sendMessage("user", `האתגר הנוכחי הוא: . תיאור האתגר:ליצור תמונה בואתו צבע. תן לי רעיונות לפרומפטים.`);
  };

  const sendMessage = async (role: string, content: string) => {
    setChat((prev) => [...prev, { role, content }]);
    if (role === "user" || role === "system") {
      setLoading(true);
      setShowTypingIndicator(true);
      try {
        const response = await axios.post(`${apiUrl}/api/PromptSuggestions`, {
          messages: [...chat, { role, content }]
        });

        // Small delay to make it feel more natural
        setTimeout(() => {
          setShowTypingIndicator(false);
          const botReply = response.data.reply;
          setChat((prev) => [...prev, { role: "assistant", content: botReply }]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error during chat:", err);
        setShowTypingIndicator(false);
        setLoading(false);
        setChat((prev) => [...prev, { role: "assistant", content: "אירעה שגיאה בתקשורת. אנא נסה שוב מאוחר יותר." }]);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    await sendMessage("user", input.trim());
    setInput("");
  };

  // Typing indicator component
  const TypingIndicator = () => (
    <Box sx={{ display: 'flex', gap: 0.5, p: 1, alignItems: 'center' }}>
      <div className="dot" style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        backgroundColor: '#f1535d',
        opacity: 0.7,
        animation: 'pulse 1.5s infinite',
        animationDelay: '0s'
      }}></div>
      <div className="dot" style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        backgroundColor: '#f1535d',
        opacity: 0.7,
        animation: 'pulse 1.5s infinite',
        animationDelay: '0.3s'
      }}></div>
      <div className="dot" style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        backgroundColor: '#f1535d',
        opacity: 0.7,
        animation: 'pulse 1.5s infinite',
        animationDelay: '0.6s'
      }}></div>
      <style >{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
      `}</style>
    </Box>
  );

  return (
    <>
      {/* Floating Chat Icon Button - positioned at bottom right */}
      <Tooltip title="Get Creative Ideas" placement="left">
        <IconButton
          onClick={handleOpen}
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            backgroundColor: 'rgba(24, 24, 26, 0.95)',
            color: 'white',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            // במצב רגיל - אין גרדיאנט
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
              // במצב hover - מוסיף מסגרת גרדיאנט
              backgroundColor: 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%) 1 ',
              borderStyle: 'solid',
              borderWidth: '2px'
            }
          }}
          aria-label="Chat assistant"
        >
          <ChatIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Tooltip>

      {/* Chat Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
      >
        <Fade in={open}>
          <Paper sx={{
            width: { xs: '90%', sm: '420px' },
            height: '520px',
            maxHeight: '85vh',
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 5px 25px rgba(0,0,0,0.35)',
            display: 'flex',
            flexDirection: 'column',
            background: '#111215',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            {/* Header */}
            <Box sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.3)',
            }}>
              <Box display="flex" alignItems="center" gap={1.8}>
                <Avatar sx={{
                  bgcolor: 'transparent',
                  width: 36,
                  height: 36,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(15, 15, 17, 0.95)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    right: '-2px',
                    bottom: '-2px',
                    borderRadius: '50%',
                    background: 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)',
                    opacity: 0.7,
                    zIndex: -1,
                  }
                }}>
                  <SmartToyIcon sx={{ color: '#fff', fontSize: '20px' }} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{
                    color: '#fff',
                    fontWeight: 500,
                    fontFamily: '"Poppins", "Roboto", sans-serif',
                    fontSize: '16px',
                    letterSpacing: '0.3px'
                  }}>
                    Creative Assistant
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: '#aaa',
                    fontFamily: '"Poppins", "Roboto", sans-serif',
                    fontSize: '12px',
                    letterSpacing: '0.2px'
                  }}>
                    Get inspiration for your challenge
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={() => setOpen(false)} sx={{
                color: '#aaa',
                padding: '6px',
                '&:hover': { color: '#fff' }
              }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Challenge Info Banner */}
            <Box sx={{
              p: 2,
              py: 1.2,
              background: 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid rgba(255,255,255,0.04)'
            }}>
              <Typography variant="caption" sx={{
                color: '#bbb',
                fontSize: '12px',
                fontFamily: '"Poppins", "Roboto", sans-serif',
                letterSpacing: '0.2px'
              }}>
                <span style={{ fontWeight: 600, color: '#eee' }}>Current Challenge:</span> 
              </Typography>
            </Box>

            {/* Messages Area */}
            <List sx={{
              flexGrow: 1,
              overflowY: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0,0,0,0.1)',
              }
            }}>
              {chat.filter(m => m.role !== 'system').map((message, i) => (
                <ListItem
                  key={i}
                  sx={{
                    display: 'flex',
                    p: 0,
                    width: '100%',
                    justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1.2,
                      alignItems: 'flex-start',
                      flexDirection: message.role === "user" ? 'row-reverse' : 'row',
                      maxWidth: '92%',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: 'rgba(15, 15, 17, 0.95)',
                        border: message.role === "user"
                          ? '1px solid rgba(255, 255, 255, 0.15)'
                          : '1px solid rgba(241, 83, 93, 0.2)',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '-1.5px',
                          left: '-1.5px',
                          right: '-1.5px',
                          bottom: '-1.5px',
                          borderRadius: '50%',
                          background: message.role === "user"
                            ? 'linear-gradient(to right, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2))'
                            : 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)',
                          opacity: 0.5,
                          zIndex: -1,
                        },
                        fontSize: '14px'
                      }}
                    >
                      {message.role === "user" ? (
                        <PersonIcon sx={{ color: '#fff', fontSize: '15px' }} />
                      ) : (
                        <SmartToyIcon sx={{ color: '#fff', fontSize: '15px' }} />
                      )}
                    </Avatar>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.8,
                        borderRadius: 2.5,
                        backgroundColor: message.role === "user"
                          ? 'rgba(255, 255, 255, 0.03)'
                          : 'rgba(255, 255, 255, 0.01)',
                        border: message.role === "user"
                          ? '1px solid rgba(255, 255, 255, 0.08)'
                          : '1px solid rgba(255, 255, 255, 0.04)',
                        borderLeft: message.role === "assistant" ? '2px solid rgba(241, 83, 93, 0.25)' : undefined,
                        borderRight: message.role === "user" ? '2px solid rgba(255, 255, 255, 0.15)' : undefined,
                        color: '#fff',
                        direction: 'rtl',
                        maxWidth: '100%',
                        wordBreak: 'break-word'
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: 'pre-wrap',
                          fontFamily: '"Assistant", "Heebo", sans-serif',
                          fontSize: '14px',
                          textAlign: 'right',
                          lineHeight: 1.7,
                          color: message.role === "user" ? '#fff' : '#eee',
                        }}
                      >
                        {message.role === "assistant"
                          ? formatNumberedIdeas(message.content)
                          : message.content
                        }
                      </Typography>
                    </Paper>
                  </Box>
                </ListItem>
              ))}

              {showTypingIndicator && (
                <ListItem sx={{ p: 0, justifyContent: "flex-start" }}>
                  <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'flex-end' }}>
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: 'rgba(15, 15, 17, 0.95)',
                        border: '1px solid rgba(241, 83, 93, 0.2)',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '-1.5px',
                          left: '-1.5px',
                          right: '-1.5px',
                          bottom: '-1.5px',
                          borderRadius: '50%',
                          background: 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)',
                          opacity: 0.5,
                          zIndex: -1,
                        }
                      }}
                    >
                      <SmartToyIcon sx={{ color: '#fff', fontSize: '15px' }} />
                    </Avatar>
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: 2.5,
                        backgroundColor: 'rgba(255, 255, 255, 0.01)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        borderLeft: '2px solid rgba(241, 83, 93, 0.25)',
                      }}
                    >
                      <TypingIndicator />
                    </Paper>
                  </Box>
                </ListItem>
              )}
              <div ref={messagesEndRef} />
            </List>

            {/* Input Area */}
            <Box sx={{
              p: 2,
              backgroundColor: 'rgba(0,0,0,0.25)',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              display: 'flex',
              gap: 1.2
            }}>
              <TextField
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="שאל על רעיונות לפרומפט..."
                multiline
                maxRows={2}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    borderRadius: 2.5,
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    fontSize: '14px',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.08)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.15)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(241, 83, 93, 0.35)',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.4)',
                    opacity: 1,
                    fontSize: '14px',
                  },
                }}
                InputProps={{
                  sx: {
                    color: '#fff',
                    direction: 'rtl',
                    fontFamily: '"Assistant", "Heebo", sans-serif',
                    padding: '12px 14px',
                  }
                }}
              />
              <Tooltip title="Send Message">
                <span>
                  <IconButton
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    sx={{
                      height: '42px',
                      width: '42px',
                      backgroundColor: 'rgba(15, 15, 17, 0.95)',
                      color: 'white',
                      position: 'relative',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-1.5px',
                        left: '-1.5px',
                        right: '-1.5px',
                        bottom: '-1.5px',
                        borderRadius: '50%',
                        background: 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)',
                        opacity: 0.6,
                        transition: 'opacity 0.3s ease',
                        zIndex: -1,
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(20, 20, 22, 0.95)',
                        '&::before': {
                          opacity: 0.8,
                        }
                      },
                      '&.Mui-disabled': {
                        backgroundColor: 'rgba(15, 15, 17, 0.6)',
                        '&::before': {
                          opacity: 0.2,
                        },
                        color: 'rgba(255,255,255,0.2)'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <SendIcon fontSize="small" />}
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}

// Helper function to format numbered ideas
function formatNumberedIdeas(content: string): React.ReactNode {
  // Check if the content has numbered ideas like "1.", "2.", etc.
  const lines = content.split('\n');
  const numberedPattern = /^\d+\.\s/;

  // If there are no numbered lines, return the content as is
  if (!lines.some(line => numberedPattern.test(line))) {
    return content;
  }

  // Process the text to properly format numbered ideas
  return lines.map((line, index) => {
    const match = line.match(numberedPattern);
    if (match) {
      return (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          <Box sx={{ display: 'flex', marginBottom: '10px' }}>
            <Typography
              component="span"
              sx={{
                color: 'rgba(241, 83, 93, 0.9)',
                fontWeight: 'bold',
                marginRight: '10px',
                minWidth: '20px',
                fontSize: '14px'
              }}
            >
              {match[0]}
            </Typography>
            <Typography component="span" sx={{ fontSize: '14px' }}>
              {line.replace(numberedPattern, '')}
            </Typography>
          </Box>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </React.Fragment>
      );
    }
  });
}