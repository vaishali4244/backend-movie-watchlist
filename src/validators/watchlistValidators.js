import { z } from "zod";

const addToWatchlistSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(["PLANNED", "WATCHING", " COMPLETED", "DROPPED"], {
      error: () => ({
        message: "Status must be one of PLANNED, COMPLETED, WATCHING, DROPPED",
      }),
    })
    .optional(),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating musst be between 1 and 10")
    .optional(), //(val, "error message"),
  notes: z.string().optional(),
});

export {addToWatchlistSchema}