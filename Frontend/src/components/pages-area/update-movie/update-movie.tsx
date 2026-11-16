import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../utils/notify";
import { TheatersModelFront } from "../../../models/theaters-model-front";
import { MoviesModelFront } from "../../../models/movies-model-front.ts";
import { moviesServiceFront } from "../../../services/movies-service-front";
import "./update-movie.css";

export function UpdateMovie() {
    const [loading, setLoading] = useState<boolean>(false);
    const [theaters, setTheaters] = useState<TheatersModelFront[]>([]);
    const { register, handleSubmit, reset } = useForm<MoviesModelFront>();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        moviesServiceFront.getAllTheaters()
            .then(t => setTheaters(t))
            .catch(err => notify.error(err))

        moviesServiceFront.getOneMovie(+params.movieId!)
            .then(m => reset(m))
            .catch(err => notify.error(err));
    }, []);

    async function send(movie: MoviesModelFront) {
        setLoading(true);
        try {
            await moviesServiceFront.updateMovie(+params.movieId!, movie)
            notify.success("movie was added successfully")
            navigate("/movies");
        } catch (err: any) {
            notify.error(err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="UpdateMovie">
            <form onSubmit={handleSubmit(send)}>

                <label>Movie Name</label>
                <input type="text" {...register("movieName")} required minLength={2} maxLength={100} />

                <label>theatre Name</label>
                <select {...register("theaterId", { valueAsNumber: true })} required>
                {theaters.map(t => (
                    <option key={t.theaterId} value={t.theaterId}>{t.theaterName}</option>
                ))}
                </select>

                <label>screening Time</label>
                <input type="datetime-local" {...register("screeningTime")} required minLength={2} maxLength={100} />

                <label>Duration Minutes</label>
                <input type="number" {...register("durationMinutes", { valueAsNumber: true })} required min={2} max={450} />

                <button disabled={loading}>Update Movie</button>
            </form>
        </div>
    );
}
