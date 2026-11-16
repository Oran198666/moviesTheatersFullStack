import "./home.css";
import cinema from "../../../assets/cinema.jpg";

export function Home() {
    return (
        <div className="Home">

            <h1>Movies & Theaters</h1>

            <p>
                Pick a cinema to see everything screening there — showtimes, running
                times and the full listing for that location. New screenings can be
                added from the Add Movie page at any time.
            </p>

            <img src={cinema} alt="Cinema auditorium" />

        </div>
    );
}