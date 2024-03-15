// movie.model.ts

// Define an interface named 'Movie' to represent the structure of a movie object
export interface Movie {
    id: number;          // Unique identifier for the movie
    name: string;        // Name of the movie
    theatre_id: string;  // ID of the theater where the movie is being shown
    description: string; // Description of the movie
    screen: string;      // Screen where the movie is being shown
    language: string;    // Language of the movie
    genre: string;       // Genre of the movie
    price: number;       // Price of the movie ticket
    ratings: number;     // Ratings of the movie
    date: string;        // Date of the movie
    availableSeats: number; // Number of available seats for the movie
    pgRating: string;    // PG Rating of the movie
  }
  