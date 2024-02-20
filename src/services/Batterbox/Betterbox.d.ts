export type SignIn = { email: string; password: string };
export type SignUp = { username: string; email: string; password: string };
export type AddToWatched = { movieId: number };
export type RemoveFromWatched = { movieId: number };
export type GetMovieWatched = { movieId: number };
export type AddToFavorite = { movieId: number };
export type RemoveFromFavorite = { movieId: number };
export type GetFavoriteMovie = { movieId: number };
