import z from "zod";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";

// Data Schema:
const TheatersSchema = z.object({
    theaterId: z.number().int().positive().optional(),
    theaterName: z.string().min(2).max(100)
});

// Data Interface (I = Interface):
type ITheaterModel = z.infer<typeof TheatersSchema>;

// Data Model:
export class TheaterModel implements ITheaterModel {

    public theaterId: number;
    public theaterName: string;

    public constructor(Theater: TheaterModel) { // Copy Constructor
        this.theaterId = Theater.theaterId;
        this.theaterName = Theater.theaterName;
    }

    public validate(): void {
        const result = TheatersSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues[0].path + ": " + result.error.issues[0].message;
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }
}
