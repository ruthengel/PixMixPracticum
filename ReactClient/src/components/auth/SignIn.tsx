import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import { FormEvent, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../stores/TokenSlice";
import { RootState } from "../../stores/Store";
import * as Yup from "yup";
const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
});
const myUrl = import.meta.env.VITE_SERVERURL
const SignIn = () => {

    const userId = useSelector((state: RootState) => state.token.user?.userId);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [signin, setSignin] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();
        setSignin(false);

        try {
            await schema.validate({
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            });
            console.log("Trying to login with:", { emailRef, passwordRef });
            setErrors({});
            const res = await axios.post(`${myUrl}/api/User/login`, {
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
            if (e instanceof Yup.ValidationError) {
                const errorMap: { [key: string]: string } = {};
                e.inner.forEach((err) => {
                    if (err.path) {
                        errorMap[err.path] = err.message;
                    }
                });
                setErrors(errorMap);
            }
            else{
                console.log(false);               
            }
            if (axios.isAxiosError(e) && e.response?.status) {
                alert(`${e.response.data.message}`);
            } else {
                alert("An unexpected error occurred");
            }
        }
    };

    return (<>
        <Button sx={{ position: "fixed", top: 15, left: 20, zIndex: 1350, color: "white", background: "linear-gradient(270deg, #7D2AE8, #00A0A8)", backgroundClip: "border-box", padding: "10px 20px", whiteSpace: "nowrap", "&:hover": { background: "linear-gradient(270deg, #00A0A8,  #7D2AE8)", color: "white", transition: "background-color 0.3s ease, color 0.3s ease" } }} variant="contained" size="medium" onClick={() => { setOpen(true); setSignin(true); }}>Sign in</Button>
        {signin && (
            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="login-modal-title" aria-describedby="login-modal-description">
                <Box sx={{ width: 500, bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 24, margin: "auto", mt: 5 }}>
                    <IconButton sx={{ position: "absolute", color: "black" }} onClick={() => setOpen(false)}><CloseIcon /></IconButton>
                    <h2 id="login-modal-title" style={{ textAlign: "center", marginBottom: "1rem" }}>Hi! Let's Get Started</h2>
                    <form onSubmit={handleSubmit}>                
                        {/* <TextField fullWidth label="Email" type="email" variant="outlined" margin="normal"  inputRef={emailRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} /> */}
                        <TextField fullWidth label="Email" type="email" variant="outlined" margin="normal" error={Boolean(errors['email'])} helperText={errors['email']} inputRef={emailRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
                        {/* <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" inputRef={passswordRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} /> */}
                        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" error={Boolean(errors['password'])} helperText={errors['password']} inputRef={passwordRef} required sx={{ backgroundColor: "white", borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px", "& fieldset": { borderColor: "black" }, "&:hover fieldset": { borderColor: "black" }, "&.Mui-focused fieldset": { borderColor: "black" } }, "& .MuiInputLabel-root": { color: "black" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" } }} />
                        <Button fullWidth variant="contained" color="primary" size="large" type="submit" endIcon={<SendIcon />} sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "black" }, mt: 2 }}>Send</Button>
                    </form>
                </Box>
            </Modal>
        )}
    </>)
}
export default SignIn