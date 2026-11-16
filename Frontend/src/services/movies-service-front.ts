import axios from "axios";
import { MoviesModelFront } from "../models/movies-model-front.ts";
import { appConfig } from "../utils/app-config.ts";
import { TheatersModelFront } from "../models/theaters-model-front";


class MoviesServiceFront {
    public async getAllTheaters(): Promise<TheatersModelFront[]> {
        const response = await axios.get<TheatersModelFront[]>(appConfig.theatersUrl);
        return response.data;
    }

    public async getMoviesByTheater(theaterId:number): Promise<MoviesModelFront[]> {
        const response = await axios.get<MoviesModelFront[]>(appConfig.moviesPerTheaterUrl + theaterId);
        return response.data;
    }

    public async getOneMovie(movieId:number): Promise<MoviesModelFront> {
        const response = await axios.get<MoviesModelFront>(appConfig.getOneMovieUrl + movieId);
        return response.data;
    }

    public async addMovie(movie:MoviesModelFront):Promise<MoviesModelFront>{
        const response = await axios.post<MoviesModelFront>(appConfig.addMovieUrl, movie);
        return response.data;
    }
    public async updateMovie(movieId:number,movie:MoviesModelFront):Promise<MoviesModelFront>{
        const response = await axios.put<MoviesModelFront>(appConfig.updateMovieUrl + movieId,movie);
        return response.data;
    }
    public async deleteMovie(movieId:number):Promise<void>{
        await axios.delete<MoviesModelFront>(appConfig.deleteMovieUrl + movieId);
    }
}

export const moviesServiceFront = new MoviesServiceFront();
