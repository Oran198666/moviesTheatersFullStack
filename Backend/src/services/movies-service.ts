import { OkPacketParams } from "mysql2";
import { TheaterModel } from "../models/theaters-model";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { dal } from "../utils/dal";
import { MoviesModel } from "../models/movies-model";

// Logic:
class MovieService {

    public async getAllTheaters(): Promise<TheaterModel[]> {
        const sql = "SELECT * FROM theaters";
        const data = await dal.execute(sql) as TheaterModel[];
        return data;
    }

    public async getOneMovie(id: number): Promise<MoviesModel> {
        const sql = "SELECT * FROM movies WHERE movieId = ?";
        const rows = await dal.execute(sql, [id]) as MoviesModel[];
        if (rows.length === 0) {
            throw new ClientError(StatusCode.NotFound, `id ${id} not found.`);
        }
        return rows[0];
    }

    public async getMoviesByTheater (theaterId: number):Promise<MoviesModel[]>{
        const sql = `select M.*,T.theaterName  from  movies AS M join theaters as T on M.theaterId = T.theaterId
WHERE T.theaterId = ? ORDER BY m.screeningTime`;
        const movies = await dal.execute(sql,[theaterId]) as MoviesModel[];
        return movies;
    }

    public async addMovie(movie: MoviesModel): Promise<MoviesModel> {
        movie.validate();
        const sql = "INSERT INTO movies (theaterId, movieName, screeningTime, durationMinutes) VALUES (?,?,?,?)";
        const values = [movie.theaterId, movie.movieName, movie.screeningTime, movie.durationMinutes];
        const info = await dal.execute(sql, values) as OkPacketParams;
        return await this.getOneMovie(info.insertId!);
    }

    public async updateMovie(id: number, movie: MoviesModel): Promise<MoviesModel> {
        const model = new MoviesModel(movie);
        model.validate();
        const sql = "UPDATE movies SET theaterId = ?, movieName = ?, screeningTime = ?, durationMinutes = ? WHERE movieId = ?";
        const values = [model.theaterId, model.movieName, model.screeningTime, model.durationMinutes, id];
        await dal.execute(sql, values);
        return await this.getOneMovie(id);
    }

    public async deleteMovie(id: number): Promise<void> {
        const sql = "DELETE FROM movies WHERE movieId = ?";
        const info = await dal.execute(sql, [id]) as OkPacketParams;
        if (info.affectedRows === 0) {
            throw new ClientError(StatusCode.NotFound, `id ${id} not found.`);
        }
    }
}

export const movieService = new MovieService();