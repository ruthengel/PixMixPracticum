import { Button, Modal, Box, IconButton, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { setToken } from "../stores/TokenSlice";

const SignUp = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [signup, setSignup] = useState(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passswordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSignup(false);

        try {
            const res = await axios.post("https://localhost:7231/api/User/register", {
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passswordRef.current?.value
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
    return (<>
        <Button sx={{ position: "fixed", top: 15, left: 125, zIndex: 1350, color: "transparent", border: "2px solid transparent", background: "linear-gradient(270deg, #00A0A8, #7D2AE8)", backgroundClip: "text", padding: "8px 16px", "&:hover": { border: "2px solid transparent", background: "linear-gradient(270deg,#7D2AE8, #00A0A8 )", color: "transparent", backgroundClip: "text", transition: "background-color 0.3s ease, color 0.3s ease" } }} variant="contained" size="medium" onClick={() => { setOpen(true); setSignup(true); }}>Sign up</Button>
        {signup && (
            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="login-modal-title" aria-describedby="login-modal-description">
                <Box sx={{ width: 500, bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 24, margin: "auto", mt: 5 }}>
                    <IconButton sx={{ position: "absolute", color: "black" }} onClick={() => setOpen(false)}><CloseIcon /></IconButton>
                    <h2 id="login-modal-title" style={{ textAlign: "center", marginBottom: "1rem" }}>Hi! Let's Get Started</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth label="Name" variant="outlined" margin="normal" inputRef={nameRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
                        <TextField fullWidth label="Email" type="email" variant="outlined" margin="normal" inputRef={emailRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
                        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" inputRef={passswordRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
                        <Button fullWidth variant="contained" color="primary" size="large" type="submit" endIcon={<SendIcon />} sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "black" }, mt: 2 }}>Send</Button>

                    </form>

                </Box>
            </Modal>
        )}

    </>)
}
export default SignUp