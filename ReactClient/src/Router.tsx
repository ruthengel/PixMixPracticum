import { createBrowserRouter, useNavigate } from "react-router-dom";
import CollageEditor from "./components/collage/CollageEditor";
import Applayout from "./components/Applayout";
import UserCollages from "./components/collage/ShowCollages";
import BackgroundSelector from "./components/collage/BackgroundSelector ";
import HomePage from "./components/HomePage";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

export const myRouter = createBrowserRouter([

    {
        path: '/',
        element: <Applayout />,
        errorElement: <>main error</>,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "start",
                element: <BackgroundSelector />,
                errorElement: <>BackgroundSelector error</>,
            },
            {
                path: "collage/:background",
                element: <CollageEditor />,
                errorElement: <>CollageEditor error</>,
            },
            {
                path: 'my-collages',
                element: <UserCollages />,
                errorElement: [<>You haven't created any collages yet.</>,
                <br />,
                <> This is your chance!</>,
                <br />,
                <Button onClick={handleOpen} sx={{ mt: 3, borderRadius: '8px', backgroundColor: "#8B3DFF", color: "white", height: '40px', fontWeight: "bold", padding: '8px 16px', "&:hover": { backgroundColor: "#7731D8", }, }}
                >start</Button>,]
            }

        ]
    },
]);


function handleOpen(): void {
    const token = useSelector((state: any) => state.token.token);
    const navigate = useNavigate();
    if (token)
        navigate('start')
}

