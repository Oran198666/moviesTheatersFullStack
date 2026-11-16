import express, { Request, Response, Router } from "express";
import { movieService } from "../services/movies-service";
import { MoviesModel } from "../models/movies-model";
import { StatusCode } from "../models/enums";

// Contains routes, without logic.
class MoviesController {

    // Create a router object which can listen on routes:
    public router: Router = express.Router();

    // Constructor - register routes:
    public constructor() {
        this.router.get("/api/getAllTheaters", this.getAllTheaters);
        this.router.get("/api/movies-per-theaters/:theaterId", this.getMoviesByTheater);
        this.router.get("/api/movie/:movieId", this.getOneMovie);
        this.router.post("/api/movie", this.addMovie);
        this.router.put("/api/updateMovie/:movieId", this.updateMovie);
        this.router.delete("/api/movie/:movieId", this.deleteMovie);
    }

    private async getAllTheaters(request: Request, response: Response): Promise<void> {
        const data = await movieService.getAllTheaters();
        response.json(data);
    }

    private async getOneMovie(request: Request, response: Response): Promise<void> {
        const movieId = +request.params.movieId;
        const data = await movieService.getOneMovie(movieId);
        response.json(data)
    }


    private async getMoviesByTheater(request: Request, response: Response): Promise<void> {
        const theaterId = +request.params.theaterId;
        const data = await movieService.getMoviesByTheater(theaterId);
        response.json(data);
    }

    private async addMovie(request: Request, response: Response): Promise<void> {
        const movie = new MoviesModel(request.body);
        const dbMovie = await movieService.addMovie(movie);
        response.status(StatusCode.Created).json(dbMovie)
    }

    private async updateMovie(request: Request, response: Response): Promise<void> {
        const movieId = +request.params.movieId;
        const movie = new MoviesModel(request.body);
        const dbMovie = await movieService.updateMovie(movieId, movie);
        response.status(StatusCode.OK).json(dbMovie);
    }

    private async deleteMovie(request: Request, response: Response): Promise<void> {
        const movieId = +request.params.movieId;
        await movieService.deleteMovie(movieId);
        response.status(StatusCode.NoContent).send();
    }
}

export const moviesController = new MoviesController();
