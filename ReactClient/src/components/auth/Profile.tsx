import { Box, Divider, Button, IconButton, Modal, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/Store";
import { ArrowDropDown } from "@mui/icons-material";
import { signOut } from "../../stores/TokenSlice";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import UserStore from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
const schema = yup.object().shape({
    name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
});
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
        await schema.validate({
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passswordRef.current?.value,
        });
        setErrors({});
        try {
            await UserStore.updateUser(userId, {
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passswordRef.current?.value,
            }, token, dispatch);
        }
        catch (e) {
            if (e instanceof yup.ValidationError) {
                const errorMap: { [key: string]: string } = {};
                e.inner.forEach((err) => {
                    if (err.path) {
                        errorMap[err.path] = err.message;
                    }
                });
                setErrors(errorMap);
            }
        }
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


            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="login-modal-title" aria-describedby="login-modal-description">
                <Box sx={{ width: 500, bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 24, margin: "auto", mt: 5 }}>
                    <IconButton sx={{ position: "absolute", color: "black" }} onClick={() => setOpen(false)}><CloseIcon /></IconButton>
                    <h2 id="login-modal-title" style={{ textAlign: "center", marginBottom: "1rem" }}>Hi! Let's Get Started</h2>
                    <form onSubmit={handleSumbit}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            inputRef={nameRef}
                            error={Boolean(errors['name'])}
                            helperText={errors['name']}
                            sx={{
                                backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" }
                                }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            inputRef={emailRef}
                            error={Boolean(errors['email'])}
                            helperText={errors['email']}
                            sx={{
                                backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" }
                                }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            inputRef={passswordRef}
                            error={Boolean(errors['password'])}
                            helperText={errors['password']}
                            sx={{
                                backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" }
                                }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" }
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            endIcon={<SendIcon />}
                            sx={{
                                backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "black" }, mt: 2
                            }}
                        >
                            Send
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default Profile;
