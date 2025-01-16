import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailPage from "../pages/DetailPage";
import App from "../App";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: ':explore',
                element: <ExplorePage />
            },
            {
                path: ':explore/:id',
                element: <DetailPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
        ]
    }
])


export default router