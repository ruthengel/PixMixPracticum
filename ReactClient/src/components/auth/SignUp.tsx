// import { Button, Modal, Box, IconButton, TextField } from "@mui/material";
// import axios from "axios";
// import { FormEvent, useRef, useState } from "react";
// import SendIcon from "@mui/icons-material/Send";
// import CloseIcon from "@mui/icons-material/Close";
// import { useDispatch } from "react-redux";
// import { setToken } from "../../stores/TokenSlice";
// // import * as yup from "yup";
// const myUrl = import.meta.env.VITE_SERVERURL
// // const schema = yup.object().shape({
// //     name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
// //     email: yup.string().email("Invalid email").required("Email is required"),
// //     password: yup
// //         .string()
// //         .min(4, "Password must be at least 4 characters")
// //         .required("Password is required"),
// // });
// const SignUp = () => {
//     const dispatch = useDispatch()
//     const [open, setOpen] = useState(false)
//     const [signup, setSignup] = useState(false)
//     const nameRef = useRef<HTMLInputElement>(null)
//     const emailRef = useRef<HTMLInputElement>(null)
//     const passwordRef = useRef<HTMLInputElement>(null)
//     // const [errors, setErrors] = useState<{ [key: string]: string }>({});

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         setSignup(false);

//         try {
//             // await schema.validate({
//             //     name: nameRef.current?.value,
//             //     email: emailRef.current?.value,
//             //     password: passswordRef.current?.value,
//             // });
//             // setErrors({});

//             const res = await axios.post(`${myUrl}/api/User/register`, {
//                 name: nameRef.current?.value,
//                 email: emailRef.current?.value,
//                 password: passwordRef.current?.value
//             });

//             if (res.data?.token) {
//                 dispatch(setToken(res.data.token))
//                 alert(res.data.message);
//             } else {
//                 alert("Register failed");
//             }
//         } catch (e) {
//             // if (e instanceof yup.ValidationError) {
//             //     const errorMap: { [key: string]: string } = {};
//             //     e.inner.forEach((err) => {
//             //         if (err.path) {
//             //             errorMap[err.path] = err.message;
//             //         }
//             //     });
//             //     setErrors(errorMap);
//             // }
//             if (axios.isAxiosError(e) && e.response?.status) {
//                 alert(`${e.response.data.message}`);
//             } else {
//                 alert("An unexpected error occurred");
//             }
//         }
//     };
//     return (<>
//         <Button sx={{ position: "fixed", top: 15, left: 125, zIndex: 1350, color: "transparent", border: "2px solid transparent", background: "linear-gradient(270deg, #00A0A8, #7D2AE8)", backgroundClip: "text", padding: "8px 16px", "&:hover": { border: "2px solid transparent", background: "linear-gradient(270deg,#7D2AE8, #00A0A8 )", color: "transparent", backgroundClip: "text", transition: "background-color 0.3s ease, color 0.3s ease" } }} variant="contained" size="medium" onClick={() => { setOpen(true); setSignup(true); }}>Sign up</Button>
//         {signup && (
//             <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="login-modal-title" aria-describedby="login-modal-description">
//                 <Box sx={{ width: 500, bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 24, margin: "auto", mt: 5 }}>
//                     <IconButton sx={{ position: "absolute", color: "black" }} onClick={() => setOpen(false)}><CloseIcon /></IconButton>
//                     <h2 id="login-modal-title" style={{ textAlign: "center", marginBottom: "1rem" }}>Hi! Let's Get Started</h2>
//                     <form onSubmit={handleSubmit}>
//                         {/* <TextField fullWidth label="Name" variant="outlined" margin="normal" inputRef={nameRef} error={Boolean(errors['name'])} helperText={errors['name']} sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} /> */}
//                         <TextField fullWidth label="Name" variant="outlined" margin="normal" inputRef={nameRef}  sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
//                         {/* <TextField fullWidth label="Email" type="email" variant="outlined" margin="normal" inputRef={emailRef} error={Boolean(errors['email'])} helperText={errors['email']} sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} /> */}
//                         <TextField fullWidth label="Email" type="email" variant="outlined" margin="normal" inputRef={emailRef}  sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
//                         <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" inputRef={passwordRef}  sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
//                         {/* <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" inputRef={passswordRef} error={Boolean(errors['password'])} helperText={errors['password']} sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} /> */}
//                         <Button fullWidth variant="contained" color="primary" size="large" type="submit" endIcon={<SendIcon />} sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "black" }, mt: 2 }}>Send</Button>

