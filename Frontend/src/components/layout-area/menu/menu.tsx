import { NavLink } from "react-router-dom";
import "./menu.css";

export function Menu() {

    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink>

            <NavLink to="/movies" end>Movies</NavLink>

            <NavLink to="/addMovie">Add Movie</NavLink>
        </div>
    );
}
