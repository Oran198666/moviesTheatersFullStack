import { useEffect, useState } from "react";
import "./movies-list.css";
import { TheatersModelFront } from "../../../models/theaters-model-front";
import { useNavigate } from "react-router-dom";
import { MoviesModelFront } from "../../../models/movies-model-front.ts";
import { Spinner } from "../../shared-area/spinner/spinner.tsx";
import { moviesServiceFront } from "../../../services/movies-service-front.ts";
import { notify } from "../../../utils/notify.ts";

export function MoviesList() {
    const [loading, setLoading] = useState<boolean>(false);
    const [theaters, setTheaters] = useState<TheatersModelFront[]>([]);
    const [movies, setMovies] = useState<MoviesModelFront[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        moviesServiceFront.getAllTheaters()
            .then(t => setTheaters(t))
            .catch(err => notify.error(err))
    }, []);

    async function handleTheaterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setLoading(true);
        try {
            const movies = await moviesServiceFront.getMoviesByTheater(+e.target.value);
            setMovies(movies)
        } catch (err: any) {
            notify.error(err);
        } finally {
            setLoading(false)
        }
    };

    async function remove(movieId: number) {
        setLoading(true);
        try {
            await moviesServiceFront.deleteMovie(movieId);
            setMovies(movies.filter(m => m.movieId !== movieId))
        } catch (err: any) {
            notify.error(err);
        } finally {
            setLoading(false)
        }
    };

    function update(movieId: number) {
        navigate("/updateMovie/" + movieId);
    }

    return (
        <div className="MoviesList">
            <select onChange={handleTheaterChange}>
                <option value="">Select Theatre</option>
                {theaters.map(t => (
                    <option key={t.theaterId} value={t.theaterId}>{t.theaterName}</option>
                ))}
            </select>
            {loading && <Spinner />}
            <table>
                <thead>
                    <tr>
                        <th>Theater Name</th>
                        <th>Movie Name</th>
                        <th>Screening Time</th>
                        <th>Duration Minutes</th>
                        <th>User Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(m => (
                        <tr key={m.movieId}>
                            <td>{m.theaterName}</td>
                            <td>{m.movieName}</td>
                            <td>{new Date(m.screeningTime).toLocaleString("en-GB")}</td>
                            <td>{m.durationMinutes}</td>
                            <td>
                                <button onClick={() => update(m.movieId!)}>Update</button>
                                {" | "}
                                <button onClick={() => remove(m.movieId!)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
