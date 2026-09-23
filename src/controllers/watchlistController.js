import { prisma } from "../config/db.js";

export const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes, userId } = req.body;

  //verify if the movie exists
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });
  if (!movie) {
    return res.status(404).json({ error: "movie not found" });
  }

  //check if the movie is already in the user's watchlist
  const existingInWatchlist = await prisma.watchlistItem.findUnique({
    where: { userId_movieId :{
        userId:userId,
        movieId:movieId
    },},
  });
  if(existingInWatchlist){
    return res.status(400).json({error:"movie already exists in the watchlist"})
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data:{
        userId,
        movieId,
        status:status|| "PLANNED",
        rating,
        notes,
    }
  })
  res.status(201).json({
    status:"Success",
    data:{
        watchlistItem,
    }
  });
};


