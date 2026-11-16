import { Navigate, Route, Routes } from "react-router-dom";
import { MoviesList } from "../../pages-area/movies-list/movies-list";
import { AddMovie } from "../../pages-area/add-movie/add-movie";
import { Home } from "../../pages-area/home/home";
import { Page404 } from "../../pages-area/page404/page404";
import { UpdateMovie } from "../../pages-area/update-movie/update-movie";

export function Routing() {

    return (
        <Routes>
            {/* Default Route: */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Home: */}
            <Route path="/home" element={<Home />} />

            {/* Data:  */}
            <Route path="/movies" element={<MoviesList />} />

            {/* About:  */}
            <Route path="/addMovie" element={<AddMovie />} />

            <Route path="/updateMovie/:movieId" element={<UpdateMovie />} />

            {/* Page not found: */}
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
