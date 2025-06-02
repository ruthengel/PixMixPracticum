// import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
// import { FormEvent, useRef, useState } from "react";
// import SendIcon from "@mui/icons-material/Send";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setToken } from "../../stores/TokenSlice";
// import { RootState } from "../../stores/Store";
// // import * as Yup from "yup";
// // const schema = Yup.object().shape({
// //     email: Yup.string().email("Invalid email format").required("Email is required"),
// //     password: Yup.string()
// //         .min(4, "Password must be at least 4 characters")
// //         .required("Password is required"),
// // });
// const myUrl = import.meta.env.VITE_SERVERURL
// const SignIn = () => {

//     const userId = useSelector((state: RootState) => state.token.user?.userId);
//     const dispatch = useDispatch()
//     const [open, setOpen] = useState(false)
//     const [signin, setSignin] = useState(false)
//     const emailRef = useRef<HTMLInputElement>(null)
//     const passwordRef = useRef<HTMLInputElement>(null)
//     // const [errors, setErrors] = useState<{ [key: string]: string }>({});

//     const handleSubmit = async (e: FormEvent) => {

//         e.preventDefault();
//         setSignin(false);

//         try {
//             // await schema.validate({
//             //     email: emailRef.current?.value,
//             //     password: passwordRef.current?.value,
//             // });
//             // console.log("Trying to login with:", { emailRef, passwordRef });
//             // setErrors({});
//             console.log("Trying to login with111:", {
//                 email: emailRef.current?.value,
//                 password: passwordRef.current?.value
//             });
//             const res = await axios.post(`${myUrl}/api/User/login`, {
//                 email: emailRef.current?.value,
//                 password: passwordRef.current?.value
//             });
//             console.log("Trying to login with2222:", {
//                 email: emailRef.current?.value,
//                 password: passwordRef.current?.value
//             });

//             if (res.data?.token) {
//                 dispatch(setToken(res.data.token))
//                 console.log(userId);
//                 alert(res.data.message);
//             } else {
//                 alert("Login failed");
//             }
//         } catch (e) {
//             console.log(e);
//             // if (e instanceof Yup.ValidationError) {
//             //     const errorMap: { [key: string]: string } = {};
//             //     e.inner.forEach((err) => {
//             //         if (err.path) {
//             //             errorMap[err.path] = err.message;
//             //         }
//             //     });
//             //     setErrors(errorMap);
//             // }
//             // else{
//             //     console.log(false);               
//             // }
//             if (axios.isAxiosError(e) && e.response?.status) {
//                 alert(`${e.response.data.message}`);
//             } else {
//                 alert("An unexpected error occurred");
//             }
//         }
//     };

//     return (<>
//         <Button sx={{ position: "fixed", top: 15, left: 20, zIndex: 1350, color: "white", background: "linear-gradient(270deg, #7D2AE8, #00A0A8)", backgroundClip: "border-box", padding: "10px 20px", whiteSpace: "nowrap", "&:hover": { background: "linear-gradient(270deg, #00A0A8,  #7D2AE8)", color: "white", transition: "background-color 0.3s ease, color 0.3s ease" } }} variant="contained" size="medium" onClick={() => { setOpen(true); setSignin(true); }}>Sign in</Button>
//         {signin && (
//             <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="login-modal-title" aria-describedby="login-modal-description">
//                 <Box sx={{ width: 500, bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 24, margin: "auto", mt: 5 }}>
//                     <IconButton sx={{ position: "absolute", color: "black" }} onClick={() => setOpen(false)}><CloseIcon /></IconButton>
//                     <h2 id="login-modal-title" style={{ textAlign: "center", marginBottom: "1rem" }}>Hi! Let's Get Started</h2>
//                     <form onSubmit={handleSubmit}>
//                         <TextField fullWidth label="Email" type="email" variant="outlined" margin="normal" inputRef={emailRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
//                         <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" inputRef={passwordRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
//                         {/* <TextField fullWidth label="Email" type="email" variant="outlined" margin="normal"  inputRef={emailRef}  error={Boolean(errors['email'])} helperText={errors['email']} sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} /> */}
//                         {/* <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal"  inputRef={passwordRef} error={Boolean(errors['password'])} helperText={errors['password']} sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} /> */}
//                         <Button fullWidth variant="contained" color="primary" size="large" type="submit" endIcon={<SendIcon />} sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "black" }, mt: 2 }}>Send</Button>
//                     </form>
//                 </Box>
//             </Modal>
//         )}
//     </>)
// }
// export default SignIn


import { Box, Button, IconButton, Modal, TextField, Typography, Backdrop } from "@mui/material";
import { FormEvent, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../stores/TokenSlice";
import { RootState } from "../../stores/Store";

const myUrl = import.meta.env.VITE_SERVERURL

const SignIn = () => {
    const userId = useSelector((state: RootState) => state.token.user?.userId);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [signin, setSignin] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSignin(false);

        try {
            console.log("Trying to login with111:", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            });
            const res = await axios.post(`${myUrl}/api/User/login`, {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            });
            console.log("Trying to login with2222:", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            });

            if (res.data?.token) {
                dispatch(setToken(res.data.token))
                console.log(userId);
                alert(res.data.message);
            } else {
                alert("Login failed");
            }
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e) && e.response?.status) {
                alert(`${e.response.data.message}`);
            } else {
                alert("An unexpected error occurred");
            }
        }
    };

    return (
        <>
            {/* Enhanced Sign In Button */}
            {/* <Button 
                sx={{ 
                    position: "fixed", 
                    top: 20, 
                    left: 20, 
                    zIndex: 1350,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
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
                variant="contained" 
                size="medium" 
                startIcon={<PersonOutlineIcon />}
                onClick={() => { setOpen(true); setSignin(true); }}
            >
                Sign In
            </Button> */}
            <Button sx={{ position: "fixed", top: 15, left: 20, zIndex: 1350, color: "white", background: "linear-gradient(270deg, #7D2AE8, #00A0A8)", backgroundClip: "border-box", padding: "10px 20px", whiteSpace: "nowrap", "&:hover": { background: "linear-gradient(270deg, #00A0A8,  #7D2AE8)", color: "white", transition: "background-color 0.3s ease, color 0.3s ease" } }} variant="contained" size="medium" onClick={() => { setOpen(true); setSignin(true); }}>Sign in</Button>

            {/* Enhanced Modal */}
            {signin && (
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="login-modal-title"
                    aria-describedby="login-modal-description"
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
                                <PersonOutlineIcon sx={{ fontSize: 40, color: "white" }} />
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
                                Welcome Back
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "rgba(255, 255, 255, 0.8)",
                                    fontSize: "16px"
                                }}
                            >
                                Sign in to continue to your account
                            </Typography>
                        </Box>

                        {/* Form Section */}
                        <Box sx={{ p: 4 }}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    variant="outlined"
                                    margin="normal"
                                    inputRef={emailRef}
                                    required
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
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    margin="normal"
                                    inputRef={passwordRef}
                                    required
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
                                    Sign In
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Modal>
            )}
        </>
    )
}

export default SignIn