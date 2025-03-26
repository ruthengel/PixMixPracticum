import { createBrowserRouter } from "react-router-dom";
import CollageEditor from "./components/collage/CollageEditor";
import Applayout from "./components/Applayout";
import UserCollages from "./components/collage/ShowCollages";
import BackgroundSelector from "./components/collage/BackgroundSelector ";
import HomePage from "./components/HomePage";

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
                errorElement: <>UserCollages error</>
            }

        ]
    },
]);


