import { Spinner } from "../../shared-area/spinner/spinner.tsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../utils/notify";
import { TheatersModelFront } from "../../../models/theaters-model-front";
import { MoviesModelFront } from "../../../models/movies-model-front.ts";
import { moviesServiceFront } from "../../../services/movies-service-front";
import "./add-movie.css";

export function AddMovie() {
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<MoviesModelFront>();
    const [theater, setTheater] = useState<TheatersModelFront[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        moviesServiceFront.getAllTheaters()
            .then(t => setTheater(t))
            .catch(err => notify.error(err))
    }, []);

    async function send(movie:MoviesModelFront) {
        setLoading(true);
        try {
            await moviesServiceFront.addMovie(movie)
            notify.success("Movie was added successfully");
            navigate("/movies")
        } catch (err: any) {
            notify.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="AddMovie">
            {loading && <Spinner />}
            <form onSubmit={handleSubmit(send)}>
                <label>Movie Name</label>
                <input type="text" {...register("movieName")} required minLength={2} maxLength={100} />

                <label>Theater Name</label>
                  <select {...register("theaterId", { valueAsNumber: true })} required>
                {theater.map(t =>(
                    <option key={t.theaterId} value={t.theaterId}>{t.theaterName}</option>
                ))}
                </select>

                 <label>screening Time</label>
                <input type="datetime-local" {...register("screeningTime")} required minLength={2} maxLength={100} />

                <label>Duration Minutes</label>
                <input type="number" {...register("durationMinutes", { valueAsNumber: true })} required min={2} max={450} />


                <button disabled={loading}>Add Movie</button>
            </form>


        </div>
    );
}
