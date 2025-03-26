import { Box, List, ListItem, ListItemButton, ListItemButtonProps, ListItemText, styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./stores/Store";
import { useEffect, useState } from "react";
// import logo from "../assets/logo.png";

const StyleListItemButton = styled(ListItemButton)<ListItemButtonProps & LinkProps>(() => ({
    padding: "10px 20px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    color: "black",
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    position: "relative",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        opacity: 0.5,
        borderRadius: "8px",
        paddingTop: "4px",
        paddingBottom: "4px",
        color: "black"
    }
}));

const NavBar = () => {
    const token = useSelector((state: RootState) => state.token.token);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            setShowBackground(true)
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return showBackground && (
        <Box sx={{ width: "100%", backgroundColor: "white", display: "flex", justifyContent: 'space-between', alignItems: "center", padding: "-30px", position: "fixed", height: '70px', top: 0, left: 0, zIndex: 1000, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>

            {!token && <Box> </Box>}

            {token && <List sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "row", paddingLeft: '640px', margin: 0 }}>

                <ListItem disablePadding>
                    <StyleListItemButton component={Link} to='my-collages'>
                        <ListItemText primary='my-gallery' sx={{ whiteSpace: 'nowrap', mr: 1 }} />
                    </StyleListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <StyleListItemButton component={Link} to='Start'>
                        <ListItemText primary='start' sx={{ whiteSpace: 'nowrap', mr: 1 }} />
                    </StyleListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <StyleListItemButton component={Link} to='/' >
                        <ListItemText primary='my-home' sx={{ whiteSpace: 'nowrap', mr: 1 }} />
                    </StyleListItemButton>
                </ListItem>
            </List>}
            <Box sx={{ marginRight: "25px" }}>
                <Link to="/">
                    {/* <img src={logo} alt="Logo" style={{ height: "100px" }} /> */}
                    <h2 style={{ background: "linear-gradient(270deg, #7D2AE8, #00A0A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", position: "relative" }}>Pixmix</h2>

                </Link>
            </Box>
        </Box>
    );
};

export default NavBar;
