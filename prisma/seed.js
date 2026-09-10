import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const creatorId = process.env.CREATOR_ID;

const movies = [
  {
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseYear: 1994,
    rating: 9.3,
    genres: ["Drama"],
    runtime: 142,
    posterUrl: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
    releaseYear: 1972,
    rating: 9.2,
    genres: ["Crime", "Drama"],
    runtime: 175,
    posterUrl: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Dark Knight",
    overview:
      "Batman faces a criminal mastermind who creates chaos in Gotham and pushes the hero to his moral limits.",
    releaseYear: 2008,
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://m.media-amazon.com/images/I/51EbJjlQz8L._AC_.jpg",
    createdBy: creatorId,
  },
  {
    title: "Inception",
    overview:
      "A skilled thief who steals secrets through dream-sharing technology is given a chance to erase his criminal past.",
    releaseYear: 2010,
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_.jpg",
    createdBy: creatorId,
  },
  {
    title: "Interstellar",
    overview:
      "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    rating: 8.7,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl: "https://m.media-amazon.com/images/I/71n58h0PQYL._AC_.jpg",
    createdBy: creatorId,
  },
  {
    title: "Fight Club",
    overview:
      "An unhappy office worker and a mysterious soap maker form an underground fight club that evolves into something much larger.",
    releaseYear: 1999,
    rating: 8.8,
    genres: ["Drama"],
    runtime: 139,
    posterUrl: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg",
    createdBy: creatorId,
  },
  {
    title: "Forrest Gump",
    overview:
      "A kind-hearted man with a simple outlook experiences several important historical events while pursuing the love of his life.",
    releaseYear: 1994,
    rating: 8.8,
    genres: ["Drama", "Romance"],
    runtime: 142,
    posterUrl: "https://m.media-amazon.com/images/I/61-FK8iQGUL._AC_.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Matrix",
    overview:
      "A computer hacker discovers that the world he knows is a simulated reality controlled by intelligent machines.",
    releaseYear: 1999,
    rating: 8.7,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    posterUrl: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg",
    createdBy: creatorId,
  },
  {
    title: "Gladiator",
    overview:
      "A betrayed Roman general becomes a gladiator and seeks revenge against the corrupt emperor who destroyed his family.",
    releaseYear: 2000,
    rating: 8.5,
    genres: ["Action", "Adventure", "Drama"],
    runtime: 155,
    posterUrl: "https://m.media-amazon.com/images/I/51GA6V6VE1L._AC_.jpg",
    createdBy: creatorId,
  },
  {
    title: "Parasite",
    overview:
      "A struggling family gradually becomes involved with a wealthy household, leading to unexpected and dangerous consequences.",
    releaseYear: 2019,
    rating: 8.5,
    genres: ["Drama", "Thriller"],
    runtime: 132,
    posterUrl: "https://m.media-amazon.com/images/I/91KArYP03YL._AC_.jpg",
    createdBy: creatorId,
  },
];

const main = async () => {
  console.log("Start seeding ...");

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
  }
  console.log("Seeding finished.");
};
main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
