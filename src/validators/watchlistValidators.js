import {z} from "zod";


const addToWatchlistSchema = z.object({
    movieId: z.string().uuid(),
    status:z.enum([
        "PLANNED", "WATCHING", " COMPLETED", "DROPPED"
    ], {
        error:()=>({
            message:"Status must be one of PLANNED, COMPLETED, WATCHING, DROPPED",
        }),
    }).optional(),
    rating:z.coerce.number().int(),
})