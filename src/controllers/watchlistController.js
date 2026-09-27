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
    where: {
      userId_movieId: {
        userId: req.user.id, // userId:userId,
        movieId: movieId,
      },
    },
  });
  if (existingInWatchlist) {
    return res
      .status(400)
      .json({ error: "movie already exists in the watchlist" });
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id, // userId:userId,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "Success",
    data: {
      watchlistItem,
    },
  });
};

//update watchlist item - status, rating or notes
//ensure only owner can update
//requires to protect by middleware 
export const updateFromWatchlist= async(req,res)=>{
const {status, notes, rating} = req.body

//find watchlist item and verify ownership
const watchlistItem = await prisma.watchlistItem.findUnique({
  where:{
    id:req.params.id,
  }
})
if(!watchlistItem){
  return res.status(404).json({error:"movie not found in watchlist"})
}

//ensure only owner can update
if(watchlistItem.userId !== req.user.id){
  return res.status(403).json({error:"you are not authorized to update the item"})
}

//build update data
const updateData ={}
if(status !== undefined) updateData.status = status.toUpperCase();
if(notes !== undefined) updateData.notes = notes;
if(rating !== undefined) updateData.rating = rating;
//update the watchlistItem with new data
const updatedItem = await prisma.watchlistItem.update({
  where:{id:req.params.id},
  data:{
    notes:updateData.notes,
    rating:updateData.rating,
    status:updateData.status
  }
})
res.status(200).json({
  status:"success",
  message:"watchlist item updated successfully",
  data:{
    watchlistItem:updatedItem
  },
})
}
 


//remove the watchlistItem
// ensure the owner removes the movie
export const removeFromWatchlist = async (req, res) => {
  //find watchlist item by id and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });
  if (!watchlistItem) {
    return res.status(404).json({ error: "watchlist item not found" });
  }

  //ensure only owner can delete the watchlist item
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this watchlist item" });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });
  res.status(200).json({
    status: "success",
    message: "Movie removed fromt the watchlist",
  });
};
