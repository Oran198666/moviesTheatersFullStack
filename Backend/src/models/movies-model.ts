import z from "zod";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";

// Data Schema:
const MoviesSchema = z.object({
    movieId: z.number().int().positive().optional(),
    theaterId: z.number().int().positive(),
    theaterName: z.string().min(2).max(100).optional(),
    movieName: z.string().min(2).max(100),
    screeningTime: z.string().min(1),
    durationMinutes: z.number().int().min(0).max(450)
});

// Data Interface (I = Interface):
type IMoviesModel = z.infer<typeof MoviesSchema>;

// Data Model:
export class MoviesModel implements IMoviesModel {

    public movieId?: number;
    public theaterId: number;
    public theaterName?: string;
    public movieName: string;
    public screeningTime: string;
    public durationMinutes: number;

    public constructor(movie: MoviesModel) { // Copy Constructor
        this.movieId = movie.movieId;
        this.theaterId = +movie.theaterId;
        this.theaterName = movie.theaterName;
        this.movieName = movie.movieName;
        this.screeningTime = movie.screeningTime;
        this.durationMinutes = +movie.durationMinutes;
    }

    public validate(): void {
        const result = MoviesSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues[0].path + ": " + result.error.issues[0].message;
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }
}