//                     </form>

//                 </Box>
//             </Modal>
//         )}

//     </>)
// }
// export default SignUp
import { Button, Modal, Box, IconButton, TextField, Typography, Backdrop } from "@mui/material";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch } from "react-redux";
import { setToken } from "../../stores/TokenSlice";

const myUrl = import.meta.env.VITE_SERVERURL

const SignUp = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [signup, setSignup] = useState(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSignup(false);

        try {
            const res = await axios.post(`${myUrl}/api/User/register`, {
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            });

            if (res.data?.token) {
                dispatch(setToken(res.data.token))
                alert(res.data.message);
            } else {
                alert("Register failed");
            }
        } catch (e) {
            if (axios.isAxiosError(e) && e.response?.status) {
                alert(`${e.response.data.message}`);
            } else {
                alert("An unexpected error occurred");
            }
        }
    };

    return (
        <>
            {/* Enhanced Sign Up Button */}
            {/* <Button 
                sx={{ 
                    position: "fixed", 
                    top: 20, 
                    left: 140, 
                    zIndex: 1350,
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                    boxShadow: "0 8px 25px rgba(240, 147, 251, 0.4)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": { 
                        background: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 35px rgba(240, 147, 251, 0.6)"
                    },
                    "&:active": {
                        transform: "translateY(0px)"
                    }
                }} 
                variant="contained" 
                size="medium" 
                startIcon={<PersonAddIcon />}
                onClick={() => { setOpen(true); setSignup(true); }}
            >
                Sign Up
            </Button> */}

            <Button sx={{ position: "fixed", top: 15, left: 125, zIndex: 1350, color: "transparent", border: "2px solid transparent", background: "linear-gradient(270deg, #00A0A8, #7D2AE8)", backgroundClip: "text", padding: "8px 16px", "&:hover": { border: "2px solid transparent", background: "linear-gradient(270deg,#7D2AE8, #00A0A8 )", color: "transparent", backgroundClip: "text", transition: "background-color 0.3s ease, color 0.3s ease" } }} variant="contained" size="medium" onClick={() => { setOpen(true); setSignup(true); }}>Sign up</Button>


            {/* Enhanced Modal */}
            {signup && (
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="signup-modal-title"
                    aria-describedby="signup-modal-description"
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
                            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
                                <PersonAddIcon sx={{ fontSize: 40, color: "white" }} />
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
                                Join Us Today
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "rgba(255, 255, 255, 0.8)",
                                    fontSize: "16px"
                                }}
                            >
                                Create your account to get started
                            </Typography>
                        </Box>

                        {/* Form Section */}
                        <Box sx={{ p: 4 }}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    variant="outlined"
                                    margin="normal"
                                    inputRef={nameRef}
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
                                                borderColor: "#f093fb"
                                            },
                                            "&.Mui-focused": {
                                                backgroundColor: "white",
                                                "& fieldset": {
                                                    borderColor: "#f093fb",
                                                    borderWidth: "2px"
                                                }
                                            }
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#64748b",
                                            fontWeight: 500
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "#f093fb"
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
                                                borderColor: "#f093fb"
                                            },
                                            "&.Mui-focused": {
                                                backgroundColor: "white",
                                                "& fieldset": {
                                                    borderColor: "#f093fb",
                                                    borderWidth: "2px"
                                                }
                                            }
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#64748b",
                                            fontWeight: 500
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "#f093fb"
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
                                                borderColor: "#f093fb"
                                            },
                                            "&.Mui-focused": {
                                                backgroundColor: "white",
                                                "& fieldset": {
                                                    borderColor: "#f093fb",
                                                    borderWidth: "2px"
                                                }
                                            }
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#64748b",
                                            fontWeight: 500
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "#f093fb"
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
                                        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                        borderRadius: "16px",
                                        padding: "16px",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        boxShadow: "0 8px 25px rgba(240, 147, 251, 0.4)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 12px 35px rgba(240, 147, 251, 0.6)"
                                        },
                                        "&:active": {
                                            transform: "translateY(0px)"
                                        }
                                    }}
                                >
                                    Create Account
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Modal>
            )}
        </>
    )
}

export default SignUp