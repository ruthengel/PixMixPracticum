import { Outlet, Link } from "react-router-dom";
import NavBar from "./NavBar";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { useSelector } from "react-redux";
import { RootState } from "../stores/Store";
import Profile from "./auth/Profile";
import { IconButton } from "@mui/material";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeIcon from "@mui/icons-material/Home";

const Applayout = () => {

    const isLogin = useSelector((state: RootState) => state.token.token)

    return (
        <>
            {!isLogin && <SignIn />}
            {!isLogin && <SignUp />}
            <Profile />
            <NavBar />
            <Outlet />
            {<IconButton component={Link} to="/"
                sx={{ position: "fixed", bottom: 20,width:50,height:50, right: 20, color: '#8B3DFF', backgroundColor: "white", boxShadow: 3, "&:hover": { backgroundColor: "#8B3DFF", color: 'white', transform: "scale(1.05)" }, transition: "all 0.3s ease", zIndex: 1000, }}>
                <HomeIcon fontSize="large" />
            </IconButton>}
            {/* {<IconButton component={Link} to="/"
                sx={{ position: "fixed", bottom: 85, right: 20, color: '#8B3DFF', backgroundColor: "white", boxShadow: 3, "&:hover": { backgroundColor: "#8B3DFF", color: 'white' } }}>
                <HelpOutlineIcon fontSize="large" />
            </IconButton>} */}

        </>
    )
};

export default Applayout




