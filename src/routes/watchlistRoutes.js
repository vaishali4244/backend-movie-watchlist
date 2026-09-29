import express from "express";
import { addToWatchlist, removeFromWatchlist, updateFromWatchlist } from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();
router.use(authMiddleware); // Apply the authMiddleware to all routes in this router    

router.post("/",validateRequest(addToWatchlistSchema), addToWatchlist);
// router.post("/",authMiddleware, addToWatchlist); // Apply the authMiddleware to this specific route

//delete movie by passing id in the the url
router.delete("/:id", removeFromWatchlist);

//update the watchlist - {baseurl}/watchlist/:id
router.put("/:id", updateFromWatchlist);

export default router;
