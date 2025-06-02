import { Box, Divider, Button, IconButton, Modal, TextField, Typography, Backdrop } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/Store";
import { ArrowDropDown, Edit } from "@mui/icons-material";
import { signOut } from "../../stores/TokenSlice";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import UserStore from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state: RootState) => state.token.token)
    const userId = useSelector((state: RootState) => state.token.user?.userId)
    const userName = useSelector((state: RootState) => state.token.user?.name)
    const [open, setOpen] = useState(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passswordRef = useRef<HTMLInputElement>(null)
    const [openMenu, setOpenMenu] = useState(false)

    const handleClick = () => {
        setOpenMenu(!openMenu)
    };

    const handleLogout = () => {
        dispatch(signOut());
        setOpenMenu(!openMenu)
        navigate('/')
    };

    const handleUpdateProfile = () => {
        setOpen(true)
        setOpenMenu(false)
    };

    const handleSumbit = async () => {
        setOpen(false);
        await UserStore.updateUser(userId, {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passswordRef.current?.value,
        }, token, dispatch);
    };

    return (
        <>

            <Box sx={{ position: "fixed", top: 10, left: 10, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1300, }}           >
                {token && (
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "transparent", background: "linear-gradient(270deg, #00A0A8, #7D2AE8)", backgroundClip: "text", cursor: "pointer", marginTop: "8px", }} onClick={handleClick}                   >
                        <>{userName} <ArrowDropDown sx={{ fill: "url(#gradient)", fontSize: "1.6rem", position: "relative", top: "6px", left: '-6px' }} /> </>
                    </span>
                )}

                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="70%" style={{ stopColor: "#00A0A8", stopOpacity: 1 }} />
                            <stop offset="30%" style={{ stopColor: "#7D2AE8", stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                </svg>

                {openMenu && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50px",
                            left: 0,
                            width: "200px",
                            backgroundColor: "white",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            padding: "10px",
                            borderRadius: "8px",
                            zIndex: 1301,
                        }}
                    >
                        {token && (
                            <>
                                <Button
                                    fullWidth
                                    onClick={handleUpdateProfile}
                                    sx={{
                                        backgroundColor: "transparent",
                                        color: "black",
                                        padding: "8px",
                                        textAlign: "center",
                                        "&:hover": {
                                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                                        },
                                    }}
                                >
                                    עדכון פרטי משתמש
                                </Button>
                                <Divider sx={{ margin: "8px 0" }} />
                                <Button
                                    fullWidth
                                    onClick={handleLogout}
                                    sx={{
                                        backgroundColor: "transparent",
                                        color: "black",
                                        padding: "8px",
                                        textAlign: "center",
                                        "&:hover": {
                                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                                        },
                                    }}
                                >
                                    התנתקות
                                </Button>
                            </>
                        )}
                    </Box>
                )}
            </Box>

            <Modal 
                open={open} 
                onClose={() => setOpen(false)} 
                aria-labelledby="update-profile-modal-title" 
                aria-describedby="update-profile-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    sx: {
                        backdropFilter: "blur(8px)",
                        backgroundColor: "rgba(0, 0, 0, 0.6)"
                    }
                }}
            >
                <Box sx={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 450,
                    maxWidth: '90vw',
                    bgcolor: "white",
                    borderRadius: "24px",
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                    p: 0,
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                }}>
                    {/* Header Section */}
                    <Box sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        p: 4,
                        position: "relative",
                        textAlign: "center"
                    }}>
                        <IconButton 
                            sx={{ 
                                position: "absolute", 
                                top: 16, 
                                right: 16,
                                color: "white",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(10px)",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                                }
                            }} 
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        
                        <Box sx={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(10px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 16px auto",
                            border: "2px solid rgba(255, 255, 255, 0.3)"
                        }}>
                            <Edit sx={{ fontSize: 40, color: "white" }} />
                        </Box>
                        
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                color: "white",
                                fontWeight: 700,
                                fontSize: "28px",
                                mb: 1
                            }}
                        >
                            Update Profile
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: "rgba(255, 255, 255, 0.8)",
                                fontSize: "16px"
                            }}
                        >
                            Keep your information up to date
                        </Typography>
                    </Box>

                    {/* Form Section */}
                    <Box sx={{ p: 4 }}>
                        <form onSubmit={handleSumbit}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                variant="outlined"
                                margin="normal"
                                inputRef={nameRef}
                                sx={{
                                    mb: 2,
                                    "& .MuiOutlinedInput-root": { 
                                        borderRadius: "16px",
                                        backgroundColor: "#f8fafc",
                                        transition: "all 0.3s ease",
                                        "& fieldset": { 
                                            borderColor: "#e2e8f0",
                                            borderWidth: "2px"
                                        },
                                        "&:hover fieldset": { 
                                            borderColor: "#667eea"
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "white",
                                            "& fieldset": { 
                                                borderColor: "#667eea",
                                                borderWidth: "2px"
                                            }
                                        }
                                    },
                                    "& .MuiInputLabel-root": { 
                                        color: "#64748b",
                                        fontWeight: 500
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": { 
                                        color: "#667eea"
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                margin="normal"
                                inputRef={emailRef}
                                sx={{
                                    mb: 2,
                                    "& .MuiOutlinedInput-root": { 
                                        borderRadius: "16px",
                                        backgroundColor: "#f8fafc",
                                        transition: "all 0.3s ease",
                                        "& fieldset": { 
                                            borderColor: "#e2e8f0",
                                            borderWidth: "2px"
                                        },
                                        "&:hover fieldset": { 
                                            borderColor: "#667eea"
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "white",
                                            "& fieldset": { 
                                                borderColor: "#667eea",
                                                borderWidth: "2px"
                                            }
                                        }
                                    },
                                    "& .MuiInputLabel-root": { 
                                        color: "#64748b",
                                        fontWeight: 500
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": { 
                                        color: "#667eea"
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                label="New Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                inputRef={passswordRef}
                                sx={{
                                    mb: 3,
                                    "& .MuiOutlinedInput-root": { 
                                        borderRadius: "16px",
                                        backgroundColor: "#f8fafc",
                                        transition: "all 0.3s ease",
                                        "& fieldset": { 
                                            borderColor: "#e2e8f0",
                                            borderWidth: "2px"
                                        },
                                        "&:hover fieldset": { 
                                            borderColor: "#667eea"
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "white",
                                            "& fieldset": { 
                                                borderColor: "#667eea",
                                                borderWidth: "2px"
                                            }
                                        }
                                    },
                                    "& .MuiInputLabel-root": { 
                                        color: "#64748b",
                                        fontWeight: 500
                                    },
                                    "& .MuiInputLabel-root.Mui-focused": { 
                                        color: "#667eea"
                                    }
                                }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit"
                                endIcon={<SendIcon />}
                                sx={{
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    borderRadius: "16px",
                                    padding: "16px",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "&:hover": { 
                                        background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)"
                                    },
                                    "&:active": {
                                        transform: "translateY(0px)"
                                    }
                                }}
                            >
                                Update Profile
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Modal>

        </>
    );
};

export default Profile;
// import { Box, Divider, Button, IconButton, Modal, TextField, Typography, Backdrop, Avatar } from "@mui/material";
// import { useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../stores/Store";
// import { ArrowDropDown, Edit, Logout, AccountCircle } from "@mui/icons-material";
// import { signOut } from "../../stores/TokenSlice";
// import SendIcon from "@mui/icons-material/Send";
// import CloseIcon from "@mui/icons-material/Close";
// import UserStore from "../../stores/UserStore";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const token = useSelector((state: RootState) => state.token.token)
//     const userId = useSelector((state: RootState) => state.token.user?.userId)
//     const userName = useSelector((state: RootState) => state.token.user?.name)
//     const [open, setOpen] = useState(false)
//     const nameRef = useRef<HTMLInputElement>(null)
//     const emailRef = useRef<HTMLInputElement>(null)
//     const passswordRef = useRef<HTMLInputElement>(null)
//     const [openMenu, setOpenMenu] = useState(false)

//     const handleClick = () => {
//         setOpenMenu(!openMenu)
//     };

//     const handleLogout = () => {
//         dispatch(signOut());
//         setOpenMenu(!openMenu)
//         navigate('/')
//     };

//     const handleUpdateProfile = () => {
//         setOpen(true)
//         setOpenMenu(false)
//     };

//     const handleSumbit = async () => {
//         setOpen(false);
//         await UserStore.updateUser(userId, {
//             name: nameRef.current?.value,
//             email: emailRef.current?.value,
//             password: passswordRef.current?.value,
//         }, token, dispatch);
//     };

//     return (
//         <>
//             {/* Enhanced Profile Menu */}
//             <Box sx={{ 
//                 position: "fixed", 
//                 top: 20, 
//                 left: 20, 
//                 zIndex: 1300,
//             }}>
//                 {token && (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                             padding: "8px 16px",
//                             borderRadius: "50px",
//                             cursor: "pointer",
//                             boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
//                             backdropFilter: "blur(10px)",
//                             border: "1px solid rgba(255, 255, 255, 0.1)",
//                             transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                             "&:hover": {
//                                 transform: "translateY(-2px)",
//                                 boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)"
//                             }
//                         }}
//                         onClick={handleClick}
//                     >
//                         <Avatar 
//                             sx={{ 
//                                 width: 32, 
//                                 height: 32, 
//                                 mr: 1,
//                                 backgroundColor: "rgba(255, 255, 255, 0.2)",
//                                 border: "2px solid rgba(255, 255, 255, 0.3)"
//                             }}
//                         >
//                             <AccountCircle sx={{ color: "white" }} />
//                         </Avatar>
//                         <Typography 
//                             sx={{ 
//                                 color: "white",
//                                 fontWeight: 600,
//                                 fontSize: "16px"
//                             }}
//                         >
//                             {userName}
//                         </Typography>
//                         <ArrowDropDown sx={{ 
//                             color: "white", 
//                             ml: 0.5,
//                             transition: "transform 0.3s ease",
//                             transform: openMenu ? "rotate(180deg)" : "rotate(0deg)"
//                         }} />
//                     </Box>
//                 )}

//                 {/* Enhanced Dropdown Menu */}
//                 {openMenu && (
//                     <Box
//                         sx={{
//                             position: "absolute",
//                             top: "60px",
//                             left: 0,
//                             minWidth: "220px",
//                             backgroundColor: "white",
//                             borderRadius: "16px",
//                             boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
//                             border: "1px solid rgba(0, 0, 0, 0.05)",
//                             overflow: "hidden",
//                             zIndex: 1301,
//                             animation: "slideDown 0.3s ease-out"
//                         }}
//                     >
//                         {token && (
//                             <>
//                                 <Button
//                                     fullWidth
//                                     onClick={handleUpdateProfile}
//                                     startIcon={<Edit />}
//                                     sx={{
//                                         backgroundColor: "transparent",
//                                         color: "#374151",
//                                         padding: "16px 20px",
//                                         textAlign: "right",
//                                         justifyContent: "flex-start",
//                                         textTransform: "none",
//                                         fontSize: "15px",
//                                         fontWeight: 500,
//                                         transition: "all 0.2s ease",
//                                         "&:hover": {
//                                             backgroundColor: "rgba(102, 126, 234, 0.08)",
//                                             color: "#667eea"
//                                         }
//                                     }}
//                                 >
//                                     עדכון פרטי משתמש
//                                 </Button>
//                                 <Divider sx={{ margin: 0, borderColor: "rgba(0, 0, 0, 0.08)" }} />
//                                 <Button
//                                     fullWidth
//                                     onClick={handleLogout}
//                                     startIcon={<Logout />}
//                                     sx={{
//                                         backgroundColor: "transparent",
//                                         color: "#ef4444",
//                                         padding: "16px 20px",
//                                         textAlign: "right",
//                                         justifyContent: "flex-start",
//                                         textTransform: "none",
//                                         fontSize: "15px",
//                                         fontWeight: 500,
//                                         transition: "all 0.2s ease",
//                                         "&:hover": {
//                                             backgroundColor: "rgba(239, 68, 68, 0.08)",
//                                             color: "#dc2626"
//                                         }
//                                     }}
//                                 >
//                                     התנתקות
//                                 </Button>
//                             </>
//                         )}
//                     </Box>
//                 )}
//             </Box>

//             {/* Enhanced Update Profile Modal */}
//             <Modal 
//                 open={open} 
//                 onClose={() => setOpen(false)} 
//                 aria-labelledby="update-profile-modal-title" 
//                 aria-describedby="update-profile-modal-description"
//                 closeAfterTransition
//                 BackdropComponent={Backdrop}
//                 BackdropProps={{
//                     timeout: 500,
//                     sx: {
//                         backdropFilter: "blur(8px)",
//                         backgroundColor: "rgba(0, 0, 0, 0.6)"
//                     }
//                 }}
//             >
//                 <Box sx={{ 
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: 450,
//                     maxWidth: '90vw',
//                     bgcolor: "white",
//                     borderRadius: "24px",
//                     boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
//                     p: 0,
//                     overflow: "hidden",
//                     border: "1px solid rgba(255, 255, 255, 0.2)"
//                 }}>
//                     {/* Header Section */}
//                     <Box sx={{
//                         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                         p: 4,
//                         position: "relative",
//                         textAlign: "center"
//                     }}>
//                         <IconButton 
//                             sx={{ 
//                                 position: "absolute", 
//                                 top: 16, 
//                                 right: 16,
//                                 color: "white",
//                                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//                                 backdropFilter: "blur(10px)",
//                                 "&:hover": {
//                                     backgroundColor: "rgba(255, 255, 255, 0.2)"
//                                 }
//                             }} 
//                             onClick={() => setOpen(false)}
//                         >
//                             <CloseIcon />
//                         </IconButton>
                        
//                         <Box sx={{
//                             width: 80,
//                             height: 80,
//                             borderRadius: "50%",
//                             backgroundColor: "rgba(255, 255, 255, 0.2)",
//                             backdropFilter: "blur(10px)",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             margin: "0 auto 16px auto",
//                             border: "2px solid rgba(255, 255, 255, 0.3)"
//                         }}>
//                             <Edit sx={{ fontSize: 40, color: "white" }} />
//                         </Box>
                        
//                         <Typography 
//                             variant="h4" 
//                             sx={{ 
//                                 color: "white",
//                                 fontWeight: 700,
//                                 fontSize: "28px",
//                                 mb: 1
//                             }}
//                         >
//                             Update Profile
//                         </Typography>
//                         <Typography 
//                             variant="body1" 
//                             sx={{ 
//                                 color: "rgba(255, 255, 255, 0.8)",
//                                 fontSize: "16px"
//                             }}
//                         >
//                             Keep your information up to date
//                         </Typography>
//                     </Box>

//                     {/* Form Section */}
//                     <Box sx={{ p: 4 }}>
//                         <form onSubmit={handleSumbit}>
//                             <TextField
//                                 fullWidth
//                                 label="Full Name"
//                                 variant="outlined"
//                                 margin="normal"
//                                 inputRef={nameRef}
//                                 sx={{
//                                     mb: 2,
//                                     "& .MuiOutlinedInput-root": { 
//                                         borderRadius: "16px",
//                                         backgroundColor: "#f8fafc",
//                                         transition: "all 0.3s ease",
//                                         "& fieldset": { 
//                                             borderColor: "#e2e8f0",
//                                             borderWidth: "2px"
//                                         },
//                                         "&:hover fieldset": { 
//                                             borderColor: "#667eea"
//                                         },
//                                         "&.Mui-focused": {
//                                             backgroundColor: "white",
//                                             "& fieldset": { 
//                                                 borderColor: "#667eea",
//                                                 borderWidth: "2px"
//                                             }
//                                         }
//                                     },
//                                     "& .MuiInputLabel-root": { 
//                                         color: "#64748b",
//                                         fontWeight: 500
//                                     },
//                                     "& .MuiInputLabel-root.Mui-focused": { 
//                                         color: "#667eea"
//                                     }
//                                 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Email Address"
//                                 type="email"
//                                 variant="outlined"
//                                 margin="normal"
//                                 inputRef={emailRef}
//                                 sx={{
//                                     mb: 2,
//                                     "& .MuiOutlinedInput-root": { 
//                                         borderRadius: "16px",
//                                         backgroundColor: "#f8fafc",
//                                         transition: "all 0.3s ease",
//                                         "& fieldset": { 
//                                             borderColor: "#e2e8f0",
//                                             borderWidth: "2px"
//                                         },
//                                         "&:hover fieldset": { 
//                                             borderColor: "#667eea"
//                                         },
//                                         "&.Mui-focused": {
//                                             backgroundColor: "white",
//                                             "& fieldset": { 
//                                                 borderColor: "#667eea",
//                                                 borderWidth: "2px"
//                                             }
//                                         }
//                                     },
//                                     "& .MuiInputLabel-root": { 
//                                         color: "#64748b",
//                                         fontWeight: 500
//                                     },
//                                     "& .MuiInputLabel-root.Mui-focused": { 
//                                         color: "#667eea"
//                                     }
//                                 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="New Password"
//                                 type="password"
//                                 variant="outlined"
//                                 margin="normal"
//                                 inputRef={passswordRef}
//                                 sx={{
//                                     mb: 3,
//                                     "& .MuiOutlinedInput-root": { 
//                                         borderRadius: "16px",
//                                         backgroundColor: "#f8fafc",
//                                         transition: "all 0.3s ease",
//                                         "& fieldset": { 
//                                             borderColor: "#e2e8f0",
//                                             borderWidth: "2px"
//                                         },
//                                         "&:hover fieldset": { 
//                                             borderColor: "#667eea"
//                                         },
//                                         "&.Mui-focused": {
//                                             backgroundColor: "white",
//                                             "& fieldset": { 
//                                                 borderColor: "#667eea",
//                                                 borderWidth: "2px"
//                                             }
//                                         }
//                                     },
//                                     "& .MuiInputLabel-root": { 
//                                         color: "#64748b",
//                                         fontWeight: 500
//                                     },
//                                     "& .MuiInputLabel-root.Mui-focused": { 
//                                         color: "#667eea"
//                                     }
//                                 }}
//                             />
//                             <Button
//                                 fullWidth
//                                 variant="contained"
//                                 size="large"
//                                 type="submit"
//                                 endIcon={<SendIcon />}
//                                 sx={{
//                                     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                                     borderRadius: "16px",
//                                     padding: "16px",
//                                     fontSize: "16px",
//                                     fontWeight: 600,
//                                     textTransform: "none",
//                                     boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//                                     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                                     "&:hover": { 
//                                         background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
//                                         transform: "translateY(-2px)",
//                                         boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)"
//                                     },
//                                     "&:active": {
//                                         transform: "translateY(0px)"
//                                     }
//                                 }}
//                             >
//                                 Update Profile
//                             </Button>
//                         </form>
//                     </Box>
//                 </Box>
//             </Modal>

//             {/* CSS Animation */}
//             <style>{`
//                 @keyframes slideDown {
//                     from {
//                         opacity: 0;
//                         transform: translateY(-10px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }
//             `}</style>
//         </>
//     );
// };

// export default Profile;